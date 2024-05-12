const mongoose = require("mongoose")
const titleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

}, {
    timestamps: true,
})
const todoschema = mongoose.model('titles', titleSchema);
module.exports = todoschema