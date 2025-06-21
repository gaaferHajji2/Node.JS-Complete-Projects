const mongoose = require('mongoose');

module.exports = (req, res, next) => {
    if (mongoose.isValidObjectId(req.params.Id)){
        return next();
    }

    req.session.messages.push({
        type: 'warning',
        text: 'Invalid ID Of Operation',
    });

    return res.redirect('/admin/user');
}