# AWS Backend Deployment Guide (Tamil + English)

## 🚀 AWS-ல Backend Deploy பண்ணுவது எப்படி?

### Prerequisites (முதல் தேவைகள்)

1. **AWS Account** - AWS account இருக்கணும்
2. **AWS CLI** - Install பண்ணணும்
3. **Serverless Framework** - Install பண்ணணும்

---

## 📋 Step-by-Step Deployment

### Step 1: Install Serverless Framework

**Option 1: Global Installation (with sudo)**
```bash
sudo npm install -g serverless
```

**Option 2: Local Installation (Recommended for AWS CloudShell)**
```bash
cd backend
npm install serverless --save-dev
```

If using local installation, use `npx serverless` instead of `serverless` in all commands.

### Step 2: Configure AWS Credentials

```bash
# AWS CLI install பண்ணுங்க
# Download from: https://aws.amazon.com/cli/

# Configure பண்ணுங்க
aws configure

# Enter the following:
# AWS Access Key ID: [Your Access Key]
# AWS Secret Access Key: [Your Secret Key]
# Default region: ap-south-1
# Default output format: json
```

**AWS Access Keys எப்படி எடுக்கறது:**
1. AWS Console-ல login பண்ணுங்க
2. IAM → Users → Your User → Security Credentials
3. "Create Access Key" click பண்ணுங்க
4. Access Key ID மற்றும் Secret Access Key-ஐ save பண்ணுங்க

### Step 3: Install Backend Dependencies

```bash
cd backend
npm install
```

### Step 4: Build TypeScript

```bash
npm run build
```

### Step 5: Deploy to AWS

**If installed globally:**
```bash
# Development deployment
npm run deploy:dev

# OR Production deployment
npm run deploy:prod
```

**If installed locally (using npx):**
```bash
# Development deployment
npx serverless deploy --stage dev

# OR Production deployment
npx serverless deploy --stage prod
```

### Step 6: Get API URL

Deployment முடிந்ததும், terminal-ல இப்படி output வரும்:

```
✔ Service deployed to stack sbt-backend-prod

endpoint: https://xxxxxxxxxx.execute-api.ap-south-1.amazonaws.com
functions:
  api: sbt-backend-prod-api
```

**இந்த URL-ஐ copy பண்ணுங்க!** ← இது உங்க backend API URL

---

## 🔧 Frontend-ல API URL Update பண்ணுவது

### File: `src/services/riya/riya-api.ts`

```typescript
// Line 11: Update this
const API_BASE_URL = 'https://xxxxxxxxxx.execute-api.ap-south-1.amazonaws.com';
```

**Replace** `xxxxxxxxxx` **with your actual API Gateway URL**

---

## ✅ Test Your Deployment

### Test Health Check

```bash
curl https://your-api-url.execute-api.ap-south-1.amazonaws.com/
```

Expected Response:
```json
{
  "status": "ok",
  "message": "AWS Backend is running and aligned with frontend"
}
```

### Test Riya APIs

```bash
# Test Availability API
curl -X POST https://your-api-url/riya/availability \
  -H "Content-Type: application/json" \
  -d '{
    "origin": "BOM",
    "destination": "DEL",
    "departureDate": "15 Mar 2026",
    "adultCount": 1
  }'
```

---

## 📊 Monitor Your Deployment

### View Logs

```bash
# Real-time logs
npm run logs

# OR
serverless logs -f api -t
```

### AWS Console-ல Check பண்ணுவது

1. **Lambda**: https://console.aws.amazon.com/lambda
   - Function name: `sbt-backend-prod-api`
   - Check metrics, logs

2. **API Gateway**: https://console.aws.amazon.com/apigateway
   - Check endpoints
   - Test APIs

3. **CloudWatch**: https://console.aws.amazon.com/cloudwatch
   - View detailed logs
   - Set up alarms

---

## 🔄 Update Deployment

Code changes பண்ணினா, மறுபடியும் deploy பண்ணுங்க:

```bash
npm run deploy:prod
```

---

## 🗑️ Remove Deployment

AWS-ல இருந்து backend-ஐ remove பண்ண:

```bash
npm run remove

# OR
serverless remove --stage prod
```

---

## 📁 Files Created

1. **`backend/serverless.yml`** - AWS configuration
2. **`backend/package.json`** - Deployment scripts
3. **`backend/env.example.txt`** - Environment variables template

---

## 🎯 Quick Commands Reference

```bash
# Install dependencies
cd backend && npm install

# Deploy to production
npm run deploy:prod

# View logs
npm run logs

# Remove from AWS
npm run remove
```

---

## 💡 Important Notes

1. **Cost**: AWS Lambda free tier-ல 1 million requests/month free
2. **Region**: Mumbai (ap-south-1) use பண்ணிருக்கோம்
3. **Timeout**: 30 seconds max per request
4. **Memory**: 512 MB allocated

---

## 🐛 Troubleshooting

### Error: "AWS credentials not found"
```bash
aws configure
# Enter your credentials
```

### Error: "Serverless command not found"
```bash
npm install -g serverless
```

### Error: "Access Denied"
- IAM user-க்கு proper permissions இருக்கா check பண்ணுங்க
- Minimum permissions: Lambda, API Gateway, CloudWatch, IAM

---

## ✅ Success Checklist

- [ ] AWS CLI installed மற்றும் configured
- [ ] Serverless Framework installed
- [ ] Backend dependencies installed
- [ ] Deployed to AWS successfully
- [ ] Got API Gateway URL
- [ ] Updated frontend API URL
- [ ] Tested health check endpoint
- [ ] Tested Riya APIs

---

**Deployment முடிந்துச்சா? Frontend-ல API URL update பண்ணுங்க!** 🎉
