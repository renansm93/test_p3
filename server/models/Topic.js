const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TopicSchema = new Schema({
  name: String,
  category: String,
});

module.exports = mongoose.model('Topic', TopicSchema);
