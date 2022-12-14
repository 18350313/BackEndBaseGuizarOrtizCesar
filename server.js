const express = require('express')
const largometrajesRouter = require('./routes/largometrajes')
const suscriptoresRouter = require('./routes/suscriptores')
const cors = require("cors")

class Server{
    constructor(){
        this.app = express()
        this.paths ={
            largometrajes:"/api/v1/largometrajes",   
            suscriptores: "/api/v1/suscriptores",
        }
        this.middlewares()
        this.routes()
    }

    routes(){      
        //this.app.get('/',(req, res)=>{
            //res.send('Hola mundo')
       // })
       this.app.use(this.paths.largometrajes, largometrajesRouter)
       this.app.use(this.paths.suscriptores, suscriptoresRouter)
    }

    middlewares(){
        this.app.use(cors()) //Permite solicitudes de origen cruzado
        this.app.use(express.json()) //Habilita la lectura de contendi en formato JSON
    }

    listen(){
        this.app.listen(process.env.PORT,()=> {
            console.log("Backend en ejecución en el puerto", process.env.PORT)
        })
    }
}

module.exports=Server