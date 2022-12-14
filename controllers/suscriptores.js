const { request, response } = require("express");
const bcryptjs=require("bcryptjs")
const pool=require("../db/connection");
const {modeloSuscriptores,updateSuscriptor} = require("../models/suscriptores");

const getSub = async(req=request,res=response)=>{
    
    let conn;

    try{
        conn = await pool.getConnection()
        const [subs] = await conn.query(modeloSuscriptores.queryGetSubs,(error)=>{throw new error})
        if(!subs){
            res.status(404).json({msg:"No se encontraron registros"})
            return
        }
        res.json({subs})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const getSubByID = async (req=request,res=response)=>{
    const {id}=req.params
    let conn;

    try{
        conn = await pool.getConnection()
        const [sub] = await conn.query(modeloSuscriptores.queryUserByID,[id],(error)=>{throw new error})
        if(!sub){
            res.status(404).json({msg:`No se encontró registro con el ID=${id}`})
            return
        }
        res.json({sub})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const deleteSubByID = async (req=request,res=response)=>{
    const {id}=req.query
    let conn;

    try{
        conn = await pool.getConnection()
        const {affectedRows} = await conn.query(modeloSuscriptores.querySubByID,[id],(error)=>{throw new error})
        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo eliminar el registro con el ID=${id}`})
            return
        }
        res.json({msg:`El suscriptor con el ID=${id} se elimino correctamente`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const addSub = async (req=request,res=response)=>{
    const {
        suscriptor,
        nombre,
        apellidos,
        edad,
        sexo,
        correo,
        contrasena,
        fecha_nacimiento='1900-01-01',
        activo
    }=req.body

    if(
        !suscriptor||
        !nombre||
        !apellidos||
        !edad||
        !sexo||
        !correo||
        !contrasena||
        !fecha_nacimiento||
        !activo
    ){
        res.status(400).json({msg:"Falta información del suscriptor."})
        return
    }

    let conn;

    

    try{
        conn = await pool.getConnection()
        const [sub]=await conn.query(modeloSuscriptores.querySuscriptorExists,[suscriptor])
        if(sub){
            res.status(403).json({msg:`El suscriptor '${suscriptor}' ya se encuentra registrado.`})
            return
        }

        const salt = bcryptjs.genSaltSync()
        const contrasenaCifrada = bcryptjs.hashSync(Contrasena,salt) 

        const {affectedRows} = await conn.query(modeloSuscriptores.queryAddSub,[
            suscriptor,
            nombre,
            apellidos,
            edad,
            sexo || '',
            correo,
            contrasenaCifrada,
            fecha_nacimiento,
            activo
        ],(error)=>{throw new error})
        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo agregar el registro del suscriptor ${suscriptor}`})
            return
        }
        res.json({msg:`El suscriptor ${suscriptor} se agregó correctamente`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const updateSubBysuscriptor = async (req=request,res=response)=>{
    const {
        suscriptor,
        nombre,
        apellidos,
        edad,
        sexo,
        correo,
        contrasena,
        fecha_nacimiento='1900-01-01',
    }=req.body

    if(
        !nombre||
        !apellidos||
        !edad||
        !contrasena
    ){
        res.status(400).json({msg:"Falta información del suscriptor."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()
        const [sub]=await conn.query(modeloSuscriptores.queryGetSubInfo,[suscriptor])

        if(!sub){
            res.status(403).json({msg:`El suscriptor '${suscriptor}' no se encuentra registrado.`})
            return
        }
        const {affectedRows} = await conn.query(updateSuscriptor(
            nombre,
            apellidos,
            edad,
            sexo,
            fecha_nacimiento,
            suscriptor
        ),(error)=>{throw new error})
        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo actualizar el registro del suscriptor ${suscriptor}`})
            return
        }
        res.json({msg:`El suscriptor ${suscriptor} se actualizo correctamente`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}



const signIn = async (req=request,res=response)=>{
    const {
        suscriptor,
        contrasena
    }=req.body

    if(
        !suscriptor||
        !contrasena
    ){
        res.status(400).json({msg:"Falta información del suscriptor."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()
        const [sub]=await conn.query(modeloSuscriptores.querySignIn,[suscriptor])

        if(!sub || sub.Activo == 'N'){
            let code = !sub ? 1: 2;
            res.status(403).json({msg:`El suscriptor o la contraseña son incorrectos`,errorCode:code})
            return
        }

        const accesoValido = bcryptjs.compareSync(contrasena,sub.contrasena)

        if(!accesoValido){
            res.status(403).json({msg:`El suscriptor o la contraseña son incorrectos`,errorCode:"3"})
            return
        }


        res.json({msg:`El suscriptor ${suscriptor} ha iniciado sesión satisfactoriamenente`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const newPassword = async (req=request,res=response)=>{
    const {
        suscriptor,
        Acontrasena,
        Ncontrasena
    }=req.body

    if(
        !suscriptor||
        !Acontrasena||
        !Ncontrasena
    ){
        res.status(400).json({msg:"Faltan datos."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()
        const [sub]=await conn.query(modeloSuscriptores.querySignIn,[suscriptor])

        if(!sub || sub.Activo == 'N'){
            let code = !sub ? 1: 2;
            res.status(403).json({msg:`El suscriptor o la contraseña son incorrectos`,errorCode:code})
            return
        }

        const datosValidos = bcryptjs.compareSync(Acontrasena,sub.contrasena)

        if(!datosValidos){
            res.status(403).json({msg:`El suscriptor o la contraseña son incorrectos`,errorCode:"3"})
            return
        }

        const salt = bcryptjs.genSaltSync()
        const contrasenaCifrada = bcryptjs.hashSync(Ncontrasena,salt) 

        const {affectedRows} = await conn.query(modeloSuscriptores.queryUpdatePasword,[contrasenaCifrada,suscriptor],(error)=>{throw new error})
        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo actualizar la contraseña de ${suscriptor}`})
            return
        }
        res.json({msg:`La contraseña de ${suscriptor} se actualizo correctamente`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


module.exports={getSub,getSubByID,deleteSubByID,addSub,updateSubBysuscriptor,signIn,newPassword}