const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  MessageFlags
} = require("discord.js");
const GuildConfig = require("../../models/GuildConfig");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("antilink")
    .setDescription("Aktif/nonaktifkan anti link")
    .addStringOption(o =>
      o.setName("mode")
        .setDescription("on / off")
        .setRequired(true)
        .addChoices(
          { name: "ON", value: "on" },
          { name: "OFF", value: "off" }
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    // 🔒 DEFER SEKALI
    await interaction.deferReply({
      flags: MessageFlags.Ephemeral
    });

    const mode = interaction.options.getString("mode");
    const status = mode === "on";

    await GuildConfig.findOneAndUpdate(
      { guildId: interaction.guild.id },
      { antiLink: status },
      { upsert: true }
    );

    // ✅ EDIT REPLY (BUKAN reply lagi)
    await interaction.editReply(
      `🔗 Anti-link **${status ? "AKTIF" : "NONAKTIF"}**`
    );
  }
};
