const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

async function main() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');

    console.log(`✅ Conectado ao banco: ${mongoose.connection.name}`);
  } catch (err) {
    console.error('❌ Erro ao conectar ao MongoDB:', err);
  }
}
