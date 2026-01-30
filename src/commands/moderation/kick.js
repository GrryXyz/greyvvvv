const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick member")
    .addUserOption(o =>
      o.setName("user").setDescription("Target").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  async execute(i) {
    const user = i.options.getUser("user");
    const member = i.guild.members.cache.get(user.id);

    if (!member) return i.reply({ content: "User tidak ditemukan", ephemeral: true });

    await member.kick();
    i.reply(`👢 ${user.tag} dikick`);
  }
};
