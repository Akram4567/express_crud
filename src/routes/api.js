const express = require('express')
const router = express.Router()

const studenController = require('../controllers/studenController')
const worksController = require('../controllers/worksController')
const authVerifyMiddleware = require('../middleware/authVerifyMiddleware')



// student create and login routes
router.post("/createStudent", studenController.createStudent)
router.get("/studentLogin", studenController.studentLogin)


// student read, update and delete routes
router.get("/readStudent", authVerifyMiddleware, studenController.readStudent)
router.post("/updateStudent", authVerifyMiddleware,studenController.updateStudent)
router.delete("/deleteStudent", authVerifyMiddleware,studenController.deleteStudent)


// Verification
router.post("/emailVerification", authVerifyMiddleware,studenController.emailVerification)
router.get("/OTPVerification", authVerifyMiddleware,studenController.OTPVerification)

// reset Password
router.post("/resetPassword", authVerifyMiddleware,studenController.resetPassword)


// =================================================================================


// Work create and login routes
router.post("/createWork", worksController.createWork)
router.get("/WorkLogin", worksController.WorkLogin)


// Work read, update and delete routes
router.get("/readWork", authVerifyMiddleware, worksController.readWork)
router.post("/updateWorkt", authVerifyMiddleware,worksController.updateWork)
router.delete("/deleteWorkt", authVerifyMiddleware,worksController.deleteWork)




module.exports = router