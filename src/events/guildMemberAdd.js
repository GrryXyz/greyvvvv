const { EmbedBuilder, time } = require("discord.js");
const GuildConfig = require("../models/GuildConfig");
const antiRaid = require("../utils/antiRaid");

function accountAge(date) {
  const days = Math.floor((Date.now() - date.getTime()) / 86400000);
  return `${days} hari`;
}

module.exports = {
  name: "guildMemberAdd",
  async execute(member) {
    const cfg = await GuildConfig.findOne({ guildId: member.guild.id });
    if (!cfg?.welcomeChannel) return;

    const channel = member.guild.channels.cache.get(cfg.welcomeChannel);
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

    let text = cfg.welcomeText;
    for (const key in replacements) {
      text = text.replaceAll(key, replacements[key]);
    }

    const embed = new EmbedBuilder()
      .setColor(0x00ff99)
      .setTitle("🎉 Welcome!")
      .setDescription(text)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setFooter({
        text: `User ID: ${member.id}`
      })
      .setTimestamp();

    // 🛑 ANTI RAID
    if (!cfg?.antiRaid) return;

    const isRaid = antiRaid(
      member.guild.id,
      cfg.raidLimit || 5,
      cfg.raidTime || 10
    );

    if (!isRaid) return;

    // Kick member yang baru join
    await member.kick("Anti-Raid: mass join").catch(() => {});

    // Lock server (deny send message)
    const everyone = member.guild.roles.everyone;
    await everyone.setPermissions(
      everyone.permissions.remove(PermissionFlagsBits.SendMessages)
    ).catch(() => {});

    // Log
    if (cfg.logChannel) {
      const log = member.guild.channels.cache.get(cfg.logChannel);
      if (log) {
        const embed = new EmbedBuilder()
          .setColor(0xff0000)
          .setTitle("🛑 Anti-Raid Aktif")
          .setDescription(
            `Mass join terdeteksi.\nServer dikunci **${cfg.raidLockTime || 120}s**`
          )
          .setTimestamp();
        log.send({ embeds: [embed] }).catch(() => {});
      }
    }

    // Auto unlock
    setTimeout(async () => {
      await everyone.setPermissions(
        everyone.permissions.add(PermissionFlagsBits.SendMessages)
      ).catch(() => {});
    }, (cfg.raidLockTime || 120) * 1000);
  }
  
    // 🔐 VERIFY SYSTEM
    if (cfg.verifyEnabled && cfg.verifyChannel && cfg.verifyRole) {
      const channel = member.guild.channels.cache.get(cfg.verifyChannel);
      if (!channel) return;

      const embed = new EmbedBuilder()
        .setColor(0xffcc00)
        .setTitle("🔐 Verifikasi")
        .setDescription(
          `Halo ${member}!\nKlik tombol di bawah untuk **verifikasi** dan membuka akses server.`
        );

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("verify_user")
          .setLabel("✅ Verify")
          .setStyle(ButtonStyle.Success)
      );

      channel.send({ embeds: [embed], components: [row] });
    }
  }
};


    

