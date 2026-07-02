# 🚀 AI Content Generator SAAS

**LIVE DEMO** : https://rapidcontent.vercel.app

A **production-ready AI-powered content generation platform** built with Next.js 15, React 19, and TypeScript. This is a **real monetizable SAAS application** with live payment processing, not just a demo project.

## ✨ Features

### **🤖 AI Content Generation**
- **50+ Professional Templates**: Blog posts, social media, emails, marketing copy, and more
- **Groq API Integration**: Fast, high-quality AI responses
- **Real-time Generation**: Instant content creation
- **Smart Formatting**: Markdown and HTML rendering
- **Content Export**: Copy and download capabilities

### **💰 Real Monetization**
- **Live Payment Processing**: Razorpay integration with real transactions
- **Subscription Management**: Free and Professional tiers
- **Database Tracking**: User subscriptions stored in PostgreSQL
- **Instant Activation**: Premium features unlocked immediately after payment
- **Indian Market Optimized**: ₹99/month pricing strategy

### **🔐 User Management**
- **Clerk Authentication**: Secure email and Google sign-in
- **Usage Tracking**: Real-time word count monitoring
- **Subscription Status**: Dynamic UI based on user tier
- **Content History**: 1 month (free) vs 1 year (professional) storage
- **Usage Limits**: 1,00,000 (free) vs 10,00,000 (professional) words/month

### **🎨 Professional UI/UX**
- **Modern Design**: Tailwind CSS with custom components
- **Responsive Layout**: Perfect on desktop, tablet, and mobile
- **Loading States**: Professional user experience
- **Error Handling**: Comprehensive error management
- **Hydration Safe**: No React hydration errors

### **⚡ Production Architecture**
- **Next.js 15.1.7**: Latest React framework with App Router
- **React 19**: Cutting-edge React features
- **TypeScript**: Type-safe development
- **Neon Database**: Serverless PostgreSQL
- **Drizzle ORM**: Type-safe database queries
- **Vercel Ready**: Optimized for deployment

## 🏗️ Tech Stack

### **Frontend**
- **Next.js 15.1.7** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide Icons** - Icon library
- **Clerk** - Authentication

### **Backend**
- **Next.js API Routes** - Serverless functions
- **Neon Database** - PostgreSQL database
- **Drizzle ORM** - Database queries
- **Razorpay** - Payment processing
- **Groq API** - AI content generation

### **Deployment**
- **Vercel** - Hosting platform
- **GitHub** - Version control
- **Environment Variables** - Secure configuration

## 🚀 Quick Start

### **Prerequisites**
- Node.js 18+ 
- npm or yarn
- Git

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ai-content-generator.git
   cd ai-content-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your API keys to `.env.local`:
   ```bash
   # Groq API
   NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key
   GROQ_API_KEY=your_groq_api_key
   
   # Database
   DATABASE_URL=your_neon_database_url
   NEXT_PUBLIC_DRIZZLE_DB_URL=your_neon_database_url
   
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   
   # Razorpay (Test Mode)
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 💻 Usage

### **For Users**
1. **Sign up** with email or Google
2. **Choose a template** from 50+ options
3. **Fill in the form** with your content requirements
4. **Generate AI content** instantly
5. **Upgrade to Professional** for unlimited usage (₹99/month)

### **For Developers**
- **Study the code structure** for SAAS patterns
- **Examine payment integration** with Razorpay
- **Learn authentication flow** with Clerk
- **Review database schema** with Drizzle ORM
- **Analyze API design** and error handling

## 🌐 Deployment

### **Production Deployment**
1. **Push to GitHub**
2. **Deploy to Vercel**
3. **Add environment variables** to Vercel
4. **Configure Razorpay** for live payments
5. **Test live application**

### **Environment Variables for Production**
```bash
# Production URLs
NEXTAUTH_URL=https://yourapp.vercel.app
NEXT_PUBLIC_APP_URL=https://yourapp.vercel.app

# Live Razorpay Keys
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXXX
RAZORPAY_KEY_ID=rzp_live_XXXXXXXXXXXXXX
RAZORPAY_KEY_SECRET=live_secret_key_here
```

## 💰 Payment Integration

### **Razorpay Setup**
1. **Create Razorpay account** at [razorpay.com](https://razorpay.com)
2. **Complete KYC** for live payments
3. **Generate API keys** (test/live)
4. **Configure payment links** or webhooks
5. **Add website URL** to Razorpay dashboard

### **Payment Flow**
1. **User clicks** "Get Started"
2. **Opens Razorpay payment** modal/link
3. **User completes payment** (₹99/month)
4. **Payment verified** via webhook/API
5. **User upgraded** to Professional plan

---

## 🎯 Portfolio Showcase

### **💼 Technical Skills Demonstrated**
- **Modern Full-Stack Development**: Next.js 15 + React 19 + TypeScript
- **Real Payment Integration**: Razorpay SDK with live transactions
- **Database Architecture**: PostgreSQL + Drizzle ORM with proper schema design
- **Authentication System**: Clerk integration with secure user management
- **State Management**: React Context API with hydration-safe patterns
- **API Design**: RESTful endpoints with comprehensive error handling
- **Production Deployment**: Vercel-optimized with environment variables

### **🎯 Business Acumen Shown**
- **SAAS Architecture**: Complete subscription-based business model
- **Payment Processing**: Real monetization with Razorpay integration
- **User Psychology**: Conversion-optimized pricing strategy
- **Market Research**: Indian market pricing (₹99/month)
- **Scalability**: Built for growth with serverless architecture
- **User Experience**: Professional onboarding and retention

## 🔧 Development

### **Project Structure**
```
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── dashboard/      # User dashboard
│   └── (auth)/         # Authentication pages
├── components/         # Reusable components
├── lib/               # Utility functions
├── utils/             # Database and helpers
└── public/            # Static assets
```

### **Key Files**
- `app/api/` - Backend API endpoints
- `app/dashboard/` - Main application UI
- `utils/db.ts` - Database connection
- `utils/schema.ts` - Database schema
- `components/ui/` - UI components

## � Deployment Guide

### **⚡ Quick Deploy to Vercel**
1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Production-ready SAAS with real payments"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import GitHub repository
   - Add environment variables
   - Deploy

3. **Add Environment Variables in Vercel**
   ```bash
   NEXT_PUBLIC_GROQ_API_KEY=your_groq_api_key_here
   DATABASE_URL=postgresql://neondb_owner:npg_nLJNyAR5Xb3l@ep-tiny-scene-a1c218tz-pooler.ap-southeast-1.aws.neon.tech/AI-Content-Generator?sslmode=require
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   CLERK_SECRET_KEY=sk_test_your_key_here
   NEXTAUTH_SECRET=your-random-secret-key-for-production
   NEXTAUTH_URL=https://yourapp.vercel.app
   ```

4. **Configure Razorpay for Live**
   - Add your Vercel URL to Razorpay dashboard
   - Switch to live mode
   - Update payment link for ₹99/month

### **🎯 Production Checklist**
- [x] **Payment Processing**: Real Razorpay integration
- [x] **Database**: Neon PostgreSQL with Drizzle ORM
- [x] **Authentication**: Clerk secure login
- [x] **Error Handling**: Comprehensive error management
- [x] **Performance**: Optimized for speed
- [x] **SEO**: Meta tags and descriptions
- [x] **Responsive**: Mobile-first design

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

- **Portfolio**: [https://rohitbadekar.vercel.app](https://rohitbadekar.vercel.app)
- **LinkedIn**: [https://www.linkedin.com/in/rohit-badekar](https://www.linkedin.com/in/rohit-badekar)
- **Email**: [mailto:rohitbadekar555@gmail.com](mailto:rohitbadekar555@gmail.com)

---

**🚀 This is not just a project - it's a real SAAS business ready for production and revenue!**
