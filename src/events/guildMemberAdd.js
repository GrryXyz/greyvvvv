const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits
} = require("discord.js");

const GuildConfig = require("../models/GuildConfig");
const antiRaid = require("../utils/antiRaid");

function accountAge(date) {
  const days = Math.floor((Date.now() - date.getTime()) / 86400000);
  return `${days} hari`;
}

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    try {
      const cfg = await GuildConfig.findOne({ guildId: member.guild.id });
      if (!cfg) return;

      /* ================= ANTI RAID ================= */
      if (cfg.antiRaid) {
        const isRaid = antiRaid(
          member.guild.id,
          cfg.raidLimit || 5,
          cfg.raidTime || 10
        );

        if (isRaid) {
          await member.kick("Anti-Raid: mass join").catch(() => {});

          const everyone = member.guild.roles.everyone;
          await everyone.setPermissions(
            everyone.permissions.remove(PermissionFlagsBits.SendMessages)
          ).catch(() => {});

          setTimeout(async () => {
            await everyone.setPermissions(
              everyone.permissions.add(PermissionFlagsBits.SendMessages)
            ).catch(() => {});
          }, (cfg.raidLockTime || 120) * 1000);

          return; // ⛔ STOP setelah anti-raid
        }
      }

      /* ================= VERIFY SYSTEM ================= */
      if (cfg.verifyEnabled && cfg.verifyChannel && cfg.verifyRole) {
        const channel = member.guild.channels.cache.get(cfg.verifyChannel);
        if (!channel) return;

        const replacements = {
          "{user}": `${member}`,
          "{username}": member.user.username,
          "{tag}": member.user.tag,
          "{userid}": member.id,
          "{server}": member.guild.name,
          "{count}": member.guild.memberCount.toString(),
          "{created}": accountAge(member.user.createdAt),
          "{rules}": cfg.rulesChannel
            ? `<#${cfg.rulesChannel}>`
            : "rules channel"
        };

        let text =
          cfg.welcomeText ||
          "👋 Welcome {user} ke **{server}**!\nSilakan klik tombol verify.";

        for (const key in replacements) {
          text = text.replaceAll(key, replacements[key]);
        }

        const embed = new EmbedBuilder()
          .setColor(0x00ff99)
          .setTitle("🔐 Verifikasi Member")
          .setDescription(text)
          .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
          .setTimestamp();

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("verify_user")
            .setLabel("✅ Verify")
            .setStyle(ButtonStyle.Success)
        );

        await channel.send({
          embeds: [embed],
          components: [row]
        });
      }
    } catch (err) {
      console.error("guildMemberAdd error:", err);
    }
  }
};
