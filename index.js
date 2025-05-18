import express from "express"

const app = express()
const port = 3000

app.use(express.json())
let teadata = []
let nextid = 1

app.post("/teas",(req,res)=>{
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