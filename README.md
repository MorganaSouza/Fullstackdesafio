# 🌾 Fullstack Desafio - Sistema de Gerenciamento Agrícola

Este projeto é um sistema web fullstack voltado para o gerenciamento agrícola, desenvolvido como parte de um desafio de aprendizado.
Ele permite gerenciar usuários, plantações, ferramentas, manutenções e categorias agrícolas.

## 📁 Estrutura do Projeto

```
data_table/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── css/
│   ├── js/
│   ├── index.html
│   ├── category.html
│   ├── plantations.html
│   ├── tools.html
│   ├── fertilizer.html
│   ├── package.json
├── .gitignore
└── README.md
```

## 🚀 Tecnologias Utilizadas

### Backend
- Node.js
- Express
- MongoDB (Atlas)
- Mongoose

### Frontend
- HTML5
- CSS3
- JavaScript

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na pasta `backend/` com o seguinte conteúdo:

```env
MONGODB_URI=coloque_sua_string_de_conexao_aqui
PORT=5000
```

## ▶️ Como Rodar o Projeto

### Backend

```bash
cd backend
npm install
npm start
```

### Frontend

Basta abrir o `index.html` na pasta `frontend` em seu navegador.

## 🧾 Funcionalidades

- [x] Cadastro e listagem de usuários
- [x] Cadastro de plantações, ferramentas, fertilizantes
- [x] Gerenciamento por categorias agrícolas
- [x] Interface web simples e direta

## 🛡️ Avisos

- Este projeto é uma simulação educacional, com foco em aprendizado de integração fullstack.
- O `.env` está ignorado no Git por questões de segurança.

## 📌 Repositório

[🔗 GitHub - Fullstackdesafio](https://github.com/MorganaSouza/Fullstackdesafio)

---

Desenvolvido com 💚 por [Morgana Souza](https://github.com/MorganaSouza)
```

