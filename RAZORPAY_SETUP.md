# Razorpay Setup Guide

## 🚨 Current Issue
Your Razorpay test credentials are expired/invalid causing `401 BAD_REQUEST_ERROR`.

## 🔧 How to Fix

### Step 1: Get New Test Credentials
1. Go to https://dashboard.razorpay.com/
2. Login with your Razorpay account
3. Navigate to **Settings** → **API Keys**
4. Click **Generate New Key** (or use existing test key)
5. Copy the **Key ID** and **Key Secret**

### Step 2: Update Environment Variables
Replace the placeholders in `.env.local`:

```bash
# Replace with your actual test credentials
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_NEW_KEY_ID
RAZORPAY_KEY_ID=rzp_test_YOUR_NEW_KEY_ID
RAZORPAY_KEY_SECRET=YOUR_NEW_KEY_SECRET
```

### Step 3: Restart Development Server
```bash
npm run dev
```

### Step 4: Test Payment Flow
1. Go to billing page
2. Click "Run Step-by-Step Razorpay Test"
3. Should show "All tests passed!"
4. Try "Test with ₹1" payment

## 🎯 Expected Results
After updating credentials:
- ✅ All tests should pass
- ✅ Payment modal should open
- ✅ Test card payment should work

## 📝 Test Card Details
- Card Number: 4111 1111 1111 1111
- Expiry: Any future date
- CVV: Any 3 digits
- Name: Any name

## 🔍 Debugging
If still fails:
1. Check server logs for credential errors
2. Verify credentials are copied correctly
3. Ensure no extra spaces in credentials
4. Make sure test mode is enabled in Razorpay dashboard

## 🚀 Next Steps
Once payment works:
1. Test webhook processing
2. Test subscription reset
3. Deploy to Vercel with production credentials
