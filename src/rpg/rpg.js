require("dotenv").config();
const keepAlive = require("./keep_alive");
const heroes = require("./heroes.json");

const {
  Client,
  GatewayIntentBits,
  Events,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once(Events.ClientReady, async () => {
  console.log(`✅ Bot online sebagai ${client.user.tag}`);

  const command = new SlashCommandBuilder()
    .setName("mlbb")
    .setDescription("MLBB Bot Menu");

  await client.application.commands.set([command]);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isChatInputCommand()) {
    if (interaction.commandName === "mlbb") {
      const embed = new EmbedBuilder()
        .setTitle("🎮 MLBB BOT FULL")
        .setDescription("Pilih menu di bawah")
        .setColor(0xff0000);

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("hero")
          .setLabel("Hero List")
          .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
          .setCustomId("tier")
          .setLabel("Tier List")
          .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
          .setCustomId("build")
          .setLabel("Build Hero")
          .setStyle(ButtonStyle.Danger)
      );

      await interaction.reply({ embeds: [embed], components: [row] });
    }
  }

  if (interaction.isButton()) {
    if (interaction.customId === "hero") {
      const list = Object.keys(heroes).join(", ");
      await interaction.reply({ content: `📜 **Hero MLBB:**\n${list}`, ephemeral: true });
    }

    if (interaction.customId === "tier") {
      let text = "";
      for (const h in heroes) {
        text += `**${h.toUpperCase()}** — Tier ${heroes[h].tier}\n`;
      }
      await interaction.reply({ content: `🏆 **Tier List**\n${text}`, ephemeral: true });
    }

    if (interaction.customId === "build") {
      let text = "";
      for (const h in heroes) {
        text += `**${h.toUpperCase()}**\n${heroes[h].build}\n\n`;
      }
      await interaction.reply({ content: `⚔️ **Build Hero**\n${text}`, ephemeral: true });
    }
  }
});

keepAlive();
client.login(process.env.TOKEN);
