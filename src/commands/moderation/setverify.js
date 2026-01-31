const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const GuildConfig = require("../../models/GuildConfig");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setverify")
    .setDescription("Setup verify system")
    .addChannelOption(o =>
      o.setName("channel").setDescription("Verify channel").setRequired(true)
    )
    .addRoleOption(o =>
      o.setName("role").setDescription("Verified role").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(i) {
    await GuildConfig.findOneAndUpdate(
      { guildId: i.guild.id },
      {
        verifyChannel: i.options.getChannel("channel").id,
        verifyRole: i.options.getRole("role").id,
        verifyEnabled: true
      }
    );

    i.reply({ content: "🔐 Verify system aktif", ephemeral: true });
  }
};
