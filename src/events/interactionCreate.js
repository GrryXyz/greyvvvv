const GuildConfig = require("../models/GuildConfig");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    try {
      if (interaction.isChatInputCommand()) {
        const command = interaction.client.commands.get(
          interaction.commandName
        );

        if (!command) return;

        await interaction.deferReply({ ephemeral: true });
        return command.execute(interaction); // ⬅️ command WAJIB editReply
      }

      if (interaction.isButton()) {
        if (interaction.customId !== "verify_user") return;

        await interaction.deferReply({ ephemeral: true });

        const cfg = await GuildConfig.findOne({
          guildId: interaction.guild.id
        });

        if (!cfg?.verifyRole) {
          return interaction.editReply("❌ Verify role belum diset.");
        }

        const role = interaction.guild.roles.cache.get(cfg.verifyRole);
        if (!role) {
          return interaction.editReply("❌ Role tidak ditemukan.");
        }

        if (interaction.member.roles.cache.has(role.id)) {
          return interaction.editReply("✅ Kamu sudah terverifikasi.");
        }

        await interaction.member.roles.add(role);
        return interaction.editReply("🎉 Verifikasi berhasil!");
      }
    } catch (err) {
      console.error("interactionCreate error:", err);
      if (interaction.deferred) {
        interaction.editReply("❌ Terjadi error.");
      }
    }
  }
};
