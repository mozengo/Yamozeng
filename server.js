require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/create-app', async (req, res) => {
  const { name, description, pages } = req.body;

  const prompt = `
  Crie um projeto simples de aplicativo chamado "${name}", que faz: ${description}.
  Deve conter as páginas: ${pages}.
  Responda com HTML, CSS e JavaScript separados para formar um site.
  `;

  try {
    const response = await axios.post("https://api.openai.com/v1/chat/completions", {
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    }, {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    const result = response.data.choices[0].message.content;
    res.json({ result });
  } catch (err) {
    console.error(err.response?.data || err);
    res.status(500).json({ error: "Erro ao gerar app com IA." });
  }
});

app.listen(3000, () => console.log("YAMOZENG IA rodando na porta 3000"));