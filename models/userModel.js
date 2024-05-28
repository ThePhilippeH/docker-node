const Mongoose = require('mongoose');

const userSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
    },
});

const User = Mongoose.model('User', userSchema);

module.exports = User;
