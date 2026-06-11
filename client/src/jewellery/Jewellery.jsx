import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';

const JEWELLERY_PRODUCTS = [
    {
        _id: "j1",
        name: "Cuttack Tarakasi Silver Necklace",
        description: "Exquisite handmade Cuttack Tarakasi (Silver Filigree) necklace featuring intricate traditional design.",
        price: 4500,
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=600",
        category: "Jewelry"
    },
    {
        _id: "j2",
        name: "Delicate Silver Filigree Earrings",
        description: "Classic Tarakasi silver earrings shaped like peacock feathers, reflecting Odisha's rich heritage.",
        price: 1800,
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=600",
        category: "Jewelry"
    },
    {
        _id: "j3",
        name: "Traditional Dhokra Brass Bangle",
        description: "Antique finish Dhokra brass bangle handcrafted using the lost-wax casting technique.",
        price: 1200,
        image: "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&q=80&w=600",
        category: "Jewelry"
    },
    {
        _id: "j4",
        name: "Filigree Silver Anklet (Payal)",
        description: "Stunning pair of heavy silver anklets decorated with fine filigree work and floral motifs.",
        price: 3500,
        image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&q=80&w=600",
        category: "Jewelry"
    },
    {
        _id: "j5",
        name: "Royal Temple Style Gold Ring",
        description: "Fine gold-plated silver ring featuring traditional temple-style stone settings and carvings.",
        price: 2500,
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&q=80&w=600",
        category: "Jewelry"
    }
];

const Jewellery = ({ addToCart }) => {
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            const { scrollLeft, clientWidth } = scrollContainerRef.current;
            const scrollAmount = clientWidth * 0.75; // Scroll 75% of container width
            const targetScroll = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
            
            scrollContainerRef.current.scrollTo({
                left: targetScroll,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="jewellery-showcase">
            <div className="jewellery-header">
                <h2>Exquisite Odisha Jewellery</h2>
                <p>Explore our handcrafted Silver Filigree (Tarakasi) and Dhokra brass jewelry collection.</p>
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
                    className="jewellery-scroll-container" 
                    ref={scrollContainerRef}
                >
                    {JEWELLERY_PRODUCTS.map((product) => (
                        <div key={product._id} className="jewellery-card">
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

export default Jewellery;
