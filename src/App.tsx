import { useState } from 'react'
import './App.css'
import Checkout from './components/Checkout'

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}

const products: Product[] = [
  { id: 1, name: "Chicken Curry", price: 5.99, description: "Spicy chicken curry with rice", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
  { id: 2, name: "Vegetable Pasta", price: 4.99, description: "Fresh pasta with seasonal vegetables", image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
  { id: 3, name: "Beef Burger", price: 6.99, description: "Classic beef burger with fries", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
  { id: 4, name: "Caesar Salad", price: 4.49, description: "Fresh romaine lettuce with Caesar dressing", image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
  { id: 5, name: "Fish & Chips", price: 7.99, description: "Traditional British fish and chips", image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
  { id: 6, name: "Vegetable Soup", price: 3.99, description: "Homemade vegetable soup with bread", image: "https://images.unsplash.com/photo-1543218024-57ddec639d1a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
  { id: 7, name: "Pizza Margherita", price: 5.49, description: "Classic Italian pizza with tomato and mozzarella", image: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
  { id: 8, name: "Chicken Wrap", price: 4.99, description: "Grilled chicken wrap with salad", image: "https://images.unsplash.com/photo-1562059390-a761a094768b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
  { id: 9, name: "Fruit Salad", price: 3.49, description: "Fresh seasonal fruits", image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" },
  { id: 10, name: "Chocolate Cake", price: 3.99, description: "Rich chocolate cake with cream", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3" }
];

function App() {
  const [basket, setBasket] = useState<{ product: Product; quantity: number }[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const addToBasket = (product: Product) => {
    setBasket(prevBasket => {
      const existingItem = prevBasket.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevBasket.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevBasket, { product, quantity: 1 }];
    });
  };

  const removeFromBasket = (productId: number) => {
    setBasket(prevBasket => prevBasket.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromBasket(productId);
      return;
    }
    setBasket(prevBasket =>
      prevBasket.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const totalPrice = basket.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  return (
    <div className="app-container">
      <div className="header">
        <h1>University Catering Automation Application</h1>
        <div className="basket-icon" onClick={() => setShowCheckout(true)}>
          <span className="basket-count">{basket.reduce((sum, item) => sum + item.quantity, 0)}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
        </div>
      </div>
      
      <div className="products-section">
        <h2>Our Menu</h2>
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="price">£{product.price.toFixed(2)}</p>
              <button onClick={() => addToBasket(product)}>Add to Basket</button>
            </div>
          ))}
        </div>
      </div>

      {showCheckout && (
        <Checkout
          basket={basket}
          onClose={() => setShowCheckout(false)}
        />
      )}
    </div>
  );
}

export default App;
