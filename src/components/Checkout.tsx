import { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { Product } from '../App';
import { PAYPAL_CLIENT_ID } from '../config';

interface CheckoutProps {
  basket: { product: Product; quantity: number }[];
  onClose: () => void;
}

function Checkout({ basket, onClose }: CheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [isProcessing, setIsProcessing] = useState(false);

  const totalPrice = basket.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const handleCashPayment = () => {
    setIsProcessing(true);
    // Simulate cash payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert('Payment successful! Please proceed to the cashier.');
      onClose();
    }, 2000);
  };

  const createOrder = (data: any, actions: any) => {
    const items = basket.map(item => ({
      name: item.product.name,
      quantity: item.quantity.toString(),
      unit_amount: {
        currency_code: 'GBP',
        value: item.product.price.toFixed(2),
      },
    }));

    const itemTotal = basket.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'GBP',
            value: totalPrice.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: 'GBP',
                value: itemTotal.toFixed(2)
              }
            }
          },
          description: 'University Canteen Purchase',
          items: items
        },
      ],
    });
  };

  const onApprove = async (data: any, actions: any) => {
    try {
      const order = await actions.order.capture();
      console.log('Order completed:', order);
      alert('Payment successful! Thank you for your purchase.');
      onClose();
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    }
  };

  return (
    <div className="checkout-modal">
      <div className="checkout-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2 className="checkout-title">Checkout</h2>
        
        <div className="order-summary">
          <h3 className="section-title">Order Summary</h3>
          {basket.map(item => (
            <div key={item.product.id} className="checkout-item">
              <span className="item-name">{item.product.name} x {item.quantity}</span>
              <span className="item-price">£{(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="checkout-total">
            <span className="total-label">Total:</span>
            <span className="total-price">£{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="payment-section">
          <h3 className="section-title">Payment Method</h3>
          <div className="payment-options">
            <label className="payment-option">
              <input
                type="radio"
                value="paypal"
                checked={paymentMethod === 'paypal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="payment-label">PayPal</span>
              <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_37x23.jpg" alt="PayPal" className="payment-icon" />
            </label>
            <label className="payment-option">
              <input
                type="radio"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span className="payment-label">Cash</span>
              <span className="cash-icon">💷</span>
            </label>
          </div>
        </div>

        {paymentMethod === 'paypal' ? (
          <div className="paypal-button-container">
            <PayPalScriptProvider 
              options={{ 
                clientId: PAYPAL_CLIENT_ID,
                currency: 'GBP',
                intent: 'capture'
              }}
            >
              <PayPalButtons
                style={{ layout: 'vertical' }}
                createOrder={createOrder}
                onApprove={onApprove}
                onError={(err) => {
                  console.error('PayPal error:', err);
                  alert('An error occurred with PayPal. Please try again.');
                }}
              />
            </PayPalScriptProvider>
          </div>
        ) : (
          <button 
            className="process-payment-button"
            onClick={handleCashPayment}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Complete Payment'}
          </button>
        )}
      </div>
    </div>
  );
}

export default Checkout; 