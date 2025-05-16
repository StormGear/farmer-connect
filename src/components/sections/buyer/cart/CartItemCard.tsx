import { ProduceItem } from '@/global';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { MdDelete } from "react-icons/md";

type CartItemCardProps = {
    produceItem: ProduceItem;
};


const CartItemCard = ({ produceItem }: CartItemCardProps) => {
    const allImages = produceItem.images && produceItem.images.length > 0 ? produceItem.images : [];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const intervalRef = useRef<number | null>(null);

    // Auto-rotate carousel
    useEffect(() => {
        // Only set up rotation if we have multiple images
        if (allImages.length > 1) {
            intervalRef.current = window.setInterval(() => {
                if (!isPaused) {
                    setCurrentImageIndex((prevIndex) => 
                        prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
                    );
                }
            }, 3000); // Change image every 3 seconds
        }
        
        // Clean up interval on component unmount
        return () => {
            if (intervalRef.current !== null) {
                clearInterval(intervalRef.current);
            }
        };
    }, [allImages.length, isPaused]);

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
        );
    };

    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md overflow-hidden my-4"
        >
            <div 
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {allImages.length > 0 ? (
                    <div className="relative h-48 overflow-hidden">
                        {allImages.map((img, index) => (
                            <div
                                key={index}
                                className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                                    index === currentImageIndex ? 'translate-x-0' : 
                                    index < currentImageIndex ? '-translate-x-full' : 'translate-x-full'
                                }`}
                                style={{ zIndex: index === currentImageIndex ? 10 : 0 }}
                            >
                                <img 
                                    src={img} 
                                    alt={`${produceItem.produce_name || 'Product'} - image ${index + 1}`}
                                    className="w-full h-48 object-cover"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="w-full h-48 bg-green-50 flex items-center justify-center">
                        <i className="fas fa-seedling text-green-500 text-4xl"></i>
                    </div>
                )}

                {allImages.length > 1 && (
                    <>
                        <button 
                            onClick={() => {
                                prevImage();
                                setIsPaused(true);
                                setTimeout(() => setIsPaused(false), 5000);
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 text-green-700 z-20"
                            aria-label="Previous image"
                        >
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <button 
                            onClick={() => {
                                nextImage();
                                setIsPaused(true);
                                setTimeout(() => setIsPaused(false), 5000);
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 text-green-700 z-20"
                            aria-label="Next image"
                        >
                            <i className="fas fa-chevron-right"></i>
                        </button>

                        {/* Dots indicator */}
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 z-20">
                            {allImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setCurrentImageIndex(index);
                                        setIsPaused(true);
                                        setTimeout(() => setIsPaused(false), 5000);
                                    }}
                                    className={`w-2 h-2 rounded-full ${
                                        currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                                    }`}
                                    aria-label={`Go to image ${index + 1}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
            
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">{produceItem.produce_name || 'Product Name'}</h3>
                    <p className="text-green-600 font-bold">${produceItem.price?.toFixed(2) || '0.00'}</p>
                </div>

                <p className="text-gray-600 mt-2 line-clamp-2">{produceItem.produce_description || 'No description available.'}</p>

                <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Quantity: 1</span>
                    </div>
                    
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-1 text-red-500 hover:text-red-700"
                    >
                        <MdDelete className="text-lg" />
                        <span>Remove</span>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default CartItemCard;