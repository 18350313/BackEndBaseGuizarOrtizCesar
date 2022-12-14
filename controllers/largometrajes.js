const { request, response } = require("express");
const pool=require("../db/connection");
const modeloLargometrajes = require("../models/largometrajes");

const getLargo = async(req=request,res=response)=>{
    
    let conn;

    try{
        conn = await pool.getConnection()
        const largos = await conn.query(modeloLargometrajes.queryGetLargo,(error)=>{throw new error})
        if(!largos){
            res.status(404).json({msg:"No se encontraron largometrajes"})
            return
        }
        res.json({largos})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const getLargoByID = async (req=request,res=response)=>{
    const {id}=req.params
    let conn;

    try{
        conn = await pool.getConnection()
        const [largo] = await conn.query(modeloLargometrajes.queryLargoByID,[id],(error)=>{throw new error})
        if(!largo){
            res.status(404).json({msg:`No se encontró registro con el ID=${id}`})
            return
        }
        res.json({largo})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const deleteLargoByID = async (req=request,res=response)=>{
    const {id}=req.query
    let conn;

    try{
        conn = await pool.getConnection()
        const {affectedRows} = await conn.query(modeloLargometrajes.queryDeleteLargoByID,[id],(error)=>{throw new error})
        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo eliminar el registro con el ID=${id}`})
            return
        }
        res.json({msg:`El largometraje con el ID=${id} se elimino correctamente`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const addLargo = async (req=request,res=response)=>{
    const {
        nombre,
        genero,
        idioma_doblaje,
        idioma_subtitulos,
        duracion,
        fecha_estreno,
        activo
    }=req.body

    if(
        !nombre||
        !genero||
        !idioma_doblaje||
        !idioma_subtitulos||
        !duracion||
        !fecha_estreno||
        !activo
    ){
        res.status(400).json({msg:"Falta información del largometraje."})
        return
    }
    let conn;
    try{
        conn = await pool.getConnection()
        const [largo]=await conn.query(modeloLargometrajes.queryLargoExists,[nombre])
        if(largo){
            res.status(403).json({msg:`El largometraje '${nombre}' ya se encuentra registrado.`})
            return
        }

        const {affectedRows} = await conn.query(modeloLargometrajes.queryAddLargo,[
            nombre,
            genero,
            idioma_doblaje,
            idioma_subtitulos,
            duracion,
            fecha_estreno,
            activo
        ],(error)=>{throw new error})
        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo agregar el registro del largometraje ${nombre}`})
            return
        }
        res.json({msg:`El largometraje ${nombre} se agregó correctamente`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


const updateLargo = async (req=request,res=response)=>{
    const {
        nombre,
        genero,
        idioma_doblaje,
        idioma_subtitulos,
        duracion,
        fecha_estreno,
        activo
    }=req.body

    if(
        !nombre
    ){
        res.status(400).json({msg:"Falta información del largometraje."})
        return
    }

    let conn;

    try{
        conn = await pool.getConnection()
        const [largo]=await conn.query(modeloLargometrajes.queryGetLargoInfo,[nombre])

        if(!largo){
            res.status(403).json({msg:`El largometraje '${nombre}' no se encuentra registrado.`})
            return
        }
        const {affectedRows} = await conn.query(modeloLargometrajes.queryUpdateByLargo,[
            genero||user.genero,
            idioma_doblaje||user.idioma_doblaje,
            idioma_subtitulos||user.idioma_subtitulos,
            duracion||user.duracion,
            fecha_estreno||user.fecha_estreno,
            activo||user.activo,
            nombre
        ],(error)=>{throw new error})
        if(affectedRows===0){
            res.status(404).json({msg:`No se pudo actualizar el registro del largometraje ${nombre}`})
            return
        }
        res.json({msg:`El largometraje ${nombre} se actualizo correctamente`})
    }catch(error){
        console.log(error)
        res.status(500).json({error})
    }finally{
        if(conn){
            conn.end()
        }
    }
}


module.exports={getLargo,getLargoByID,deleteLargoByID,addLargo,updateLargo}