const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  guildId: { type: String, required: true },

  // ===== RPG =====
  level: { type: Number, default: 1 },
  exp: { type: Number, default: 0 },
  gold: { type: Number, default: 0 },
  lastHunt: { type: Number, default: 0 },

  // ===== ECONOMY (future) =====
  bank: { type: Number, default: 0 },

  // ===== MODERATION =====
  warnings: { type: Number, default: 0 },

}, { timestamps: true });

UserSchema.index({ userId: 1, guildId: 1 }, { unique: true });

module.exports = mongoose.model("User", UserSchema);
