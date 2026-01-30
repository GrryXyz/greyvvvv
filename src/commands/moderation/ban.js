const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban member")
    .addUserOption(o =>
      o.setName("user").setDescription("Target").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(i) {
    const user = i.options.getUser("user");
    await i.guild.members.ban(user.id);
    i.reply(`⛔ ${user.tag} dibanned`);
  }
};
