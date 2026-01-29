const { SlashCommandBuilder } = require('discord.js');
const GuildConfig = require('../../models/GuildConfig');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('antilink')
    .setDescription('Toggle anti link')
    .addBooleanOption(o => o.setName('status').setDescription('on/off').setRequired(true)),
  async execute(i) {
    const status = i.options.getBoolean('status');
    await GuildConfig.findOneAndUpdate(
      { guildId: i.guild.id },
      { antiLink: status }
    );
    i.reply(status ? '🛡️ Anti link aktif' : '❌ Anti link mati');
  }
};