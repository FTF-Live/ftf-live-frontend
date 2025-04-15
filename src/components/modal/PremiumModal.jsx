"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const PremiumModal = ({ isOpen, onClose, diamondBalance = 10.908 }) => {
    const [selectedPackage, setSelectedPackage] = useState(4); // 4th package is recommended in screenshot

    // Premium packages data
    const premiumPackages = [
        {
            id: 1,
            title: "Elite Paket (1M)",
            description: "Pizza buffalo fresh platter ham ricotta pork platter",
            diamonds: 5000,
            price: 399.99,
            recommended: false
        },
        {
            id: 2,
            title: "Elite Paket (1M)",
            description: "Pizza buffalo fresh platter ham ricotta pork platter",
            diamonds: 5000,
            price: 399.99,
            recommended: false
        },
        {
            id: 3,
            title: "Elite Paket (1M)",
            description: "Pizza buffalo fresh platter ham ricotta pork platter",
            diamonds: 5000,
            price: 399.99,
            recommended: false
        },
        {
            id: 4,
            title: "Elite Paket (1M)",
            description: "Pizza buffalo fresh platter ham ricotta pork platter",
            diamonds: 5000,
            price: 399.99,
            recommended: false
        },
        {
            id: 5,
            title: "Elite Paket (1M)",
            description: "Pizza buffalo fresh platter ham ricotta pork platter",
            diamonds: 5000,
            price: 399.99,
            recommended: true
        },
        {
            id: 6,
            title: "Elite Paket (1M)",
            description: "Pizza buffalo fresh platter ham ricotta pork platter",
            diamonds: 5000,
            price: 399.99,
            recommended: false
        },
        {
            id: 7,
            title: "Elite Paket (1M)",
            description: "Pizza buffalo fresh platter ham ricotta pork platter",
            diamonds: 5000,
            price: 399.99,
            recommended: false
        },
        {
            id: 8,
            title: "Elite Paket (1M)",
            description: "Pizza buffalo fresh platter ham ricotta pork platter",
            diamonds: 5000,
            price: 399.99,
            recommended: false
        },
        {
            id: 9,
            title: "Elite Paket (1M)",
            description: "Pizza buffalo fresh platter ham ricotta pork platter",
            diamonds: 5000,
            price: 399.99,
            recommended: false
        },
        {
            id: 10,
            title: "Elite Paket (1M)",
            description: "Pizza buffalo fresh platter ham ricotta pork platter",
            diamonds: 5000,
            price: 399.99,
            recommended: false
        },
    ];

    // Animation variants
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
            }
        },
        exit: {
            y: 20,
            opacity: 0,
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.3
            }
        }),
        hover: {
            scale: 1.02,
            boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
            transition: { type: "spring", stiffness: 400, damping: 10 }
        }
    };

    const handlePurchase = () => {
        const selectedPkg = premiumPackages.find(pkg => pkg.id === selectedPackage);
        console.log("Purchasing package:", selectedPkg);
        // Here you would implement the actual purchase logic
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/75 flex items-center justify-center z-50"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={backdropVariants}
                >
                    <motion.div
                        className="bg-[#18181B] rounded-[6px] w-[95%] max-w-[1184px] border border-[#27272A] overflow-hidden"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center px-6 py-4 border-b border-[#27272A]">
                            <div className="flex items-center">
                                <img src='/images/logo.png' className='w-[120px] h-[25px]' />
                            </div>
                            <h2 className="text-white text-sm font-bold">Premium</h2>


                            <div className="flex items-center gap-4">
                                <div className="flex items-center bg-[#162456] text-white px-3 h-8 rounded-[6px] gap-3">
                                    <img src='/icons/diamond.svg' className='w-4 h-4' />
                                    <span className="font-bold text-sm">{diamondBalance.toLocaleString('tr-TR')}</span>
                                    <Icon icon="gridicons:add" className='text-[#2B7FFF]' />
                                </div>
                                <button
                                    onClick={onClose}
                                    className="text-white cursor-pointer"
                                >
                                    <Icon icon="mdi:close" className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Packages Grid */}
                        <div className="p-4 grid grid-cols-2 md:grid-cols-5 gap-4 overflow-y-auto max-h-[70vh]">
                            {premiumPackages.map((pkg, index) => (
                                <motion.div
                                    key={pkg.id}
                                    custom={index}
                                    variants={itemVariants}
                                    initial="hidden"
                                    animate="visible"
                                    whileHover="hover"
                                    className={`relative py-8 px-5 border cursor-pointer ${selectedPackage === pkg.id
                                        ? 'border-blue-500 bg-[#27272A]'
                                        : 'border-[#3F3F47] bg-[#27272A]'
                                        } rounded-[6px] flex flex-col`}
                                    onClick={() => setSelectedPackage(pkg.id)}
                                >
                                    {pkg.recommended && (
                                        <div className="absolute top-0 right-0 bg-[#52525C] font-bold text-white text-xs h-7 px-4 flex items-center justify-center rounded-tr-[6px] rounded-bl-[6px]">
                                            Tavsiye Edilen
                                        </div>
                                    )}

                                    <div>
                                        <h3 className="text-white text-sm mb-1 font-semibold">{pkg.title}</h3>
                                        <p className="text-[#71717B] text-xs line-clamp-2">{pkg.description}</p>
                                    </div>

                                    <div className='my-4 bg-[#3F3F47] w-full h-px'></div>

                                    <div className="flex items-center mb-4 gap-2">
                                        <img src='/icons/diamond.svg' className='w-4 h-4' />
                                        <span className="text-white text-sm font-semibold">{pkg.diamonds.toLocaleString('tr-TR')}</span>
                                    </div>

                                    <div className="mt-auto">
                                        <div className="bg-[#3F3F47] text-white text-center text-sm h-10 rounded-[6px] font-bold flex items-center justify-center mb-4">
                                            {pkg.price.toLocaleString('tr-TR')} TL
                                        </div>
                                        <p className="text-[#9F9FA9] text-xs text-center">Aylık olarak faturalandırılır.</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Footer with Purchase Button */}
                        <div className="p-4 border-t border-[#27272A] flex justify-center">
                            <motion.button
                                className="bg-[#1C398E] ml-auto hover:bg-[#162456]/80 text-white font-medium py-3 px-12 gap-3 cursor-pointer rounded-[6px] flex items-center"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handlePurchase}
                            >
                                <Icon icon="mynaui:credit-card" className="w-6 h-6" />
                                Satın Al
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PremiumModal;