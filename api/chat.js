exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: '只允许 POST 请求' })
    };
  }

  try {
    const { messages } = JSON.parse(event.body);
    if (!messages) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: '缺少 messages 参数' })
      };
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    const model = process.env.OPENROUTER_MODEL || "nvidia/nemotron-3-ultra-550b-a55b:free";

    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: '服务器未配置 API Key' })
      };
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        model, 
        messages,
        max_tokens: 1000
      })
    });

    const data = await response.json();

    if (data.error) {
      return {
        statusCode: 200,
        body: JSON.stringify({ error: data.error.message })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ reply: data.choices[0].message.content })
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: '服务器请求失败：' + error.message })
    };
  }
};
