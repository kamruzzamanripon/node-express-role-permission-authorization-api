const express = require('express');
const PermissionController = require('../controllers/PermissionController');
const RoleController = require('../controllers/RoleController');
const router = express.Router();

//role router
router.post('/create-role', RoleController.createRole);

//permission router
router.post('/create-permission', PermissionController.createPermission)


module.exports = router;