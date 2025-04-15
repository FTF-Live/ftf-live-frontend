"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const RequestGiftModal = ({ isOpen, onClose }) => {
    // Gift items data with images, could be fetched from an API in a real application
    const giftItems = [
        { id: 1, name: 'Molecules', image: '/gifts/molecules.png', price: 195 },
        { id: 2, name: 'Unicorn', image: '/gifts/unicorn.png', price: 195 },
        { id: 3, name: 'Teddy Bear', image: '/gifts/teddy.png', price: 195 },
        { id: 4, name: 'Pizza', image: '/gifts/pizza.png', price: 195 },
    ];

    // Animation variants
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants = {
        hidden: { y: 50, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
                when: "beforeChildren",
                staggerChildren: 0.1,
            }
        },
        exit: {
            y: 50,
            opacity: 0,
            transition: { staggerChildren: 0.05, staggerDirection: -1 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 25
            }
        },
        exit: { y: 20, opacity: 0 },
        hover: {
            scale: 1.05,
            transition: { type: "spring", stiffness: 400, damping: 10 }
        }
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
                        className="bg-[#18181B] rounded-[6px] w-[95%] max-w-[408px] border border-[#27272A]"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="flex justify-between items-center w-full h-12 px-4 border-b border-b-[#27272A]">
                            <div className='w-4 h-4'></div>
                            <motion.h2
                                className="text-white text-sm font-semibold"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                Hediye İste
                            </motion.h2>
                            <motion.button
                                onClick={onClose}
                                className="cursor-pointer text-white p-1"
                                whileTap={{ scale: 0.9 }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <Icon icon="mdi:close" className="w-5 h-5" />
                            </motion.button>
                        </div>

                        <div className='p-4 grid grid-cols-4 gap-5'>
                            {Array.from({ length: 6 }).map((_, index) => {
                                return (
                                    <div key={index} className='flex items-center cursor-pointer justify-center gap-3 flex-col w-full h-full'>
                                        <img src={'/images/gifts/' + (index + 1) + '.png'} className='w-12 h-12 object-contain' />

                                        <div className='w-[70%] mx-auto h-px bg-[#27272A]'></div>

                                        <div className='flex items-center gap-1.5'>
                                            <img src='/icons/diamond.svg' className='w-4 h-4' />
                                            <span className='text-sm font-bold text-white'>{Math.floor(Math.random() * 100)}</span>
                                        </div>
                                    </div>
                                )
                            })}
                            {Array.from({ length: 6 }).map((_, index) => {
                                return (
                                    <div key={index} className='flex items-center cursor-pointer justify-center gap-3 flex-col w-full h-full'>
                                        <img src={'/images/gifts/' + (index + 1) + '.png'} className='w-12 h-12 object-contain' />

                                        <div className='w-[70%] mx-auto h-px bg-[#27272A]'></div>

                                        <div className='flex items-center gap-1.5'>
                                            <img src='/icons/diamond.svg' className='w-4 h-4' />
                                            <span className='text-sm font-bold text-white'>{Math.floor(Math.random() * 100)}</span>
                                        </div>
                                    </div>
                                )
                            })}
                            {Array.from({ length: 6 }).map((_, index) => {
                                return (
                                    <div key={index} className='flex items-center cursor-pointer justify-center gap-3 flex-col w-full h-full'>
                                        <img src={'/images/gifts/' + (index + 1) + '.png'} className='w-12 h-12 object-contain' />

                                        <div className='w-[70%] mx-auto h-px bg-[#27272A]'></div>

                                        <div className='flex items-center gap-1.5'>
                                            <img src='/icons/diamond.svg' className='w-4 h-4' />
                                            <span className='text-sm font-bold text-white'>{Math.floor(Math.random() * 100)}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RequestGiftModal;