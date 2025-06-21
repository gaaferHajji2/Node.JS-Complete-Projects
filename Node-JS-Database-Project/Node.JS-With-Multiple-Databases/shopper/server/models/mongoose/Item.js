const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    sku: {
        type: Number,
        required: true,
        unique: true,
        index: true,
    },

    name: {
        type: String,
        index: true,
        unique: true,
        trim: true,
        required: true,
    },

    price: {
        type: Number,
        required: true,
        min: 0,
    }
}, {
    timestamps: true,
});

// ItemSchema.statics.findByName = async function getItemByName(name){
//     return this.find({ name });
// }

module.exports.ItemSchema = ItemSchema;

module.exports.Item = mongoose.model('Item', ItemSchema);