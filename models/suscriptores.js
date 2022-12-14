const modeloSuscriptores = {
    queryGetSubs: "SELECT * FROM suscriptores",
    querySubByID : `SELECT * FROM suscriptores WHERE ID=?`,
    queryDeleteSubByID : `UPDATE suscriptores SET activo='N' WHERE ID=?`,
    querySubExists : `SELECT suscriptor FROM suscriptores WHERE suscriptor = ?`,
    queryAddSub:`
    INSERT INTO suscriptores(
        suscriptor,
        nombre,
        apellidos,
        edad,
        sexo,
        correo,
        contrasena,
        fecha_nacimiento,
        activo
    )VALUES(
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )
    `,
    queryGetSubInfo : `SELECT suscriptor,nombre,apellidos,edad,sexo,correo,contrasena,fecha_nacimiento FROM suscriptores WHERE suscriptor = ?`,
    queryUpdateBysuscriptor : `
    UPDATE suscriptores SET
        nombre=?,
        apellidos= ?,
        edad= ?,
        sexo= ?,
        fecha_nacimiento= ?
    WHERE suscriptor= ?
    `,
    querySignIn : `SELECT suscriptor, contrasena, activo FROM suscriptores WHERE suscriptor = ?`,
    queryUpdatePasword : `UPDATE suscriptores SET contrasena=? WHERE suscriptor= ?`
}

const updateSuscriptor=(
    nombre,
    apellidos,
    edad,
    sexo,
    fecha_nacimiento,
    suscriptor
)=>{
    return `
    UPDATE suscriptores SET
        nombre= '${nombre}',
        apellidos= '${apellidos}',
        edad= '${edad}',
        ${sexo ? `sexo= '${sexo}',`:''}
        fecha_nacimiento= '${fecha_nacimiento}'
    WHERE suscriptor= '${suscriptor}'
    `
}

module.exports={modeloSuscriptores,updateSuscriptor}