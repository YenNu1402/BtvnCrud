import userService from '../services/user.service.js';

const GetAll = async (req, res, next) => {
    try {
        const data = await userService.GetAll();
        return res.status(200).json({ data });
    } catch (error) {
        next(error);
    }
};

const GetById = async (req, res, next) => {
    try {
        const id = req.validatedId || parseInt(req.params.id);
        const user = await userService.GetById(id);
        return res.status(200).json({ data: user });
    } catch (error) {
        next(error);
    }
};

const GetByField = async (req, res, next) => {
    try {
        const { field, value } = req.query;
        if (!field || !value) {
            return res.status(400).json({ error: 'Field and value are required' });
        }
        const users = await userService.GetByField(field, value);
        return res.status(200).json({ data: users });
    } catch (error) {
        next(error);
    }
};

const Create = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        return res.status(201).json({ message: 'User created', data: user });
    } catch (error) {
        next(error);
    }
};

const Update = async (req, res, next) => {
    try {
        const id = req.validatedId || parseInt(req.params.id);
        const user = await userService.updateUser(id, req.body);
        return res.status(200).json({ message: 'User updated', data: user });
    } catch (error) {
        next(error);
    }
};

const Delete = async (req, res, next) => {
    try {
        const id = req.validatedId || parseInt(req.params.id);
        const user = await userService.deleteUser(id);
        return res.status(200).json({ message: 'User deleted', data: user });
    } catch (error) {
        next(error);
    }
};

export default { GetAll, GetById, GetByField, Create, Update, Delete };