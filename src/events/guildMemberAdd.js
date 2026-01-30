const GuildConfig = require("../models/GuildConfig");

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    const cfg = await GuildConfig.findOne({ guildId: member.guild.id });
    if (!cfg?.welcomeChannel) return;

    const ch = member.guild.channels.cache.get(cfg.welcomeChannel);
    ch?.send(`👋 Welcome ${member} ke **${member.guild.name}**`);
  }
};
