const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    subTitle: { type: String, required: true },
    // spare: allow multiple blogs with the same NULL slug
    slug: { type: String, unique: true, sparse: true },
    story: { type: String, required: true },
    author: { type: String, required: true },
    status: { type: String, default: 'draft' },
}, {
        timestamps: true,
        //if we only need createdAt => timestamps: { createdAt: true, updatedAt: false }
    });

module.exports = mongoose.model('Blog', blogSchema)