const {Router} = require("express")
const {getLargo, getLargoByID, deleteLargoByID, addLargo, updateLargoBylargos, signIn, newPassword} = require("../controllers/largometrajes")
const router = Router()

//http://localhost:4000/api/v1/largometrajes

//GET
router.get("/", getLargo)
router.get("/id/:id", getLargoByID)

//DELETE
router.delete("/",deleteLargoByID)

//POST
router.post("/",addLargo)
router.post("/signin",signIn)

//PUT
router.put("/",updateLargoBylargos)
router.put("/newPassword",newPassword)

module.exports = router