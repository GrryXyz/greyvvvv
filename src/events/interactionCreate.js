const GuildConfig = require("../models/GuildConfig");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isButton()) return;
    if (interaction.customId !== "verify_user") return;

    const cfg = await GuildConfig.findOne({ guildId: interaction.guild.id });
    if (!cfg?.verifyRole) return;

    const role = interaction.guild.roles.cache.get(cfg.verifyRole);
    if (!role) return;

    await interaction.member.roles.add(role);

    interaction.reply({
      content: "✅ Kamu berhasil diverifikasi!",
      ephemeral: true
    });
  }
};
