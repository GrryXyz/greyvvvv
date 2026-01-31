const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const RpgUser = require("../../models/RpgUser");

function progressBar(current, max, size = 10) {
  const filled = Math.round((current / max) * size);
  return "🟩".repeat(filled) + "⬛".repeat(size - filled);
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rpg")
    .setDescription("Lihat profile RPG kamu"),

  async execute(interaction) {
    let user = await RpgUser.findOne({
      userId: interaction.user.id,
      guildId: interaction.guild.id
    });

    if (!user) {
      user = await RpgUser.create({
        userId: interaction.user.id,
        guildId: interaction.guild.id
      });
    }

    const needExp = user.level * 100;

    const embed = new EmbedBuilder()
      .setColor(0x7cffcb)
      .setTitle("🧙 RPG PROFILE")
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setDescription(
        `**${interaction.user.username}**\n` +
        `Petualang dari **${interaction.guild.name}**`
      )
      .addFields(
        {
          name: "⭐ Level",
          value: `${user.level}`,
          inline: true
        },
        {
          name: "💰 Gold",
          value: `${user.gold}`,
          inline: true
        },
        {
          name: "📈 EXP",
          value:
            `${user.exp} / ${needExp}\n` +
            progressBar(user.exp, needExp),
          inline: false
        }
      )
      .setFooter({
        text: "RPG System • Bot Publik"
      })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  }
};
