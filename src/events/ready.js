const { ActivityType } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    const activities = [
      { name: "NexusGy | By Grry 🚀", type: ActivityType.Watching },
      { name: "/help | NexusGy", type: ActivityType.Playing },
      { name: "anti raid & verify", type: ActivityType.Listening }
    ];

    let i = 0;
    setInterval(() => {
      client.user.setActivity(
        activities[i].name,
        { type: activities[i].type }
      );
      i = (i + 1) % activities.length;
    }, 15000); // ganti tiap 15 detik
  }
};
