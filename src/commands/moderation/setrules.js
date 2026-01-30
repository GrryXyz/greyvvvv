const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const GuildConfig = require("../../models/GuildConfig");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setrules")
    .setDescription("Set rules channel")
    .addChannelOption(o =>
      o.setName("channel").setDescription("Rules channel").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(i) {
    await GuildConfig.findOneAndUpdate(
      { guildId: i.guild.id },
      { rulesChannel: i.options.getChannel("channel").id }
    );

    i.reply({ content: "📜 Rules channel diset", ephemeral: true });
  }
};
