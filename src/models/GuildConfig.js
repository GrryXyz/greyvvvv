const { Schema, model } = require('mongoose');

module.exports = model('GuildConfig', new Schema({
  guildId: String,
  language: { type: String, default: 'id' },
  antiLink: { type: Boolean, default: false }
}));