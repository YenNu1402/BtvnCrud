import express from 'express';
import userController from '../../controllers/user.controller.js';
import {
    ValidateUserId,
    ValidateUserCreate,
    ValidateUserUpdate
} from '../../middlewares/user.validate.js';

const router = express.Router();

router.route('/')
    .get(userController.GetAll)
    .post(ValidateUserCreate, userController.Create);

router.route('/:id')
    .get(ValidateUserId, userController.GetById)
    .put(ValidateUserId, ValidateUserUpdate, userController.Update)
    .delete(ValidateUserId, userController.Delete);

export default router;