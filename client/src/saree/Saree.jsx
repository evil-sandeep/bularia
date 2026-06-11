import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

const SAREE_PRODUCTS = [
    {
        _id: "s1",
        name: "Sambalpuri Silk Ikat Saree",
        description: "Hand-woven traditional Sambalpuri double-ikat silk saree featuring classic Konark temple borders.",
        price: 8500,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600",
        category: "Saree"
    },
    {
        _id: "s2",
        name: "Bomkai Cotton Saree",
        description: "Elegant Bomkai handloom cotton saree featuring ethnic tribal patterns and a rich pallu design.",
        price: 3200,
        image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600",
        category: "Saree"
    },
    {
        _id: "s3",
        name: "Khandua Silk Nuapatna Saree",
        description: "Auspicious Khandua silk saree woven by master weavers of Nuapatna, often offered to Lord Jagannath.",
        price: 9500,
        image: "https://images.unsplash.com/photo-1608748010899-18f300247112?auto=format&fit=crop&q=80&w=600",
        category: "Saree"
    },
    {
        _id: "s4",
        name: "Kotpad Organic Cotton Saree",
        description: "Eco-friendly, naturally dyed Kotpad cotton saree, crafted with organic madder root dyes.",
        price: 5400,
        image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=600",
        category: "Saree"
    },
    {
        _id: "s5",
        name: "Habaspuri Handloom Saree",
        description: "Unique cotton handloom saree from Kalahandi, featuring traditional fish and flower motifs.",
        price: 4200,
        image: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&q=80&w=600",
        category: "Saree"
    }
];

const Saree = ({ addToCart }) => {
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const scrollAmount = clientWidth * 0.75;
            const targetScroll = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
            
            scrollContainerRef.current.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="saree-showcase">
            <div className="saree-header">
                <h2>Handwoven Odisha Sarees</h2>
                <p>Discover our beautiful collection of Sambalpuri Silk, Bomkai Cotton, and traditional handloom sarees.</p>
            </div>

            <div className="carousel-wrapper">
                <button 
                    className="carousel-arrow arrow-left" 
                    onClick={() => scroll('left')}
                    aria-label="Scroll Left"
                >
                    <ChevronLeft size={24} />
                </button>

                <div 
                    className="saree-scroll-container" 
                    ref={scrollContainerRef}
                >
                    {SAREE_PRODUCTS.map((product) => (
                        <div key={product._id} className="saree-card">
                            <div className="image-container">
                                <img src={product.image} alt={product.name} />
                                <span className="category-badge">{product.category}</span>
                            </div>
                            <div className="info-container">
                                <h3>{product.name}</h3>
                                <p className="description">{product.description}</p>
                                <div className="purchase-row">
                                    <span className="price">₹{product.price.toLocaleString('en-IN')}</span>
                                    <button 
                                        className="add-to-cart-btn"
                                        onClick={() => addToCart(product)}
                                    >
                                        <ShoppingCart size={18} /> Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button 
                    className="carousel-arrow arrow-right" 
                    onClick={() => scroll('right')}
                    aria-label="Scroll Right"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};

export default Saree;
