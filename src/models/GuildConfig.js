const { Schema, model } = require("mongoose");

module.exports = model("GuildConfig", new Schema({
  guildId: String,
  language: { type: String, default: "id" },

  // security
  antiLink: { type: Boolean, default: false },

  // welcome
  welcomeChannel: String,
  autoRole: String
}));
