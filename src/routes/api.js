const express = require('express');
const PermissionController = require('../controllers/PermissionController');
const RoleController = require('../controllers/RoleController');
const UserController = require('../controllers/UserController');
const authMiddleware = require('../middlewares/authMiddleware');
const permissionMiddleware = require('../middlewares/permissionMiddleware');
const router = express.Router();

//Usr router
router.post('/create-user', UserController.createUser);
router.post('/user-role-assign', authMiddleware, permissionMiddleware('user.Create'), UserController.userRoleAssign);
router.get('/single-user-info/:id', authMiddleware, permissionMiddleware('user.Access'), UserController.singleUserInfo);
router.get('/user-all-list', authMiddleware, UserController.userAllList);
router.post('/user-login',  UserController.userLogin);
router.delete('/user-delete/:id',authMiddleware,  UserController.userDelete);

//role router
router.post('/create-role', RoleController.createRole);
router.post('/edit-role/:id', RoleController.editRole);
router.post('/role-assign-permissin', RoleController.roleAssignPermission);
router.get('/role-list', RoleController.roleList);
router.get('/role-list-with-permissions', RoleController.roleListWithPermissions);
router.get('/role-wise-permissin-show/:id', RoleController.roleWisePermissionShow);
router.delete('/role-delete/:id', RoleController.roleDelete);

//permission router
router.post('/create-permission', authMiddleware, permissionMiddleware('permission.Create'), PermissionController.createPermission);
router.post('/edit-permission/:id', authMiddleware, permissionMiddleware('permission.Edit'), PermissionController.editPermission);
router.delete('/delete-permission/:id', authMiddleware, permissionMiddleware('permission.Delete'), PermissionController.deletePermission);
router.get('/permission-all-with-group-wise', authMiddleware,  PermissionController.permissionsAllWithGroupWise);


module.exports = router;

