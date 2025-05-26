function extractId(url) {
  const match = url.match(/^\/items\/(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
}

module.exports = extractId