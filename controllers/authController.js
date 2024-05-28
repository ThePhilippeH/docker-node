const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({ username, password: hashedPassword });
        res.status(201).json({
            status: 'success',
            data: {
                user: user
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
        });
    }
}

exports.deleteUser = async (req, res) => {
    try { 
        await User.findByIdAndDelete(req.user.id);
        res.status(204).json({
            status: 'success',
            data: null,
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'fail',
        });
    }
}

exports.login = async (req, res) => {
    const {username, password} = req.body;
    try{
        const user = await User.findOne({username});
        if(!user){
            return res.status(404).json({
                status: 'fail',
                message: 'User not found',
            });
        }
        const isCorrect = await bcrypt.compare(password, user.password);
        if(isCorrect){
            res.status(200).json({
                status: 'success',
            });
        }else{
            res.status(400).json({
                status: 'fail',
                message: 'Invalid credentials',
            });
        }
    }catch(error){
        res.status(400).json({
            status: 'fail',
        });
    }
}