# Hull Uni Catering – PayPal Integration (Sandbox)

This project demonstrates how to integrate PayPal's REST API in a sample catering application using sandbox mode. It covers authentication, token retrieval, and basic security practices.

## Video showcase

[click here for youtube video](https://youtu.be/mYpR2wNF-9A)


## 🚀 Features

- OAuth 2.0 authentication with Client ID & Secret
- Secure token handling
- REST API integration with PayPal Sandbox
- Postman tests and screenshots included
- Example use-case: Hull Uni Catering App

## 🛠 Requirements

- PayPal Developer Account
- Node.js or backend environment
- Postman (for testing)

## ⚙️ How to Use

1. Clone the repository.
2. Set up your sandbox business account on the [PayPal Developer Dashboard](https://developer.paypal.com/).
3. Get your **Client ID** and **Secret Key**.
4. Use Postman to retrieve an access token:

POST https://api-m.sandbox.paypal.com/v1/oauth2/token
Auth: Basic Auth (Client ID & Secret)
Body: grant_type=client_credentials


5. Use the returned access token in your API requests for authenticated actions.

## 🔐 Security Notes

- Never expose your Client Secret in the codebase.
- Use environment variables to store credentials securely.
- Enable logging and key rotation on PayPal Developer Dashboard.

## 📄 License

This project is licensed under the MIT License.
