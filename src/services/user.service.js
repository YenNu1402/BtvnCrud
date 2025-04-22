import db from '../database/mongodb.js';
import validator from 'validator';

class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}

const GetAll = async () => {
    const mongoDB = await db.getDB();
    return mongoDB.collection('users').find().toArray();
};

const GetById = async (id) => {
    const mongoDB = await db.getDB();
    const user = await mongoDB.collection('users').findOne({ id });
    if (!user) {
        throw new NotFoundError(`User with ID ${id} not found`);
    }
    return user;
};

const GetByField = async (field, value) => {
    const mongoDB = await db.getDB();
    let query;
    if (field === 'age' || field === 'birthYear') {
        const numValue = parseInt(value);
        if (isNaN(numValue)) {
            throw new Error(`Invalid ${field} value`);
        }
        query = { [field]: numValue };
    } else {
        query = { [field]: value };
    }
    return mongoDB.collection('users').find(query).toArray();
};

const createUser = async ({ name, email, age, birthYear, role = 'user' }) => {
    if (!name || !validator.isEmail(email) || !Number.isInteger(age) || !Number.isInteger(birthYear)) {
        throw new Error('Invalid user data');
    }
    const mongoDB = await db.getDB();
    const existing = await mongoDB.collection('users').findOne({ email });
    if (existing) {
        throw new Error('Email already exists');
    }
    const id = Date.now(); // Simple ID generation
    const user = { id, name, email, age, birthYear, role };
    await mongoDB.collection('users').insertOne(user);
    return user;
};

const updateUser = async (id, updateData) => {
    const { name, email, age, birthYear, role } = updateData;
    if ((name && typeof name !== 'string') ||
        (email && !validator.isEmail(email)) ||
        (age && !Number.isInteger(age)) ||
        (birthYear && !Number.isInteger(birthYear)) ||
        (role && typeof role !== 'string')) {
        throw new Error('Invalid update data');
    }
    const mongoDB = await db.getDB();
    if (email) {
        const existing = await mongoDB.collection('users').findOne({ email, id: { $ne: id } });
        if (existing) {
            throw new Error('Email already exists');
        }
    }
    const result = await mongoDB.collection('users').findOneAndUpdate(
        { id },
        { $set: updateData },
        { returnDocument: 'after' }
    );
    if (!result.value) {
        throw new NotFoundError(`User with ID ${id} not found`);
    }
    return result.value;
};

const deleteUser = async (id) => {
    const mongoDB = await db.getDB();
    const result = await mongoDB.collection('users').findOneAndDelete({ id });
    if (!result.value) {
        throw new NotFoundError(`User with ID ${id} not found`);
    }
    return result.value;
};

export default {
    GetAll,
    GetById,
    GetByField,
    createUser,
    updateUser,
    deleteUser
};