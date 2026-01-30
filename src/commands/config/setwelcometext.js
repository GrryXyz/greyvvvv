const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const GuildConfig = require("../../models/GuildConfig");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setwelcometext")
    .setDescription("Set teks welcome custom")
    .addStringOption(o =>
      o.setName("text")
       .setDescription("Gunakan {user}, {server}, {count}")
       .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    const text = interaction.options.getString("text");

    await GuildConfig.findOneAndUpdate(
      { guildId: interaction.guild.id },
      { welcomeText: text }
    );

    interaction.reply({
      content: "✅ Welcome text berhasil diupdate",
      ephemeral: true
    });
  }
};
