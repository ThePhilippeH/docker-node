const mongoose = require('mongoose');

const boulderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    grade: {
        type: String,
        required: [true, 'Please provide a grade'],
    },
    area: {
        type: String,
        required: [true, 'Please provide a location'],
    },
    date : {
        type: Date,
        default: Date.now
    },
    ascentType: {
        type: String,
        enum: ['redpoint', 'flash','not sent' ],
        required: [true, 'Please provide an ascent type'],
    },
    betaLink: {
        type: String,
        validate: {
            validator: function(value) {
                try {
                    new URL(value);
                    return true;
                } catch (error) {
                    return false;
                }
            },
            message: 'Please provide a valid URL for the beta link'
        }
    },  
});

module.exports = mongoose.model('Boulder', boulderSchema);