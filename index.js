const express = require('express');

const server = express();
server.use(express.json());

const projects = [];

/* MIDDLEWARES */

// MIDDLEWARE: check if project exists
function checkProjectExists(req, res, next) {
  const {id} = req.params;
  const project = projects.find (p => p.id == id);

  if(!project){
    return res.status(400).json({ error: 'Project not found on request body'});
  }

  return next();
}

// MIDDLEWARE: global
server.use((req, res, next) => {
  console.count(`Quantidade de Requests`);

  return next();
});

/* ROUTES */

// POST: create a new project
server.post('/projects', (req, res) => {
  const {id, title} = req.body;
  
  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);

  return res.json(project);
});

// GET: list all projects
server.get('/projects', (req, res) => {
 return res.json(projects);
});

// GET: list one project
server.get('/projects/:id', checkProjectExists, (req, res) => {
  const {id} = req.params;
  const project = projects.find(p => p.id == id);

  return res.json(project);
});

// PUT: edit project title 
server.put('/projects/:id', checkProjectExists, (req, res) => {
  const {id} = req.params;
  const {title} = req.body;

  const projectId = projects.findIndex( p => p.id == id);

  projects[projectId].title = title;
});

// DELETE: delete project
server.delete('/projects/:id', checkProjectExists, (req, res)=>{
  const {id}= req.params;

  const projectId = projects.findIndex( p => p.id == id);

  projects.splice(projectId,1);

  return res.send();
});

// POST: add task title
server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const {id} = req.params;
  const {title} = req.body;

  const project = projects.find(p => p.id == id);
   
  project.tasks.push(title);

  return res.json(project);
});

server.listen(3000);