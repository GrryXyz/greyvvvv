const { EmbedBuilder, time } = require("discord.js");
const GuildConfig = require("../models/GuildConfig");

function accountAge(date) {
  const days = Math.floor((Date.now() - date.getTime()) / 86400000);
  return `${days} hari`;
}

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    const cfg = await GuildConfig.findOne({ guildId: member.guild.id });
    if (!cfg?.welcomeChannel) return;

    const channel = member.guild.channels.cache.get(cfg.welcomeChannel);
    if (!channel) return;

    const replacements = {
      "{user}": `${member}`,
      "{username}": member.user.username,
      "{tag}": member.user.tag,
      "{userid}": member.id,
      "{server}": member.guild.name,
      "{count}": member.guild.memberCount.toString(),
      "{created}": accountAge(member.user.createdAt),
      "{rules}": cfg.rulesChannel
        ? `<#${cfg.rulesChannel}>`
        : "rules channel"
    };

    let text = cfg.welcomeText;
    for (const key in replacements) {
      text = text.replaceAll(key, replacements[key]);
    }

    const embed = new EmbedBuilder()
      .setColor(0x00ff99)
      .setTitle("🎉 Welcome!")
      .setDescription(text)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setFooter({
        text: `User ID: ${member.id}`
      })
      .setTimestamp();

    channel.send({ embeds: [embed] });
  }
};
