"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const DroppedModal = ({ isOpen, onClose }) => {
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
            }
        },
        exit: {
            y: 50,
            opacity: 0,
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
                        className="bg-[#18181B] rounded-[6px] w-[95%] max-w-[400px] border border-[#27272A] overflow-hidden"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="flex flex-col items-center p-6">
                            {/* Warning Icon */}
                            <motion.div
                                className="mb-4"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <Icon icon="mdi:alert-circle" className="text-red-500 text-4xl" />
                            </motion.div>

                            {/* Title */}
                            <motion.h2
                                className="text-white text-base font-semibold mb-1"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                Yayından Atıldın
                            </motion.h2>

                            {/* Subtitle */}
                            <motion.p
                                className="text-[#A1A1AA] text-sm text-center mb-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.25 }}
                            >
                                Yayıncı tarafından yayından atıldın
                            </motion.p>

                            <motion.button
                                className="w-full h-10 rounded-[6px] cursor-pointer text-sm text-white bg-[#27272A] transition-colors hover:bg-[#4F4F57]"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                onClick={onClose}
                            >
                                Tamam
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DroppedModal;