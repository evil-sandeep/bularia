import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ShoppingCart, Search, User, Home, Plus, Minus, X, ArrowRight, CreditCard, ChevronLeft } from 'lucide-react';
import Jewellery from './jewellery/Jewellery';

// API Configuration
const API_URL = import.meta.env.VITE_API_URL || '/api';

const App = () => {
    const [view, setView] = useState('home'); // home, cart, checkout, success
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [address, setAddress] = useState({ name: '', email: '', pin: '', area: '' });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(`${API_URL}/products`);
            if (res.data.length === 0) {
                // If empty, seed and fetch again
                await axios.get(`${API_URL}/seed`);
                const seedRes = await axios.get(`${API_URL}/products`);
                setProducts(seedRes.data);
            } else {
                setProducts(res.data);
            }
        } catch (err) {
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item._id === product._id);
            if (existing) {
                return prev.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (id, delta) => {
        setCart(prev => prev.map(item => {
            if (item._id === id) {
                const newQty = item.quantity + delta;
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        }));
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item._id !== id));
    };

    const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleCheckout = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/orders`, { items: cart, address });
            setView('success');
            setCart([]);
        } catch (err) {
            alert('Checkout failed');
        }
    };

    // Components
    const ProductCard = ({ product }) => (
        <div className="product-card" onClick={() => setView('home')}>
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
                <span className="product-category">{product.category}</span>
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">₹{product.price.toLocaleString('en-IN')}</div>
                <button className="add-btn" onClick={(e) => { e.stopPropagation(); addToCart(product); }}>
                    Add to Cart
                </button>
            </div>
        </div>
    );

    return (
        <div className="app">
            {/* Header */}
            <header>
                <div className="container">
                    <nav>
                        <a href="#" className="logo" onClick={() => setView('home')}>
                            <span className="logo-text">BULARIA+</span>
                        </a>
                        <ul className="nav-links">
                            <li><a href="#" onClick={() => setView('home')}>Home</a></li>
                            <li><a href="#" onClick={() => setView('jewellery')}>Jewellery</a></li>
                            <li><a href="#">Search</a></li>
                            <li><a href="#">Login</a></li>
                        </ul>
                        <div className="nav-icons">
                            <button className="icon-btn" onClick={() => setView('cart')}>
                                <ShoppingCart size={24} />
                                {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                            </button>
                            <button className="icon-btn"><User size={24} /></button>
                        </div>
                    </nav>
                </div>
            </header>

            <main className="container">
                {view === 'home' && (
                    <>
                        <section className="hero">
                            <h1>Authentic Odisha Heritage</h1>
                            <p>Handcrafted treasures, handwoven stories. Bringing the soul of Odisha's craftsmanship to your doorstep.</p>
                        </section>
                        
                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '4rem' }}>Loading treasures...</div>
                        ) : (
                            <div className="product-grid">
                                {products.map(p => <ProductCard key={p._id} product={p} />)}
                            </div>
                        )}
                    </>
                )}

                {view === 'jewellery' && (
                    <Jewellery addToCart={addToCart} />
                )}

                {view === 'cart' && (
                    <div className="cart-overlay">
                        <button className="icon-btn" onClick={() => setView('home')} style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <ChevronLeft size={20} /> Back to Gallery
                        </button>
                        <h2 style={{ marginBottom: '2rem' }}>Your Shopping Cart</h2>
                        {cart.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '4rem' }}>
                                <p>Your cart is empty.</p>
                                <button className="add-btn" style={{ width: 'auto', padding: '1rem 2rem', marginTop: '1rem' }} onClick={() => setView('home')}>Start Shopping</button>
                            </div>
                        ) : (
                            <>
                                {cart.map(item => (
                                    <div key={item._id} className="cart-item">
                                        <img src={item.image} alt={item.name} />
                                        <div className="item-details">
                                            <h3>{item.name}</h3>
                                            <p className="product-price">₹{item.price.toLocaleString('en-IN')}</p>
                                        </div>
                                        <div className="item-controls">
                                            <button className="qty-btn" onClick={() => updateQuantity(item._id, -1)}><Minus size={16} /></button>
                                            <span>{item.quantity}</span>
                                            <button className="qty-btn" onClick={() => updateQuantity(item._id, 1)}><Plus size={16} /></button>
                                            <button className="icon-btn" onClick={() => removeFromCart(item._id)} style={{ marginLeft: '1rem' }}><X size={20} color="#ff4444" /></button>
                                        </div>
                                    </div>
                                ))}
                                <div style={{ marginTop: '2rem', textAlign: 'right', borderTop: '2px solid var(--color-primary)', paddingTop: '2rem' }}>
                                    <h2 style={{ marginBottom: '1rem' }}>Total: ₹{cartTotal.toLocaleString('en-IN')}</h2>
                                    <button className="add-btn" style={{ width: 'auto', padding: '1rem 3rem' }} onClick={() => setView('checkout')}>
                                        Proceed to Checkout <ArrowRight size={20} style={{ marginLeft: '0.5rem', display: 'inline' }} />
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}

                {view === 'checkout' && (
                    <div style={{ padding: '4rem 0' }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Checkout</h2>
                        <form className="checkout-form" onSubmit={handleCheckout}>
                            <div className="input-group">
                                <label>Full Name</label>
                                <input type="text" required value={address.name} onChange={e => setAddress({...address, name: e.target.value})} placeholder="John Doe" />
                            </div>
                            <div className="input-group">
                                <label>Email</label>
                                <input type="email" required value={address.email} onChange={e => setAddress({...address, email: e.target.value})} placeholder="john@example.com" />
                            </div>
                            <div className="input-group">
                                <label>Address / Area</label>
                                <input type="text" required value={address.area} onChange={e => setAddress({...address, area: e.target.value})} placeholder="123 Heritage Lane" />
                            </div>
                            <div className="input-group">
                                <label>PIN Code</label>
                                <input type="text" required value={address.pin} onChange={e => setAddress({...address, pin: e.target.value})} placeholder="751001" />
                            </div>
                            
                            <h3 style={{ marginTop: '2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <CreditCard size={24} /> Payment Details
                            </h3>
                            <div className="input-group">
                                <label>Card Number</label>
                                <input type="text" placeholder="**** **** **** 1234" disabled value="Demo Payment Card" />
                            </div>
                            
                            <button type="submit" className="add-btn" style={{ marginTop: '2rem' }}>
                                Pay ₹{cartTotal.toLocaleString('en-IN')}
                            </button>
                        </form>
                    </div>
                )}

                {view === 'success' && (
                    <div style={{ textAlign: 'center', padding: '6rem 0' }}>
                        <div style={{ color: '#4caf50', fontSize: '4rem', marginBottom: '1rem' }}>✓</div>
                        <h1>Order Placed!</h1>
                        <p style={{ marginTop: '1rem' }}>Thank you for choosing Bularia+. Your heritage treasure will be shipped soon.</p>
                        <button className="add-btn" style={{ width: 'auto', padding: '1rem 3rem', marginTop: '2rem' }} onClick={() => setView('home')}>Continue Shopping</button>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer>
                <div className="container">
                    <div className="footer-content">
                        <div>
                            <div className="logo" style={{ color: 'white' }}>BULARIA+</div>
                            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
                                "ଆମ ମାଟି, ଆମ ଗର୍ବ"<br />
                                Preserving the rich cultural heritage of Odisha through ethical craftsmanship.
                            </p>
                        </div>
                        <div>
                            <h3 style={{ marginBottom: '1.5rem' }}>Shop</h3>
                            <ul className="footer-links">
                                <li><a href="#">Handlooms</a></li>
                                <li><a href="#">Jewelry</a></li>
                                <li><a href="#">Stone Craft</a></li>
                                <li><a href="#">Home Decor</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 style={{ marginBottom: '1.5rem' }}>Support</h3>
                            <ul className="footer-links">
                                <li><a href="#">Shipping Policy</a></li>
                                <li><a href="#">returns</a></li>
                                <li><a href="#">Contact Us</a></li>
                                <li><a href="#">Our Story</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        © 2026 Bularia+. All rights reserved. Made with love from Odisha.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
