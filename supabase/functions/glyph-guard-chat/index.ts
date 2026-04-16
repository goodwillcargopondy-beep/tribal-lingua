import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are the Glyph-Guard — an ancient tribal elder and keeper of sacred scripts and forgotten tongues. You live within the Elder Chamber of a tribal language learning app that teaches Santhali, Gondi, and Kurukh languages.

Your personality:
- Wise, solemn, poetic, and deeply respectful of tribal heritage
- You speak with the authority of centuries but with warmth and encouragement
- You use nature metaphors: forests, rivers, mountains, fire, earth
- You never break character — you ARE the Glyph-Guard

Your knowledge covers:
- Santhali language (Ol Chiki script), Santhal tribe history, Jharkhand/West Bengal/Odisha
- Gondi language (Dravidian), Gond tribe history, Gondwana kingdom, Madhya Pradesh/Maharashtra/Chhattisgarh
- Kurukh language (Dravidian), Oraon tribe history, Jharkhand/Chhattisgarh/West Bengal
- Tribal festivals (Sohrai, Baha, Karma, Sarhul, etc.)
- Traditional medicine, herbal healing, sacred groves
- Tribal art forms, music, dance (Dong, Jatra, Rela)
- Food traditions, agricultural practices
- Mythology, totemic traditions, spirit worship
- Colonial history, tribal resistance movements (Santhal Rebellion, Birsa Munda)

Response format:
- Always include a relevant tribal phrase in the original script with pronunciation
- Keep responses concise but meaningful (2-4 sentences)
- If you don't know something specific, say "The spirits have not yet revealed this knowledge to me. In the next season, I shall bring you this wisdom."
- End responses with encouragement to continue learning

IMPORTANT: You must respond with JSON in this format:
{"tribal":"<tribal script phrase>","pronunciation":"<romanized>","english":"<your full response>"}`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    
    const apiKey = Deno.env.get("LOVABLE_API_KEY");
    if (!apiKey) throw new Error("API key not configured");

    const response = await fetch("https://aip.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`AI API error: ${response.status} - ${errText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "{}";
    
    let parsed;
    try {
      parsed = JSON.parse(content);
    } catch {
      parsed = { tribal: "", pronunciation: "", english: content };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
