const express=require('express')
const router=express.Router();
const userController=require('../controllers/userController');

//endpoint
router.get('/water_bills',userController.getAllUsers);
router.get('/hello',userController.hello);
router.get('/users/:id',userController.getUserById);
router.get('/users/ip/:ip_address',userController.getUserByIp);
router.get('/users/:search',userController.getUserByIpOrAddress);
router.post('/water_bills',userController.createUser);
router.put('/water_bills',userController.updateUser);
router.delete('/users',userController.deleteUser)
module.exports = router;