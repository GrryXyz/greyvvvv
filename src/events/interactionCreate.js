module.exports = {
    name: "interactionCreate",
    async execute(interaction) {
      if (!interaction.isChatInputCommand()) return;
  
      const command = interaction.client.commands.get(interaction.commandName);
      if (!command) return;
  
      try {
        await command.execute(interaction);
      } catch (err) {
        console.error(err);
  
        if (interaction.replied || interaction.deferred) {
          interaction.followUp({
            content: "❌ Terjadi error saat menjalankan command",
            ephemeral: true
          });
        } else {
          interaction.reply({
            content: "❌ Terjadi error saat menjalankan command",
            ephemeral: true
          });
        }
      }
    }
  };