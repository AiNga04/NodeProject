import Project from "../models/project.model";
import User from "../models/user.model";
import aqp from "api-query-params";
import api from "routes/api";

const handleCreateProject = async (data) => {
  if (data.type === "EMTY-PROJECT") {
    const newProject = await Project.create(data);
    return {
      success: true,
      message: "User created successfully!",
      data: newProject,
    };
  }
  if (data.type === "ADD-USERS") {
    // Kiểm tra các userId trong usersInfor
    if (data.usersInfor.length > 0) {
      // Kiểm tra xem tất cả userId có tồn tại trong bảng users
      const usersExist = await User.find({
        _id: { $in: data.usersInfor },
      }).select("_id");
      const existingUserIds = usersExist.map((user) => user._id.toString());

      // Kiểm tra nếu có userId không tồn tại
      const invalidUsers = data.usersInfor.filter(
        (userId) => !existingUserIds.includes(userId.toString())
      );
      if (invalidUsers.length > 0) {
        return {
          success: false,
          message: `Users with IDs ${invalidUsers.join(", ")} do not exist!`,
        };
      }
    }

    let currentProject = await Project.findById(data.projectId).exec();

    // Kiểm tra người dùng đã tồn tại trong project
    const duplicateUsers = data.usersInfor.filter((userId) =>
      currentProject.usersInfor
        .map((id) => id.toString())
        .includes(userId.toString())
    );

    if (duplicateUsers.length > 0) {
      return {
        success: false,
        message: `Users with IDs ${duplicateUsers.join(
          ", "
        )} are already in the project!`,
      };
    }

    // Thêm người dùng mới vào project
    currentProject.usersInfor.push(...data.usersInfor);
    const newResult = await currentProject.save();
    return {
      success: true,
      message: "Add users successfully!",
      data: newResult,
    };
  }

  if (data.type === "DELETE-USERS") {
    // Check if project exists
    let currentProject = await Project.findById(data.projectId).exec();
    if (!currentProject) {
      return {
        success: false,
        message: "Project not found!",
      };
    }

    // Check if users exist in project
    const usersToDelete = data.usersInfor.map((id) => id.toString());
    const existingUsers = currentProject.usersInfor
        .map((id) => id.toString())
        .filter((id) => usersToDelete.includes(id));

    if (existingUsers.length === 0) {
      return {
        success: false,
        message: "None of the specified users exist in the project!",
      };
    }

    // Remove users from project
    currentProject.usersInfor = currentProject.usersInfor.filter(
        (userId) => !usersToDelete.includes(userId.toString())
    );

    const updatedProject = await currentProject.save();
    return {
      success: true,
      message: "Users removed from project successfully!",
      data: updatedProject,
    };
  }
  return null;
};

const handleGetAllProjects = async (queryString: object) => {
  const totalRecords = await Project.countDocuments();
  // @ts-ignore
  const limit = parseInt(queryString.limit as string) || 0;
  // @ts-ignore
  const page = parseInt(queryString.page as string) || 0;

  if (limit && page) {
    const offset = (page - 1) * limit;

    // @ts-ignore
    const { filter, population } = aqp(queryString);
    delete filter.page;

    const projects = await Project.find(filter)
      .populate(population)
      .skip(offset)
      .limit(limit)
      .exec();
    return { projects, totalRecords, limit, page };
  } else {
    const projects = await Project.find({}).exec();
    return { projects, totalRecords };
  }
};

const updateProjectById = async (id: string, data: any) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { ...data },
      { new: true }
    ).exec();
    return updatedProject;
  } catch (error) {
    throw error;
  }
};

const deleteProjectById = async (id: string) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(id).exec();
    return deletedProject;
  } catch (error) {
    throw error;
  }
};

const softDeleteProjectById = async (id: string) => {
  try {
    const project = await Project.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    ).exec();
    return project;
  } catch (err) {
    throw err;
  }
};

const handleSoftDeleteListProjects = async (listIds: string[]) => {
  try {
    const result = await Project.updateMany(
      { _id: { $in: listIds } },
      { deleted: true }
    );
    return result;
  } catch (err) {
    throw err;
  }
};

export {
  handleCreateProject,
  handleGetAllProjects,
  updateProjectById,
  deleteProjectById,
  softDeleteProjectById,
  handleSoftDeleteListProjects,
};
