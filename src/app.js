import express from 'express'
import { ProductManager } from './productManager.js'

const app = express()
app.use(express.json())


const pm = new ProductManager('./db/productos.json')

app.get('/productos', async(req, res)=>{
    const {limit} = req.query
    const productos = await pm.getProducts({limit})
    res.send(productos)
})

app.get('/productos/:pid', async(req, res)=>{
    const {pid} = req.params
    const pojo = await pm.getProductById(parseInt(pid))
    res.send(pojo)
})

app.get('/', (req, res)=>{
    res.send('PRODUCT MANAGER')
})

app.listen(8080,()=>console.log('conectado'))