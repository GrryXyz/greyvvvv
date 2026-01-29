const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder().setName('invite').setDescription('Invite bot'),
  async execute(i) {
    const url = `https://discord.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=8&scope=bot%20applications.commands`;
    i.reply({ content: url, ephemeral: true });
  }
};