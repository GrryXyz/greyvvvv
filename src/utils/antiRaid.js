const joins = new Map();

module.exports = function antiRaid(guildId, limit, time) {
  const now = Date.now();
  if (!joins.has(guildId)) joins.set(guildId, []);

  const arr = joins.get(guildId).filter(t => now - t < time * 1000);
  arr.push(now);
  joins.set(guildId, arr);

  return arr.length >= limit;
};

