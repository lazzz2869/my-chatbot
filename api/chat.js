export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: '只允许 POST 请求' });
    }

    const { messages } = req.body;
    if (!messages) {
        return res.status(400).json({ error: '缺少 messages 参数' });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || "nvidia/nemotron-3-ultra-550b-a55b:free";

    if (!apiKey) {
        return res.status(500).json({ error: '服务器未配置 API Key' });
    }

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ model, messages })
        });

        const data = await response.json();

        if (data.error) {
            return res.status(200).json({ error: data.error.message });
        }

        return res.status(200).json({ reply: data.choices[0].message.content });

    } catch (error) {
        return res.status(500).json({ error: '服务器请求失败：' + error.message });
    }
}