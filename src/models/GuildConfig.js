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
  raidLimit: { type: Number, default: 5 },   // jumlah join
  raidTime: { type: Number, default: 10 },   // detik
  raidLockTime: { type: Number, default: 120 }, // detik lock
  logChannel: String,


  // verify
  verifyEnabled: { type: Boolean, default: true },
  verifyRole: String,
  verifyChannel: String
}));
