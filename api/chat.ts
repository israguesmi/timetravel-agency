export const config = {
  runtime: 'nodejs',
};

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
Ton role : conseiller les clients sur les meilleures destinations temporelles.

Ton ton :
- Professionnel mais chaleureux
- Passionne d'histoire
- Toujours enthousiaste sans etre trop familier
- Expertise en voyage temporel (fictif mais credible)

Tu connais parfaitement :
- Paris 1889 (Belle Epoque, Tour Eiffel, Exposition Universelle)
- Cretace -65M (dinosaures, nature prehistorique)
- Florence 1504 (Renaissance, art, Michel-Ange)

Tu peux suggerer des destinations selon les interets du client, et proposer des prix
coherents et fictifs (entre 15 000 EUR et 45 000 EUR selon la destination et la duree).

Reponds toujours en francais, de maniere concise (3-4 phrases maximum sauf si plus de detail est demande).`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Methode non autorisee' });
    return;
  }

  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Cle API Mistral non configuree sur le serveur' });
    return;
  }

  try {
    const { messages } = req.body;

    if (!Array.isArray(messages)) {
      res.status(400).json({ error: 'Format de messages invalide' });
      return;
    }

    const mistralMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages.map((m: { role: string; content: string }) => ({
        role: m.role,
        content: m.content,
      })),
    ];

    const mistralResponse = await fetch('https://api.mistral.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mistral-small-latest',
        messages: mistralMessages,
        temperature: 0.7,
        max_tokens: 400,
      }),
    });

    if (!mistralResponse.ok) {
      const errorText = await mistralResponse.text();
      console.error('Erreur Mistral API:', errorText);
      res.status(502).json({ error: "Erreur lors de l'appel a l'API Mistral" });
      return;
    }

    const data = await mistralResponse.json();
    const reply = data.choices?.[0]?.message?.content ?? "Je n'ai pas pu generer de reponse.";

    res.status(200).json({ reply });
  } catch (error) {
    console.error('Erreur serveur:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
