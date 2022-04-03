const express = require('express');
const PermissionController = require('../controllers/PermissionController');
const RoleController = require('../controllers/RoleController');
const UserController = require('../controllers/UserController');
const router = express.Router();

//Usr router
router.post('/create-user', UserController.createUser);
router.post('/user-role-assign', UserController.userRoleAssign);
router.get('/single-user-info/:id', UserController.singleUserInfo);

//role router
router.post('/create-role', RoleController.createRole);
router.post('/role-assign-permissin', RoleController.roleAssignPermission);
router.post('/role-wise-permissin-show', RoleController.roleWisePermissionShow);
router.delete('/role-delete/:id', RoleController.roleDelete);

//permission router
router.post('/create-permission', PermissionController.createPermission);
router.delete('/delete-permission/:id', PermissionController.deletePermission);


module.exports = router;