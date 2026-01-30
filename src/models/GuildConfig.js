const { Schema, model } = require("mongoose");

module.exports = model("GuildConfig", new Schema({
  guildId: String,
  language: { type: String, default: "id" },

  // Security
  antiLink: { type: Boolean, default: false },

  // welcome
  welcomeChannel: String,
  welcomeText: String,
  rulesChannel: String,

  // anti raid
  antiRaid: { type: Boolean, default: true },
  raidLimit: { type: Number, default: 5 }, // join
  raidTime: { type: Number, default: 10 }, // detik

  // verify
  verifyEnabled: { type: Boolean, default: true },
  verifyRole: String,
  verifyChannel: String
}));
