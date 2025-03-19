import getConnection from "configs/database.config";
const handleCreateUser = async (username, email, password) => {
  const connection = await getConnection();

  try {
    const sql =
      "INSERT INTO `users`(`username`, `email`, `password`) VALUES (?,?,?)";
    const values = [username, email, password];
    const [result] = await connection.execute(sql, values);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const getAllUser = async () => {
  const connection = await getConnection();
  try {
    const [results] = await connection.query(
      "SELECT * FROM `database-node`.users"
    );
    return results;
  } catch (error) {
    return [];
  }
};

const deleteUserByID = async (id) => {
  const connection = await getConnection();

  try {
    const sql = "DELETE FROM `users` WHERE `id` = ?";
    const values = [id];
    await connection.execute(sql, values);
  } catch (err) {
    console.log(err);
  }
};

const postUpdateUserByID = async (
  id: string,
  username: string,
  email: string,
  password: string
) => {
  const connection = await getConnection();

  try {
    const sql =
      "UPDATE `users` SET `username` =?, `email` =?, `password` =? WHERE `id` =?";
    const values = [username, email, password, id];
    await connection.execute(sql, values);
  } catch (err) {
    console.log(err);
  }
};

const getUserByID = async (id) => {
  const connection = await getConnection();

  try {
    const [result] = await connection.query(
      "SELECT * FROM `users` WHERE `id` =?",
      [id]
    );
    return result[0];
  } catch (error) {
    return null;
  }
};

export {
  handleCreateUser,
  getAllUser,
  deleteUserByID,
  postUpdateUserByID,
  getUserByID,
};
