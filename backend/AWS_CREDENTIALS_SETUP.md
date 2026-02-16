# AWS Credentials Setup - Quick Guide

## Error You're Seeing:
```
AWS provider credentials not found
```

## Solution: Configure AWS Credentials

### Option 1: Using AWS CLI (Recommended)

**Step 1: Install AWS CLI**
Download from: https://aws.amazon.com/cli/

**Step 2: Configure Credentials**
```bash
aws configure
```

Enter:
- **AWS Access Key ID**: [Get from AWS Console]
- **AWS Secret Access Key**: [Get from AWS Console]
- **Default region**: `ap-south-1` (Mumbai)
- **Default output format**: `json`

### Option 2: Manual Configuration (Windows)

Create file: `C:\Users\sabar\.aws\credentials`

```ini
[default]
aws_access_key_id = YOUR_ACCESS_KEY_HERE
aws_secret_access_key = YOUR_SECRET_KEY_HERE
```

Create file: `C:\Users\sabar\.aws\config`

```ini
[default]
region = ap-south-1
output = json
```

---

## How to Get AWS Access Keys

### Step 1: Login to AWS Console
Go to: https://console.aws.amazon.com/

### Step 2: Go to IAM
1. Search for "IAM" in the search bar
2. Click on "IAM" service

### Step 3: Create Access Key
1. Click "Users" in left sidebar
2. Click your username
3. Click "Security credentials" tab
4. Scroll to "Access keys"
5. Click "Create access key"
6. Select "Command Line Interface (CLI)"
7. Check the confirmation box
8. Click "Next" → "Create access key"
9. **IMPORTANT**: Copy both:
   - Access Key ID
   - Secret Access Key
   (You won't be able to see the secret key again!)

### Step 4: Save Credentials
Save them in a safe place or configure immediately using `aws configure`

---

## After Configuring Credentials

Run deployment again:
```bash
npx serverless deploy --stage prod
```

---

## Verify Credentials

Test if credentials are working:
```bash
aws sts get-caller-identity
```

Should return your AWS account info.

---

## Alternative: Use Environment Variables

Set temporarily in PowerShell:
```powershell
$env:AWS_ACCESS_KEY_ID="your-access-key"
$env:AWS_SECRET_ACCESS_KEY="your-secret-key"
$env:AWS_REGION="ap-south-1"

npx serverless deploy --stage prod
```

---

## Troubleshooting

### "Access Denied" Error
Your IAM user needs these permissions:
- Lambda (full access)
- API Gateway (full access)
- CloudFormation (full access)
- S3 (for deployment artifacts)
- CloudWatch Logs (for logging)
- IAM (for creating roles)

### "Region Not Found"
Make sure region is set to `ap-south-1` (Mumbai)

---

## Quick Summary

1. Get AWS Access Keys from IAM Console
2. Run `aws configure` and enter keys
3. Run `npx serverless deploy --stage prod`
4. Get API URL from output
5. Update frontend with API URL

Done! 🚀
