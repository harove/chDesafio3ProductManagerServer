import fs from 'fs/promises'
import { Product } from './Product.js'
export let id = 0
function generarId(){
    return id++
}

export class ProductManager{
    #path
    constructor(path){
        this.#path = path
    }
    async addProduct(datosProduct){
        const products = JSON.parse(await fs.readFile(this.#path,'utf-8'))
        if (products.find(product => product.code === datosProduct.code))
            throw new Error(`Ya existe un producto con el codigo ${datosProduct.code}`)
        datosProduct.id = generarId()
        const product = new Product(datosProduct)
        products.push(product)
        await fs.writeFile(this.#path, JSON.stringify(products, null, 2))
        return product
    }

    async getProducts({limit}={}){
        let products = JSON.parse(await fs.readFile(this.#path,'utf-8'))
        if (limit){
            products = products.slice(0,limit)
        }
        return products
    }

    async getProductById(id){
        const products = JSON.parse(await fs.readFile(this.#path,'utf-8'))
        const product = products.find(product => product.id === id)
        if (product) 
            return product
        else 
            throw new Error('Not found')
    }

    async deleteProduct(id){
        const products = JSON.parse(await fs.readFile(this.#path,'utf-8'))
        const productIndex = products.findIndex(product => product.id === id)
        console.log({productIndex})
        products.splice(productIndex,1)
        await fs.writeFile(this.#path, JSON.stringify(products, null, 2))
        return products
    }

    async updateProduct(id,fieldsToUpdate){
        const products = JSON.parse(await fs.readFile(this.#path,'utf-8'))
        const productIndex = products.findIndex(product => product.id === id)
        console.log({productIndex})
        products[productIndex] = {...products[productIndex], ...fieldsToUpdate}
        await fs.writeFile(this.#path, JSON.stringify(products, null, 2))
        return products
    }
}

// TESTING:
// const pm = new ProductManager('./db/productos.json')
// console.log({products: await pm.getProducts()})

// const datosProduct0 = {
//     title: "producto prueba",
//     description:"Este es un producto prueba",
//     price:200,
//     thumbnail:"Sin imagen",
//     code:"abc13",
//     stock:25,
// }

// const datosProduct1 = {
//     title: "producto prueba 2",
//     description:"Este es un producto prueba",
//     price:200,
//     thumbnail:"Sin imagen",
//     code:"abc132",
//     stock:25,
// }

// await pm.addProduct(datosProduct0)
// await pm.addProduct(datosProduct1)
// await pm.updateProduct(2,{title: "producto updated"})


// await pm.addProduct(datosProduct1)
// console.log({products: await pm.getProducts()})
// console.log(await pm.getProductById(2))
// console.log(await pm.deleteProduct(2))
// console.log(await pm.getProductById(2))

