const userModel = require('../models/user.model');
const roleModel = require('../models/role.model');
const helper = require('../utils/helper');
const config = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const userController = {};


userController.list = async (req, res) => {
    try {
        const user = await userModel.find().populate('role');
        ;
        res.json({
            status: 'success',
            data: user
        });
    } catch (error) {
        helper.resError(res, error.message);
    }
};

userController.get = async (req, res) => {
    try {
        res.json(res.user);
    } catch (error) {
        helper.resError(res, error.message);
    }
};

userController.login = async (req, res) => {
    try {
        const tokenData = { email: res.user.email, id: res.user._id }
        const accessToken = jwt.sign(tokenData, config.access_token_secret, {
            expiresIn: config.access_token_expires_in,
        })
        res.user.token = accessToken;
        await res.user.save();
        res.json({
            status: 'success',
            data: {
                _id: res.user._id,
                token: res.user.token,
                email: res.user.email,
                role: res.user.role,
                first_name: res.user.first_name,
                last_name: res.user.last_name,
                active: res.user.active,
            }
        });
    } catch (error) {
        helper.resError(res, error.message);
    }
};

userController.tokenLogin = async (req, res) => {
    try {
        const { email, token } = req.body;
        if (!email || !token) {
            return helper.resError(res, 'Email or token is missing', 400);
        }
        jwt.verify(token, config.access_token_secret, async (err, data) => {
            if (err) {
                return helper.resError(res, 'No permission to access 1', 403);
            }
            // check email
            if (data.email != email) {
                return helper.resError(res, 'No permission to access 2', 403);
            }
            const user = await userModel.findOne({ email: email }).populate('role');
            if (!user) {
                return helper.resError(res, 'Cannot find the user.', 403);;
            }
            if (user.token !== token) {
                return helper.resError(res, 'No permission to access 3', 403);
            }
            res.json({
                status: 'success',
                data: {
                    _id: user._id,
                    token: user.token,
                    email: user.email,
                    role: user.role,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    active: user.active,
                }
            });
        });
    } catch (error) {
        helper.resError(res, error.message);
    }
};

userController.logout = async (req, res) => {
    try {
        const { email, token } = req.body;
        if (!email || !token) {
            return helper.resError(res, 'Email or token is missing', 400);
        }
        const user = await userModel.findOne({ email: email, token: token });
        if (!user) {
            return helper.resError(res, 'Cannot find the user.', 403);;
        }
        user.token = '';
        await user.save();
        res.json({ status: 'success', message: 'Logout successful' });
    } catch (error) {
        helper.resError(res, error.message);
    }
};

userController.register = async (req, res) => {
    try {
        const { email, password, first_name, last_name } = req.body;
        const role = await roleModel.findOne({ role_name: 'user' });
        console.log('register', role);
        const user = new userModel({
            email: email,
            active: true,
            first_name: first_name,
            last_name: last_name,
            password: await bcrypt.hashSync(password, 10),
            role: role?._id,
        });
        await user.save();
        res.status(201).json({ status: 'success', message: 'register successful' })
    } catch (error) {
        helper.resError(res, error.message);
    }
};

userController.add = async (req, res) => {
    try {
        const { email, password, first_name, last_name, role } = req.body;
        const user = new userModel({
            email: email,
            active: true,
            first_name: first_name,
            last_name: last_name,
            password: await bcrypt.hashSync(password, 10),
            role: role,
        });
        await user.save();
        res.status(201).json({ status: 'success', message: 'register successful' })
    } catch (error) {
        helper.resError(res, error.message);
    }
};

userController.update = async (req, res) => {
    try {
        const { first_name, last_name, active, password, role } = req.body;

        if (first_name) 
            res.user.first_name = first_name;
        if (last_name)
            res.user.last_name = last_name;
        if (active != undefined)
            res.user.active = active;
        if (role)
            res.user.role = role;
        if (password)
            res.user.password = await bcrypt.hashSync(password, 10);
        res.user.update_at = Date.now;

        await res.user.save();
        res.status(201).json({ status: 'success', message: 'Update user successful' })
    } catch (error) {
        helper.resError(res, error.message);
    }
};

userController.delete = async (req, res) => {
    try {
        await res.user.remove();
        res.json({ status: 'success', message: 'User deleted' });
    } catch (error) {
        helper.resError(res, error.message);
    }
};

userController.profile = async (req, res) => {
    try {
        const { first_name, last_name, password } = req.body;

        res.user.first_name = first_name;
        res.user.last_name = last_name;
        if (password) {
            res.user.password = await bcrypt.hashSync(password, 10);
        }
        res.user.update_at = Date.now;

        await res.user.save();
        res.status(201).json({ status: 'success', message: 'Update user successful' });
    } catch (error) {
        helper.resError(res, error.message);
    }
};

userController.inactive = async (req, res) => {
    try {
        res.user.active = false;
        res.user.update_at = Date.now;
        await res.user.save();
        res.status(201).json({ status: 'success', message: 'Inactive account successful' });
    } catch (error) {
        helper.resError(res, error.message);
    }
};

module.exports = userController;