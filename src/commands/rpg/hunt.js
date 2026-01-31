const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const RpgUser = require("../../models/User");

const COOLDOWN = 60 * 1000;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("hunt")
    .setDescription("Berburu monster untuk EXP & Gold"),

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

    const now = Date.now();
    if (now - user.lastHunt < COOLDOWN) {
      const sisa = Math.ceil((COOLDOWN - (now - user.lastHunt)) / 1000);
      return interaction.editReply(`⏳ Tunggu **${sisa}s** sebelum hunt lagi.`);
    }

    const expGain = Math.floor(Math.random() * 20) + 15;
    const goldGain = Math.floor(Math.random() * 60) + 30;

    user.exp += expGain;
    user.gold += goldGain;
    user.lastHunt = now;

    let levelUp = false;
    const needExp = user.level * 100;
    if (user.exp >= needExp) {
      user.exp -= needExp;
      user.level += 1;
      levelUp = true;
    }

    await user.save();

    const embed = new EmbedBuilder()
      .setColor(levelUp ? 0xffd700 : 0x00ff99)
      .setTitle(levelUp ? "🎉 LEVEL UP!" : "⚔️ HUNT RESULT")
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setDescription(
        levelUp
          ? `Kamu naik ke **Level ${user.level}**!`
          : "Kamu berhasil mengalahkan monster!"
      )
      .addFields(
        { name: "📈 EXP", value: `+${expGain}`, inline: true },
        { name: "💰 Gold", value: `+${goldGain}`, inline: true }
      )
      .setFooter({ text: "RPG Adventure" })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  }
};
