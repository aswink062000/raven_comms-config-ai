# Templates Guide

## Available Templates by Channel

This guide lists all available FF IDs and their corresponding channels and locales.

---

## 📧 EMAIL Templates

### FFASK001 - ATM Fee Reversal
- **Event**: `ATM_fee`
- **Channel**: EMAIL
- **Locale**: en_US
- **Template**: `ATM_fee_reversal_email_en_US.json`
- **Use Case**: Notify customers about ATM fee reversals

### FFASK002 - Payment Confirmation
- **Event**: `payment_confirmation`
- **Channel**: EMAIL
- **Locale**: en_IN
- **Template**: `payment_confirmation_email_en_IN.json`
- **Use Case**: Confirm successful payment transactions

### FFASK004 - Account Upgrade
- **Event**: `account_upgrade`
- **Channel**: EMAIL
- **Locale**: en_US
- **Template**: `account_upgrade_email_en_US.json`
- **Use Case**: Confirm account type upgrades

### FFASK005 - Loan Approval
- **Event**: `loan_approval`
- **Channel**: EMAIL
- **Locale**: en_IN
- **Template**: `loan_approval_email_en_IN.json`
- **Use Case**: Notify customers of loan approval

---

## 📱 SMS Templates

### FFASK003 - Card Activation
- **Event**: `card_activation`
- **Channel**: SMS
- **Locale**: en_US
- **Template**: `card_activation_sms_en_US.json`
- **Use Case**: Confirm credit/debit card activation

### FFASK009 - Low Balance Alert (US)
- **Event**: `balance_alert`
- **Channel**: SMS
- **Locale**: en_US
- **Template**: `balance_alert_sms_en_US.json`
- **Use Case**: Alert customers when balance falls below threshold

### FFASK010 - Balance Alert (India)
- **Event**: `balance_alert`
- **Channel**: SMS
- **Locale**: en_IN
- **Template**: `balance_alert_sms_en_IN.json`
- **Use Case**: Balance alert notifications for Indian customers

---

## 🔔 PUSH Notification Templates

### FFASK006 - Statement Ready
- **Event**: `statement_ready`
- **Channel**: PUSH
- **Locale**: en_US
- **Template**: `statement_ready_push_en_US.json`
- **Use Case**: Notify when monthly statement is available

### FFASK011 - Fraud Alert (US)
- **Event**: `fraud_alert`
- **Channel**: PUSH
- **Locale**: en_US
- **Template**: `fraud_alert_push_en_US.json`
- **Use Case**: Immediate notification of suspicious activity

### FFASK012 - Fraud Alert (India)
- **Event**: `fraud_alert`
- **Channel**: PUSH
- **Locale**: en_IN
- **Template**: `fraud_alert_push_en_IN.json`
- **Use Case**: Critical fraud alerts for Indian customers

---

## 📬 LETTER Templates

### FFASK007 - Account Closure
- **Event**: `account_closure`
- **Channel**: LETTER
- **Locale**: en_US
- **Template**: `account_closure_letter_en_US.json`
- **Use Case**: Formal confirmation of account closure

### FFASK008 - Welcome Letter
- **Event**: `welcome_letter`
- **Channel**: LETTER
- **Locale**: en_IN
- **Template**: `welcome_letter_letter_en_IN.json`
- **Use Case**: Welcome new customers with account details

---

## 📊 Quick Reference Table

| FF ID | Event | Channel | Locale | Description |
|-------|-------|---------|--------|-------------|
| FFASK001 | ATM_fee | EMAIL | en_US | ATM Fee Reversal |
| FFASK002 | payment_confirmation | EMAIL | en_IN | Payment Confirmation |
| FFASK003 | card_activation | SMS | en_US | Card Activation |
| FFASK004 | account_upgrade | EMAIL | en_US | Account Upgrade |
| FFASK005 | loan_approval | EMAIL | en_IN | Loan Approval |
| FFASK006 | statement_ready | PUSH | en_US | Statement Ready |
| FFASK007 | account_closure | LETTER | en_US | Account Closure |
| FFASK008 | welcome_letter | LETTER | en_IN | Welcome Letter |
| FFASK009 | balance_alert | SMS | en_US | Low Balance Alert |
| FFASK010 | balance_alert | SMS | en_IN | Balance Alert |
| FFASK011 | fraud_alert | PUSH | en_US | Fraud Alert |
| FFASK012 | fraud_alert | PUSH | en_IN | Fraud Alert |

---

## 🎯 How to Use

### Step 1: Choose Your Template
Select an FF ID from the table above based on:
- Communication channel (EMAIL, SMS, PUSH, LETTER)
- Target locale (en_US, en_IN)
- Use case

### Step 2: Generate Payload
1. Enter the **FF ID** (e.g., FFASK007)
2. Select the **Locale** (e.g., en_US)
3. Select the **Channel** (e.g., LETTER)
4. Click **"Generate Payload"**

### Step 3: Review & Export
- View in **Formatted** or **Raw JSON** mode
- Check **validation status** (green = valid)
- **Copy** or **Download** the payload

---

## 📝 Event Parameters by Type

### ATM Fee Reversal
- fullName
- productName
- accountNumber

### Payment Confirmation
- fullName
- accountNumber
- paymentAmount
- paymentDate
- transactionId
- recipientName

### Card Activation
- fullName
- cardType
- cardNumber
- activationDate
- expiryDate

### Account Upgrade
- fullName
- currentAccountType
- newAccountType
- accountNumber
- upgradeDate

### Loan Approval
- fullName
- loanAmount
- loanType
- interestRate
- loanTerm
- accountNumber
- approvalDate

### Statement Ready
- fullName
- accountNumber
- statementPeriod
- statementDate
- totalTransactions

### Account Closure
- fullName
- accountNumber
- accountType
- closureDate
- finalBalance
- refundAmount

### Welcome Letter
- fullName
- accountNumber
- accountType
- openingDate
- branchName
- customerServiceNumber

### Balance Alert
- fullName
- accountNumber
- currentBalance
- alertThreshold
- alertDate

### Fraud Alert
- fullName
- accountNumber
- transactionAmount
- transactionLocation
- transactionTime
- alertId

---

## 🌍 Locale Support

### en_US (United States)
- Currency: USD ($)
- Date Format: MM/DD/YYYY
- Phone Format: +1-XXX-XXX-XXXX

### en_IN (India)
- Currency: INR (₹)
- Date Format: DD/MM/YYYY
- Phone Format: +91-XXXXX-XXXXX

---

## 💡 Best Practices

### 1. Match Channel to Use Case
- **EMAIL**: Detailed information, confirmations, statements
- **SMS**: Quick alerts, OTPs, urgent notifications
- **PUSH**: Real-time alerts, app notifications
- **LETTER**: Formal communications, legal documents

### 2. Choose Appropriate Locale
- Use **en_US** for US-based customers
- Use **en_IN** for India-based customers
- Ensure currency and date formats match locale

### 3. Validate Before Use
- Always check the **validation status**
- Review all **required parameters**
- Replace **sample data** with real values

### 4. Test Different Channels
- Generate payloads for all channels
- Compare output formats
- Verify address formats match channel type

---

## 🔧 Adding New Templates

To add a new template, create three files:

### 1. Event Schema
`src/lib/data/events/{event_name}.json`

### 2. Template
`src/lib/data/templates/{event}_{channel}_{locale}.json`

**Naming Convention**: `{event}_{channel}_{locale}.json`
- Example: `fraud_alert_push_en_US.json`

### 3. FF Metadata
`src/lib/data/ff-metadata/{FFID}.json`

---

## 📞 Support

For questions about templates:
1. Check this guide first
2. Review the README.md
3. Contact the development team

---

**Last Updated**: May 19, 2026  
**Total Templates**: 12  
**Channels Supported**: EMAIL, SMS, PUSH, LETTER  
**Locales Supported**: en_US, en_IN
