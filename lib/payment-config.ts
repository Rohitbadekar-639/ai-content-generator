// Payment configuration for international support
export const PAYMENT_CONFIG = {
  // Razorpay configuration
  razorpay: {
    // Live keys (from environment variables)
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    keySecret: process.env.RAZORPAY_KEY_SECRET!,
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET!,
    
    // Supported currencies
    currencies: {
      INR: {
        symbol: '₹',
        exchangeRate: 1, // Base currency
        minAmount: 1,
        maxAmount: 100000,
      },
      USD: {
        symbol: '$',
        exchangeRate: 83, // 1 USD ≈ 83 INR (approximate)
        minAmount: 1,
        maxAmount: 1200,
      },
      EUR: {
        symbol: '€',
        exchangeRate: 90, // 1 EUR ≈ 90 INR (approximate)
        minAmount: 1,
        maxAmount: 1100,
      },
      GBP: {
        symbol: '£',
        exchangeRate: 105, // 1 GBP ≈ 105 INR (approximate)
        minAmount: 1,
        maxAmount: 950,
      },
    },
    
    // Pricing plans
    plans: {
      professional: {
        INR: 99, // ₹99 for Indian users
        USD: 1.99, // ~$1.99 for international users
        EUR: 1.79, // ~€1.79 for European users
        GBP: 1.49, // ~£1.49 for UK users
      },
    },
    
    // Payment methods
    methods: [
      {
        id: 'card',
        name: 'Credit/Debit Card',
        icon: '💳',
        available: ['INR', 'USD', 'EUR', 'GBP'],
      },
      {
        id: 'upi',
        name: 'UPI',
        icon: '📱',
        available: ['INR'],
      },
      {
        id: 'netbanking',
        name: 'Net Banking',
        icon: '🏦',
        available: ['INR'],
      },
      {
        id: 'wallet',
        name: 'Wallet',
        icon: '👛',
        available: ['INR'],
      },
      {
        id: 'international',
        name: 'International Card',
        icon: '🌍',
        available: ['USD', 'EUR', 'GBP'],
      },
    ],
  },
  
  // Error messages
  errorMessages: {
    network: 'Network error. Please check your internet connection and try again.',
    service: 'Payment service temporarily unavailable. Please try again in a few minutes.',
    authentication: 'Authentication error. Please login again and try.',
    validation: 'Payment validation failed. Please refresh the page and try again.',
    general: 'Payment failed. Please try again.',
  },
  
  // Success messages
  successMessages: {
    payment: 'Payment successful! You now have lifetime premium access to all templates.',
    activation: 'Subscription activated successfully! Enjoy your premium features.',
  },
  
  // Retry configuration
  retry: {
    maxAttempts: 3,
    delay: 2000, // 2 seconds
    backoffMultiplier: 2,
  },
};

// Helper functions
export const getCurrencyByLocation = async (): Promise<string> => {
  // Detect user's currency based on location
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    const currency = data.currency || 'INR';
    
    // Fallback to INR if currency not supported
    return PAYMENT_CONFIG.razorpay.currencies[currency as keyof typeof PAYMENT_CONFIG.razorpay.currencies] 
      ? currency 
      : 'INR';
  } catch (error) {
    console.error('Error detecting currency:', error);
    return 'INR';
  }
};

export const getLocalizedPrice = (basePriceINR: number, currency: string): number => {
  const config = PAYMENT_CONFIG.razorpay.currencies[currency as keyof typeof PAYMENT_CONFIG.razorpay.currencies];
  if (!config) return basePriceINR;
  
  return Math.round(basePriceINR / config.exchangeRate * 100) / 100;
};

export const formatPrice = (amount: number, currency: string): string => {
  const config = PAYMENT_CONFIG.razorpay.currencies[currency as keyof typeof PAYMENT_CONFIG.razorpay.currencies];
  if (!config) return `₹${amount}`;
  
  return `${config.symbol}${amount.toFixed(2)}`;
};

export const validatePaymentAmount = (amount: number, currency: string): boolean => {
  const config = PAYMENT_CONFIG.razorpay.currencies[currency as keyof typeof PAYMENT_CONFIG.razorpay.currencies];
  if (!config) return false;
  
  return amount >= config.minAmount && amount <= config.maxAmount;
};

export const getAvailablePaymentMethods = (currency: string) => {
  return PAYMENT_CONFIG.razorpay.methods.filter(method => 
    method.available.includes(currency)
  );
};
