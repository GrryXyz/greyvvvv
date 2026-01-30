const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout member")
    .addUserOption(o =>
      o.setName("user").setDescription("Target").setRequired(true)
    )
    .addStringOption(o =>
      o.setName("time").setDescription("10m / 1h").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),

  async execute(i) {
    const user = i.options.getUser("user");
    const time = ms(i.options.getString("time"));
    const member = await i.guild.members.fetch(user.id);

    await member.timeout(time);
    i.reply(`⏳ ${user.tag} ditimeout`);
  }
};
