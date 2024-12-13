const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

require('dotenv').config();

const middlewares = require('./middlewares');
const api = require('./api');
const { parse } = require('dotenv');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

const users=[
  {id:1,nombre:"Juan",apellido:"Perez",telefono:"987654321"},
  {id:2,nombre:"Maria",apellido:"Fernandez",telefono:"9708654321"},
  {id:3,nombre:"Pedro",apellido:"Alvarez",telefono:"987654321"},
  {id:4,nombre:"Marcos",apellido:"Silva",telefono:"987123654"}
  ]
app.get('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});
app.get("/users/user1",(req,res)=>{
  res.json(users[0])
})
app.get("/users",(req,res)=>{
  res.json(users)
})
app.get("/users/:id",(req,res)=>{
  const userId= parseInt(req.params.id,10)
  const user = users.find((u)=>u.id==userId)
    if(user){
      res.json(user)
    }else{
      res.status(404).json({error:"Usuario no encontrado"})
    }
  })



  app.post("/users",(req,res)=>{
    const user= req.body
    user.id=users.length+1
    users.push(user)
    res.json(user)
  })
app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;
