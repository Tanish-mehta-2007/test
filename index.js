import express from "express"
import 'dotenv/config'
const app = express()
const port = process.env.PORT

import logger from "./logger.js";
import morgan from "morgan";

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);


app.use(express.json())
let teadata = []
let nextid = 1

app.post("/teas",(req,res)=>{
    logger.warn("A post request has been made to add a tea")
    const {name,price} = req.body
    const newTea = {id: nextid++, name, price}
    teadata.push(newTea) 
    res.status(201).send(newTea)
})

app.get("/teas",(req,res)=>{
    res.status(200).send(teadata)
})

app.get("/teas/:id",(req,res)=>{
    const tea = teadata.find(t => t.id === parseInt(req.params.id))

    if(!tea){
        return res.status(404).send("Tea not available")
    }
    res.status(200).send(tea)
})

app.put("/teas/:id", (req,res)=>{
    const tea = teadata.find(t => t.id === parseInt(req.params.id))
    if(!tea){
        return res.status(404).send("tea not found")
    }
    const {name,price} = req.body

    tea.name = name
    tea.price = price

    res.status(200).send(tea)
})
 
app.delete("/teas/:id",(req,res)=>{
    const Index = teadata.findIndex(t => t.id === parseInt(req.params.id))

    if(Index === -1){
        return res.status(404).send("Tea not found")
    }
    
    teadata.splice(Index,1)
    res.status(200).send("Deleted")
})

app.listen(port,()=>{
console.log(`Sever is listening on the port ${port}`)
})