const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const photoRoutes = require('./routes/photoRoutes');
const postRoutes = require('./routes/postRoutes');
const giftCardRoutes = require('./routes/giftCardRoutes');
const contentRoutes = require('./routes/contentRoutes');
const staffRoutes = require('./routes/staffRoutes');
const typeRoutes = require('./routes/typeRoutes');
const sousTypeRoutes = require('./routes/sousTypeRoutes');
const prestationRoutes = require('./routes/prestationRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const connectDB = require('./config/db');
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/auth', authRoutes);
app.use('/api/photos', photoRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/giftcards', giftCardRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/types', typeRoutes);
app.use('/api/sous-types', sousTypeRoutes);
app.use('/api/prestations', prestationRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get('/', (req, res) => {
  res.send('API Côté Détente opérationnelle');
});

app.listen(process.env.PORT, () => {
  console.log(`Serveur démarré sur le port ${process.env.PORT}`);
});
