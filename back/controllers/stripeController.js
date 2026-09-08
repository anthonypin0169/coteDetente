const stripe = require('../config/stripe');
const { finalizePaidGiftCard } = require('./giftCardController');

exports.createCheckoutSession = async (req, res) => {
  try {
    if (!stripe) {
      return res.status(503).json({ message: 'Le paiement Stripe n\'est pas encore configuré (STRIPE_SECRET_KEY manquant)' });
    }

    const { senderName, senderEmail, recipientName, message, amount } = req.body;

    if (!senderName || !senderEmail || !recipientName || !amount) {
      return res.status(400).json({ message: 'Informations manquantes pour créer la carte cadeau' });
    }

    const frontendUrl = process.env.FRONTEND_URL;

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'eur',
          product_data: { name: `Carte cadeau Côté Détente - ${amount} €` },
          unit_amount: Math.round(Number(amount) * 100)
        },
        quantity: 1
      }],
      metadata: { senderName, senderEmail, recipientName, message: message || '', amount: String(amount) },
      success_url: `${frontendUrl}/carte-cadeau?paiement=succes`,
      cancel_url: `${frontendUrl}/carte-cadeau?paiement=annule`
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.handleWebhook = async (req, res) => {
  if (!stripe) {
    return res.status(503).send('Stripe n\'est pas configuré (STRIPE_SECRET_KEY manquant)');
  }

  let event;

  try {
    const signature = req.headers['stripe-signature'];
    event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    return res.status(400).send(`Webhook signature invalide: ${error.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const { senderName, senderEmail, recipientName, message, amount } = session.metadata;

    try {
      await finalizePaidGiftCard({ senderName, senderEmail, recipientName, message, amount: Number(amount) });
    } catch (error) {
      console.error('Erreur lors de la création de la carte cadeau après paiement :', error.message);
    }
  }

  res.json({ received: true });
};
