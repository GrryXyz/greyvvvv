const { MessageFlags } = require("discord.js");
const GuildConfig = require("../models/GuildConfig");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {

    /* ================= SLASH COMMAND ================= */
    if (interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(
        interaction.commandName
      );
      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (err) {
        console.error(err);

        if (!interaction.replied && !interaction.deferred) {
          await interaction.reply({
            content: "❌ Terjadi kesalahan",
            flags: MessageFlags.Ephemeral
          });
        }
      }
    }

    /* ================= VERIFY BUTTON ================= */
    if (interaction.isButton()) {
      if (interaction.customId !== "verify_user") return;

      try {
        const cfg = await GuildConfig.findOne({
          guildId: interaction.guild.id
        });

        if (!cfg?.verifyRole) {
          return interaction.reply({
            content: "❌ Verify role belum diset",
            flags: MessageFlags.Ephemeral
          });
        }

        await interaction.member.roles.add(cfg.verifyRole);

        await interaction.reply({
          content: "✅ Kamu berhasil diverifikasi!",
          flags: MessageFlags.Ephemeral
        });
      } catch (e) {
        console.error(e);
      }
    }
  }
};
