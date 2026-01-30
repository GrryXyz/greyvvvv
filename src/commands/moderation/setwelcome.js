const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const GuildConfig = require("../../models/GuildConfig");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setwelcome")
    .setDescription("Set welcome channel")
    .addChannelOption(o =>
      o.setName("channel").setDescription("Channel").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(i) {
    await GuildConfig.findOneAndUpdate(
      { guildId: i.guild.id },
      { welcomeChannel: i.options.getChannel("channel").id }
    );
    i.reply("👋 Welcome channel diset");
  }
};
