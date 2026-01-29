const GuildConfig = require('../models/GuildConfig');

module.exports = {
  name: 'messageCreate',
  async execute(msg) {
    if (msg.author.bot || !msg.guild) return;
    const cfg = await GuildConfig.findOne({ guildId: msg.guild.id });
    if (!cfg?.antiLink) return;
    if (/https?:\/\//i.test(msg.content)) {
      await msg.delete();
      msg.channel.send('⚠️ Link dilarang');
    }
  }
};