const express = require('express')
const messagesRouter = require('./routes/messager')
const usuariosRouter = require('./routes/usuarios')
const asphalt8Router = require('./routes/asphalt8')
const cors = require("cors")

class Server{
    constructor(){
        this.app = express()
        this.paths ={
            messages:"/api/v1/messages",   
            usuarios: "/api/v1/usuarios",
            asphalt8: "/api/v1/asphalt8"
        }
        this.middlewares()
        this.routes()
    }

    routes(){      
        //this.app.get('/',(req, res)=>{
            //res.send('Hola mundo')
       // })
       this.app.use(this.paths.messages, messagesRouter)
       this.app.use(this.paths.usuarios, usuariosRouter)
       this.app.use(this.paths.asphalt8, asphalt8Router)
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