const { Item } = require('../models/mongoose/Item');

class ItemService {
    static async create(item){
        const obj = new Item(item);

        obj.save();
    }

    static async update(itemId, item){
        return Item.findByIdAndUpdate(itemId, item, { new: true });

        // return obj;
    }

    static async getAll() {
        return Item.find({}).sort('-name');
    }

    static async getOne(itemId) {
        return Item.findById(itemId);
    }

    static async remove(itemId) {
        return Item.findByIdAndDelete(itemId)
    }

    static async getItemBySKU(sku){
        return Item.findOne({sku: sku});
    }
}

module.exports = ItemService;