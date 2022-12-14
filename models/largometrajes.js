const modeloLargometrajes = {
    queryGetLargo: "SELECT * FROM largometrajes",
    queryLargoByID : `SELECT * FROM largometrajes WHERE ID=?`,
    queryDeleteLargoByID : `UPDATE largometrajes SET activo='N' WHERE ID=?`,
    queryLargoExists : `SELECT nombre FROM largometrajes WHERE Nombre = ?`,
    queryAddLargo:`
    INSERT INTO largometrajes(
        nombre,
        genero,
        idioma_doblaje,
        idioma_subtitulos,
        duracion,
        fecha_estreno,
        activo
    )VALUES(
        ?,
        ?,
        ?,
        ?,
        ?,
        ?,
        ?
    )
    `,
    queryGetLargoInfo : `SELECT nombre,genero,idioma_doblaje,idioma_subtitulos,duracion,fecha_estreno,activo FROM largometrajes WHERE nombre = ?`,
    queryUpdateByLargo : `
    UPDATE largometrajes SET
        nombre=?,
        genero=?,
        idioma_doblaje=?,
        idioma_subtitulos=?,
        duracion=?,
        fecha_estreno=?,
        activo
    WHERE nombre= ?
    `
}

module.exports=modeloLargometrajes