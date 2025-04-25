import Task from "../models/task.model";
import aqp from "api-query-params";

const createTask = async (data: any) => {
  try {
    const newTask = await Task.create(data);
    return newTask;
  } catch (error) {
    throw error;
  }
};

const getAllTasks = async (queryString: object) => {
  const totalRecords = await Task.countDocuments();
  // @ts-ignore
  const limit = parseInt(queryString.limit as string) || 0;
  // @ts-ignore
  const page = parseInt(queryString.page as string) || 0;

  if (limit && page) {
    const offset = (page - 1) * limit;

    // @ts-ignore
    const { filter, population } = aqp(queryString);
    delete filter.page;

    const tasks = await Task.find(filter)
      .populate("usersInfor")
      .populate("projectInfor")
      .skip(offset)
      .limit(limit)
      .exec();
    return { tasks, totalRecords, limit, page };
  } else {
    const tasks = await Task.find({})
      .populate("usersInfor")
      .populate("projectInfor")
      .exec();
    return { tasks, totalRecords };
  }
};

const updateTaskById = async (id: string, data: any) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { ...data },
      { new: true }
    ).exec();
    return updatedTask;
  } catch (error) {
    throw error;
  }
};

const deleteTaskById = async (id: string) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(id).exec();
    return deletedTask;
  } catch (error) {
    throw error;
  }
};

const softDeleteTaskById = async (id: string) => {
  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { deleted: true },
      { new: true }
    ).exec();
    return task;
  } catch (err) {
    throw err;
  }
};

const handleSoftDeleteListTasks = async (listIds: string[]) => {
  try {
    const result = await Task.updateMany(
      { _id: { $in: listIds } },
      { deleted: true }
    );
    return result;
  } catch (err) {
    throw err;
  }
};

export {
  createTask,
  getAllTasks,
  updateTaskById,
  deleteTaskById,
  softDeleteTaskById,
  handleSoftDeleteListTasks,
};
