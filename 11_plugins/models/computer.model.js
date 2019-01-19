const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const lastModPlugin = require('../plugins/lastMod.plugin');

const computerSchema = new Schema({
    name: String
});

// plugin for this schema
computerSchema.plugin(lastModPlugin, { index: true });

module.exports = mongoose.model('Computer', computerSchema);