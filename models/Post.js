const { model, Schema } = require('mongoose')

const PostSchema = new Schema({
	body: String,
	author: String,
	createdAt: String,
})

module.exports = model('Post', PostSchema)
