const express = require('express');

const server = express();
server.use(express.json());

const users = ['Pam', 'Dwight', 'Jim'];

// List all users
server.get('/users', (req, res) => {
 return res.json(users);
});

// List one user according to index
server.get('/users/:index', (req, res) => {
  const {index} = req.params;

  return res.json(users[index]);
})

// Create a new user
server.post('/users', (req, res) => {
  const {name} = req.body;

  users.push(name);

  return res.json(users);
});

// Edit user
server.put('/users/:index', (req, res) => {
  const {index} = req.params;
  const {name} = req.body;

  users[index] = name;

  return res.json(users);
});

// Delete user
server.delete('/users/:index', (req, res)=>{
  const {index}= req.params;

  users.splice(index,1);

  return res.send();

});

server.listen(3000);