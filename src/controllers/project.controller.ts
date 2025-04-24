import {
  handleCreateProject,
  handleGetAllProjects,
  updateProjectById,
  deleteProjectById,
  softDeleteProjectById,
  handleSoftDeleteListProjects,
} from "services/project.service";

const createEmtyProject = async (req, res) => {
  const data = req.body;
  try {
    const newProject = await handleCreateProject(data);

    res.status(201).json(newProject);
  } catch (error: any) {
    if (error.message === "User already exists!") {
      res.status(409).json({
        success: false,
        message: error.message,
      });
    } else {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
    }
  }
};

// Get all Project
const getAllProjects = async (req, res) => {
  try {
    const { projects, totalRecords, limit, page } = await handleGetAllProjects(
      req.query
    );

    res.status(200).json({
      success: true,
      message: "Users retrieved successfully!",
      data: {
        page,
        limit,
        totalRecords,
        projects,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

const updateProject = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  // res.send(res.body)

  try {
    const updatedProject = await updateProjectById(id, updateData);

    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project updated successfully!",
      data: updatedProject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProject = await deleteProjectById(id);

    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

const softDeleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProject = await softDeleteProjectById(id);

    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Project soft deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

const softDeleteListProjects = async (req, res) => {
  const { listIds } = req.body;

  if (!listIds || !Array.isArray(listIds) || listIds.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid input: listIds must be a non-empty array",
    });
  }

  try {
    const result = await handleSoftDeleteListProjects(listIds);

    res.status(200).json({
      success: true,
      message: "Projects soft deleted successfully!",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

export {
  createEmtyProject,
  getAllProjects,
  updateProject,
  deleteProject,
  softDeleteListProjects,
  softDeleteProject,
};
