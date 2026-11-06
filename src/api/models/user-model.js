const users = [
  {
    user_id: 3609,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },
  {
    user_id: 3602,
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@metropolia.fi',
    role: 'admin',
    password: 'password123',
  },
];

const listAllUsers = () => users;

const findUserById = (id) => users.find((user) => user.user_id == id);

const addUser = (user) => {
  const { name, username, email, role, password } = user;
  const newId = users[0] ? users[0].user_id + 1 : 1;
  users.unshift({
    user_id: newId,
    name,
    username,
    email,
    role,
    password,
  });
  return newId;
};

export { listAllUsers, findUserById, addUser };