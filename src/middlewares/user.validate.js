import validator from 'validator';

const ValidateUserId = (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id) || id <= 0) {
            return res.status(400).json({ status: 'error', message: 'Invalid user ID' });
        }
        req.validatedId = id;
        next();
    } catch (error) {
        return res.status(400).json({ status: 'error', message: error.message });
    }
};

const ValidateUserCreate = (req, res, next) => {
    try {
        const { name, email, age, birthYear, role } = req.body;
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ status: 'error', message: 'Name is required and must be a string' });
        }
        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({ status: 'error', message: 'Valid email is required' });
        }
        if (!Number.isInteger(age) || age < 0) {
            return res.status(400).json({ status: 'error', message: 'Age must be a non-negative integer' });
        }
        if (!Number.isInteger(birthYear) || birthYear < 1900 || birthYear > new Date().getFullYear()) {
            return res.status(400).json({ status: 'error', message: 'Invalid birth year' });
        }
        if (role && typeof role !== 'string') {
            return res.status(400).json({ status: 'error', message: 'Role must be a string' });
        }
        next();
    } catch (error) {
        return res.status(400).json({ status: 'error', message: error.message });
    }
};

const ValidateUserUpdate = (req, res, next) => {
    try {
        const { name, email, age, birthYear, role } = req.body;
        if (name && typeof name !== 'string') {
            return res.status(400).json({ status: 'error', message: 'Name must be a string' });
        }
        if (email && !validator.isEmail(email)) {
            return res.status(400).json({ status: 'error', message: 'Valid email is required' });
        }
        if (age && (!Number.isInteger(age) || age < 0)) {
            return res.status(400).json({ status: 'error', message: 'Age must be a non-negative integer' });
        }
        if (birthYear && (!Number.isInteger(birthYear) || birthYear < 1900 || birthYear > new Date().getFullYear())) {
            return res.status(400).json({ status: 'error', message: 'Invalid birth year' });
        }
        if (role && typeof role !== 'string') {
            return res.status(400).json({ status: 'error', message: 'Role must be a string' });
        }
        if (!name && !email && !age && !birthYear && !role) {
            return res.status(400).json({ status: 'error', message: 'At least one field must be provided for update' });
        }
        next();
    } catch (error) {
        return res.status(400).json({ status: 'error', message: error.message });
    }
};

export { ValidateUserId, ValidateUserCreate, ValidateUserUpdate };