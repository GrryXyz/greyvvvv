const fs = require('fs');
const { REST, Routes } = require('discord.js');

module.exports = async (client) => {
  const commands = [];
  const folders = fs.readdirSync('./src/commands');

  for (const folder of folders) {
    const files = fs.readdirSync(`./src/commands/${folder}`);
    for (const file of files) {
      const cmd = require(`../commands/${folder}/${file}`);
      client.commands.set(cmd.data.name, cmd);
      commands.push(cmd.data.toJSON());
    }
  }

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    { body: commands }
  );
  console.log("Slash commands registered");
};