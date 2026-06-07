export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const BIN_ID = process.env.JSONBIN_BIN_ID;
  const API_KEY = process.env.JSONBIN_KEY;
  const BASE = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

  if (!BIN_ID || !API_KEY) {
    return res.status(500).json({ error: 'Missing JSONBIN_BIN_ID or JSONBIN_KEY env variables.' });
  }

  if (req.method === 'GET') {
    const r = await fetch(BASE + '/latest', {
      headers: { 'X-Master-Key': API_KEY }
    });
    const data = await r.json();
    return res.status(200).json(data.record);
  }

  if (req.method === 'PUT') {
    const r = await fetch(BASE, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-Master-Key': API_KEY },
      body: JSON.stringify(req.body)
    });
    const data = await r.json();
    return res.status(200).json(data.record);
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
