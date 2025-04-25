import {
  createTask,
  getAllTasks,
  updateTaskById,
  deleteTaskById,
  softDeleteTaskById,
  handleSoftDeleteListTasks,
} from "../services/task.service";

const createTaskHandler = async (req, res) => {
  try {
    const newTask = await createTask(req.body);
    res.status(201).json({
      success: true,
      message: "Task created successfully!",
      data: newTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

const getAllTasksHandler = async (req, res) => {
  try {
    const { tasks, totalRecords, limit, page } = await getAllTasks(req.query);
    res.status(200).json({
      success: true,
      message: "Tasks retrieved successfully!",
      data: { page, limit, totalRecords, tasks },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedTask = await updateTaskById(id, req.body);
    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Task updated successfully!",
      data: updatedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await deleteTaskById(id);
    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Task deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

const softDeleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await softDeleteTaskById(id);
    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "Task soft deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error!",
    });
  }
};

const softDeleteListTasks = async (req, res) => {
  const { listIds } = req.body;
  if (!listIds || !Array.isArray(listIds) || listIds.length === 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid input: listIds must be a non-empty array",
    });
  }

  try {
    const result = await handleSoftDeleteListTasks(listIds);
    res.status(200).json({
      success: true,
      message: "Tasks soft deleted successfully!",
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
  createTaskHandler,
  getAllTasksHandler,
  updateTask,
  deleteTask,
  softDeleteTask,
  softDeleteListTasks,
};
