<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
=======
# Farmer Connect 🌱

A revolutionary platform that empowers farmers, supports local businesses by connecting farmers directly with consumers, and promotes environmental sustainability through innovative recycling integration.

## 🚀 Features

- **Direct Farmer-Consumer Connection**: Eliminates middlemen and provides fair prices
- **Local Economy Support**: Promotes buying from local farmers and businesses
- **Environmental Sustainability**: Integrates recycling initiatives within the agricultural supply chain
- **Transparent Supply Chain**: Track produce from farm to table
- **Blockchain Integration**: Uses web3 technology for secure and transparent transactions

## 📋 Tech Stack

- **Frontend**: React with TypeScript, Vite
- **Styling**: Tailwind CSS with motion animations
- **State Management**: React Context API
- **Form Handling**: React Hook Form with Zod validation
- **Authentication**: Firebase Auth with custom user provider
- **Database**: Firestore
- **Storage**: Firebase Storage for image uploads
- **Web3**: Integration with wallet providers

## 🛠️ Project Structure




## 🧪 Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/farmer-connect.git
cd farmer-connect
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

## 🔒 Authentication
The platform supports role-based authentication with multiple user types:

Farmers: Can list produce, manage inventory, and track sales
Buyers: Can browse products, place orders, and track purchases
Administrators: Can manage the platform and monitor transactions
## 🔄 Workflow

For Farmers:
1. Sign up and create a profile
2. Upload produce with details (name, description, price, images)
3. Manage inventory and track orders
Receive payments directly through the platform

For Buyers:
1. Browse local produce by category or farmer
2. Add items to cart
3. Complete checkout process
4. Track order status
5. Rate and review purchases

📄 LICENSE

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments
- Base Network
- All the farmers who inspired this project
- The local communities supporting sustainable agriculture
- Open-source libraries and frameworks that made this possible
>>>>>>> refs/remotes/origin/main
