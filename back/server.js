const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const photoRoutes = require('./routes/photoRoutes');
const postRoutes = require('./routes/postRoutes');
const giftCardRoutes = require('./routes/giftCardRoutes');
const contentRoutes = require('./routes/contentRoutes');
const staffRoutes = require('./routes/staffRoutes');
const typeRoutes = require('./routes/typeRoutes');
const sousTypeRoutes = require('./routes/sousTypeRoutes');
const groupRoutes = require('./routes/groupRoutes');
const prestationRoutes = require('./routes/prestationRoutes');
const highlightCardRoutes = require('./routes/highlightCardRoutes');
const eventRoutes = require('./routes/eventRoutes');
const contactPageRoutes = require('./routes/contactPageRoutes');
const contactRoutes = require('./routes/contactRoutes');
const giftCardPageRoutes = require('./routes/giftCardPageRoutes');
const stripeRoutes = require('./routes/stripeRoutes');
const { handleWebhook } = require('./controllers/stripeController');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const connectDB = require('./config/db');
connectDB();

const app = express();

app.use(cors());
/* Le webhook Stripe a besoin du corps brut (non parsé en JSON) pour vérifier la signature,
il doit donc être déclaré avant express.json() */
app.post('/api/stripe/webhook', express.raw({ type: 'application/json' }), handleWebhook);
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
app.use('/api/groups', groupRoutes);
app.use('/api/prestations', prestationRoutes);
app.use('/api/highlight-cards', highlightCardRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/contact-page', contactPageRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/gift-card-page', giftCardPageRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get('/', (req, res) => {
  res.send('API Côté Détente opérationnelle');
});

app.listen(process.env.PORT, () => {
  console.log(`Serveur démarré sur le port ${process.env.PORT}`);
});
