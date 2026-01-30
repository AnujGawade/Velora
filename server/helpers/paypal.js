const paypal = require('paypal-rest-sdk');

paypal.configure({
  mode: 'sandbox',
  client_id:
    'Acm4FTVBl8aT4DbgjNvOJEX2AS_b5s0nHRFQy1pPmXPQUg7F-zC3vu641iJPuI2oaP_4_kWuSVp_-Hl4',
  client_secret:
    'ECcpzZVsheCw0YS6jH1DwgdSRk2uxoDwHe8mfkrdmgL0cUFZ-qHCNZJjy0xsjQa5H_Fi0EiG-06O4Fk8',
});

module.exports = paypal;
