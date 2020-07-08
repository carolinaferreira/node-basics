const express = require('express');

const server = express();
server.use(express.json());

const users = ['Pam', 'Dwight', 'Jim'];

server.use((req, res, next) => {
  console.time('Request');

  console.log(`Método: ${req.method}; URL: ${req.url}`);

  next();

  console.timeEnd('Request');
});

function checkUserExists(req, res, next) {
  if(!req.body.name){
    return res.status(400).json({ error: 'User not found on request body'});
  }

  return next();
}

function checkUserInArray(req, res, next) {
  const user = users[req.params.index];

  if (!user){
    return res.status(400).json({ error: 'User does not exists'});
  }
  
  req.user = user;
  return next();
}
// List all users
server.get('/users', (req, res) => {
 return res.json(users);
});

// List one user according to index
server.get('/users/:index', checkUserInArray, (req, res) => {
  return res.json(req.user);
})

// Create a new user
server.post('/users', checkUserExists, (req, res) => {
  const {name} = req.body;

  users.push(name);

  return res.json(users);
});

// Edit user
server.put('/users/:index', checkUserInArray, checkUserExists, (req, res) => {
  const {index} = req.params;
  const {name} = req.body;

  users[index] = name;

  return res.json(users);
});

// Delete user
server.delete('/users/:index', checkUserInArray, checkUserExists, (req, res)=>{
  const {index}= req.params;

  users.splice(index,1);

  return res.send();

});

server.listen(3000);