const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;
const NEWS_API_KEY = process.env.NEWS_API_KEY;

app.get('/api/news', async (req, res) => {
  const category = req.query.category || 'technology';

  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines', {
      params: {
        category,
        apiKey: NEWS_API_KEY,
        language: 'en',
        pageSize: 20,
      },
    });

    res.json({ articles: response.data.articles });
  } catch (err) {
    console.error('❌ Ошибка при получении новостей:', err.message);
    res.status(500).json({ error: 'Ошибка при получении новостей' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Сервер запущен на порту ${PORT}`);
});
