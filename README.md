# Eco-Cart 🌱

Eco-Cart is a web application designed to promote sustainable living by providing eco-product ratings, alternatives, and insights. The platform empowers users to make environmentally conscious decisions by analyzing product sustainability and offering eco-friendly alternatives.

---

## Features

- **Product Sustainability Analysis**: Analyze the eco-friendliness of products based on materials, packaging, and other factors.
- **Eco-Friendly Alternatives**: Suggests better alternatives for products with low eco-scores.
- **Chatbot Assistant**: An AI-powered chatbot to answer user queries about products and sustainability.
- **Admin Dashboard**: Manage products, users, and other administrative tasks.
- **Dynamic Product Upload**: Upload product details dynamically to Firestore.
- **Responsive Design**: Fully responsive UI for seamless use across devices.

---

## Tech Stack

### Frontend
- **React**: For building the user interface.
- **Bootstrap**: For responsive and modern UI components.
- **Framer Motion**: For animations and transitions.
- **React Icons**: For icons and visual elements.

### Backend
- **Node.js**: For server-side logic.
- **Express.js**: For building RESTful APIs.
- **Firebase**: For database and authentication.

### APIs
- **Gemini API**: For product rating and sustainability analysis.
- **Custom Search API**: For fetching product details.

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/eco-cart.git
   cd eco-cart

## File Structure
```
eco-cart/
├── public/
│   ├── eco-cart.png
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── AnimatedCard.js
│   │   ├── Chatbot.js
│   │   ├── Chatbox.js
│   │   ├── Footer.js
│   │   └── util/
│   │       ├── config.js
│   │       └── dynamicUpload.js
│   ├── pages/
│   │   ├── Admin/
│   │   │   ├── AddProduct.js
│   │   │   └── UserManagement.js
│   │   ├── AboutUs.js
│   │   ├── GetRating.js
│   │   ├── Home.js
│   │   └── LensSearch.js
│   ├── styles/
│   │   ├── AboutUs.css
│   │   ├── getRating.css
│   │   └── home.css
│   ├── App.js
│   ├── index.js
│   └── reportWebVitals.js
├── package.json
└── README.md
```