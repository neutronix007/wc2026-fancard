export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  const params = req.query.status ? `?status=${req.query.status}` : '';
  const url = `https://api.football-data.org/v4/competitions/WC/matches${params}`;

  try {
    const r = await fetch(url, {
      headers: { 'X-Auth-Token': '37b1f15695ef44159f197ee23d70f408' }
    });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch (e) {
    res.status(500).json({ error: 'upstream fetch failed' });
  }
}
