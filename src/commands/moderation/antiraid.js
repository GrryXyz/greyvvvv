const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const GuildConfig = require("../../models/GuildConfig");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("antiraid")
    .setDescription("Setup anti raid")
    .addBooleanOption(o => o.setName("status").setRequired(true))
    .addIntegerOption(o => o.setName("limit").setDescription("join"))
    .addIntegerOption(o => o.setName("time").setDescription("detik"))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const status = interaction.options.getBoolean("status");
    const limit = interaction.options.getInteger("limit");
    const time = interaction.options.getInteger("time");

    await GuildConfig.findOneAndUpdate(
      { guildId: interaction.guild.id },
      {
        antiRaid: status,
        ...(limit && { raidLimit: limit }),
        ...(time && { raidTime: time })
      }
    );

    await interaction.editReply("🛡️ Anti-raid diperbarui.");
  }
};
