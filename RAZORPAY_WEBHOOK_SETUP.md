# Razorpay Webhook Setup Guide

## 🎯 Why Webhook is Required

Your payment system now uses **REAL PAYMENT VERIFICATION** through Razorpay webhooks. This ensures:

- ✅ **No fake payments**: Users can't lie about paying
- ✅ **Real verification**: Razorpay confirms actual payment
- ✅ **Secure activation**: Premium only for paying users
- ✅ **Professional flow**: Like real SAAS applications

## 🔧 Setup Instructions

### **Step 1: Get Webhook Secret**

1. **Login to Razorpay Dashboard**
   - Go to [razorpay.com](https://razorpay.com)
   - Login with your credentials

2. **Navigate to Webhooks**
   - Go to **Settings** → **Webhooks**
   - Click **Add Webhook**

3. **Configure Webhook**
   - **Webhook URL**: `https://yourapp.vercel.app/api/webhook/razorpay`
   - **Secret**: Copy the webhook secret (keep it safe!)
   - **Events to track**: 
     - ✅ `payment.captured`
     - ✅ `payment.failed`

4. **Save Webhook**
   - Click **Create Webhook**
   - Copy the **Webhook Secret** shown

### **Step 2: Update Environment Variables**

Add the webhook secret to your environment:

```bash
# In .env.local
RAZORPAY_WEBHOOK_SECRET=your_actual_webhook_secret_here
```

### **Step 3: Deploy to Vercel**

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add real payment verification with webhook"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import repository
   - Add environment variables including webhook secret
   - Deploy

3. **Update Webhook URL**
   - Go back to Razorpay webhook settings
   - Update webhook URL to your Vercel app URL
   - Test webhook connection

## 🚀 How It Works

### **Payment Flow:**
1. **User clicks upgrade** → Razorpay checkout opens
2. **User pays ₹99** → Razorpay processes payment
3. **Payment successful** → Razorpay sends webhook to your app
4. **Webhook verifies** → Updates database with premium access
5. **User sees premium** → Real premium features activated

### **Security Features:**
- **Signature verification**: Ensures webhook is from Razorpay
- **Amount verification**: Only activates for ₹99 payments
- **Email verification**: Links payment to user account
- **Status verification**: Only activates successful payments

## 🔍 Testing

### **Test Payment:**
1. **Click upgrade** → Use test card details
2. **Complete payment** → Use Razorpay test cards
3. **Check webhook logs** → Verify webhook received
4. **Check database** → User should have premium access

### **Test Cards:**
- **Success**: `4111 1111 1111 1111` (any future date, any CVV)
- **Failure**: `4000 0000 0000 0002` (any future date, any CVV)

## 📊 Webhook Events Handled

### **`payment.captured`**:
- ✅ Verifies payment amount (₹99)
- ✅ Updates user subscription in database
- ✅ Sets plan to "Professional"
- ✅ Records payment ID and timestamp

### **`payment.failed`**:
- ❌ Logs payment failure
- ❌ Does not activate premium
- ❌ Keeps user on free plan

## 🔒 Security Notes

### **Webhook Security:**
- **Signature verification**: Prevents fake webhooks
- **HTTPS required**: Secure communication
- **Secret protection**: Keep webhook secret safe
- **IP whitelisting**: Optional for extra security

### **Payment Verification:**
- **Amount check**: Only activates for ₹99 payments
- **Status check**: Only successful payments
- **Email verification**: Links to correct user
- **Duplicate prevention**: Prevents double activation

## 🎯 Benefits

### **For Your Business:**
- **Revenue protection**: No free premium access
- **Real verification**: Only paying users get premium
- **Professional system**: Like real SAAS apps
- **Scalable**: Handles thousands of users

### **For Users:**
- **Fair system**: Only paying users get premium
- **Instant activation**: Premium activates immediately
- **Secure payment**: Trusted Razorpay processing
- **Professional experience**: Like other SAAS apps

## 🚨 Troubleshooting

### **Webhook Not Working:**
1. **Check webhook URL**: Ensure it's correct
2. **Verify webhook secret**: Must match exactly
3. **Check Vercel logs**: See webhook errors
4. **Test webhook**: Use Razorpay test tool

### **Payment Not Activating:**
1. **Check webhook logs**: Was webhook received?
2. **Check database**: Was subscription updated?
3. **Check amount**: Was it exactly ₹99?
4. **Check email**: Does user email match?

---

**🎉 Your payment system is now enterprise-grade with real verification!**

**Users can only get premium by actually paying - no more fake payments!** 💰
