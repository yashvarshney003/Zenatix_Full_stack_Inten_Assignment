const express =  require('express')
const  ejs  = require('ejs')
const app =  express()
app.set("view engine","ejs")
const port = 3000
let task = {}
app.get("/",(req,res)=>{
    if(task[req.query.taskid])
    res.send(task[req.query.taskid])
    else
    res.statusCode(404).send("Task Id doesn't exist")
})
app.post("/",(req,res)=>{
  
  task[req.query.taskid] =  [req.query.description,req.query.status]
  
    console.log(task)
    res.send("task-added-successfully")

})
app.delete("/",(req,res)=>{
    delete task[req.query.taskid]
    res.send("task deleted sucessfullu")

})
app.patch("/",(req,res)=>{
    task[req.query.taskid][1] = req.query.status 
    res.send("task updated successfully")

})

app.listen(5000,()=>{
    console.log("Yash");
})