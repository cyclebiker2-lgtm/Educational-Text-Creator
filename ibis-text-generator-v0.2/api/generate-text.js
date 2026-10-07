export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { prompt } = req.body || {};
    if (!prompt || typeof prompt !== 'string') return res.status(400).json({ error: 'A prompt is required.' });
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'OPENAI_API_KEY is not configured in Vercel.' });
    const model = process.env.OPENAI_MODEL || 'gpt-6-sol';
    const r = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        store: false,
        instructions: 'You are the IBIS ESL Text Generator. Follow the supplied educational specification exactly. Return only the finished learner-ready content and requested support materials; do not discuss your process.',
        input: prompt
      })
    });
    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data?.error?.message || 'OpenAI request failed.' });
    const text = data.output_text || (data.output || []).flatMap(x => x.content || []).map(x => x.text || '').join('');
    if (!text) return res.status(502).json({ error: 'The model returned no text.' });
    return res.status(200).json({ text, model });
  } catch (err) {
    return res.status(500).json({ error: err?.message || 'Unexpected server error.' });
  }
}
