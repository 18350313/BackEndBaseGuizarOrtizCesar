const {Router} = require("express")
const {getSub, getSubByID, deleteSubByID, addSub, updateSubBySuscriptor, signIn, newPassword} = require("../controllers/suscriptores")
const router = Router()

//http://localhost:4000/api/v1/suscriptores

//GET
router.get("/", getSub)
router.get("/id/:id", getSubByID)

//DELETE
router.delete("/",deleteSubByID)

//POST
router.post("/",addSub)
router.post("/signin",signIn)

//PUT
router.put("/",updateSubBySuscriptor)
router.put("/newPassword",newPassword)

module.exports = router