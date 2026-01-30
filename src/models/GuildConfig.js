const { Schema, model } = require("mongoose");

module.exports = model("GuildConfig", new Schema({
  guildId: String,
  language: { type: String, default: "id" },

  antiLink: { type: Boolean, default: false },

  welcomeChannel: String,
  rulesChannel: String,

  welcomeText: {
    type: String,
    default: "👋 Welcome {user} ke **{server}**!"
  }
}));

