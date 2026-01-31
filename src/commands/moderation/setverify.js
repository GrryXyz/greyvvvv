const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  MessageFlags
} = require("discord.js");
const GuildConfig = require("../../models/GuildConfig");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setverify")
    .setDescription("Set role verifikasi")
    .addRoleOption(o =>
      o.setName("role")
        .setDescription("Role verified")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

  async execute(interaction) {
    // 🔒 DEFER SEKALI
    await interaction.deferReply({
      flags: MessageFlags.Ephemeral
    });

    const role = interaction.options.getRole("role");

    await GuildConfig.findOneAndUpdate(
      { guildId: interaction.guild.id },
      { verifyRole: role.id },
      { upsert: true }
    );

    // ✅ EDIT REPLY (BUKAN reply lagi)
    await interaction.editReply(
      `✅ Role verifikasi diset ke **${role.name}**`
    );
  }
};
