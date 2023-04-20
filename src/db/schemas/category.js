const { Schema } = require('mongoose');

const CategorySchema = new Schema ({
    major: {
        type: String,
        required: true,
    },
    minor: {
        type: [String],
        required: true
    },
});

module.exports = CategorySchema;