const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');
const plantationRoutes = require('./routes/plantationRoutes');
const toolRoutes = require('./routes/toolRoutes');
const categoryRoutes = require('./routes/categoryRoutes'); // Rotas de categorias
const fertilizerRoutes = require('./routes/fertilizerRoutes');


dotenv.config(); // Carrega variáveis do .env

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parse de JSON
app.use(express.json());
app.use(cors());

// Conectando ao MongoDB Atlas com a URI do .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Conectado ao MongoDB Atlas!');
}).catch(err => {
  console.error('❌ Erro ao conectar ao MongoDB:', err);
});

// Usando rotas
app.use('/api/users', userRoutes);
app.use('/api/plantations', plantationRoutes);
app.use('/api/tools', toolRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api', fertilizerRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
