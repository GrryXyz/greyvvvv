const joins = new Map();

module.exports = function antiRaid(guildId, limit, timeSec) {
  const now = Date.now();
  const windowMs = timeSec * 1000;

  if (!joins.has(guildId)) joins.set(guildId, []);
  const arr = joins.get(guildId).filter(t => now - t < windowMs);

  arr.push(now);
  joins.set(guildId, arr);

  return arr.length >= limit;
};


