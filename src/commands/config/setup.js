const { SlashCommandBuilder } = require('discord.js');
const GuildConfig = require('../../models/GuildConfig');

module.exports = {
  data: new SlashCommandBuilder().setName('setup').setDescription('Setup bot'),
  async execute(i) {
    await GuildConfig.findOneAndUpdate(
      { guildId: i.guild.id },
      { guildId: i.guild.id },
      { upsert: true }
    );
    i.reply('✅ Bot siap digunakan');
  }
};