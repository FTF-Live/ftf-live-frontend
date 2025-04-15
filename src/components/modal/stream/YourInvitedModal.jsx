"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const YourInvitedModal = ({ isOpen, onClose, onAccept, onReject }) => {
    const [cameraEnabled, setCameraEnabled] = useState(true);
    const [microphoneEnabled, setMicrophoneEnabled] = useState(false);

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
            {false  && (
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
                        <div className="flex flex-col items-center p-3 pt-8">
                            <motion.h2
                                className="text-white text-base font-semibold mb-2"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                Yayına Davet Edildin
                            </motion.h2>

                            <motion.p
                                className="text-[#A1A1AA] text-sm text-center mb-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                Yayıncı seni dahil etmek istiyor.
                            </motion.p>

                            <motion.div
                                className="w-full space-y-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                {/* Camera toggle */}
                                <div className="flex items-center justify-between bg-[#27272A] h-12 px-4  rounded">
                                    <div className="flex items-center gap-3">
                                        <Icon icon="tabler:video-filled" className="text-white text-xl" />
                                        <span className="text-sm text-white">Kameramı aç</span>
                                    </div>
                                    <button
                                        className={`cursor-pointer w-12 h-6 rounded-full flex items-center transition-colors duration-300 ${cameraEnabled ? 'bg-blue-600 justify-end' : 'bg-[#3F3F46] justify-start'}`}
                                        onClick={() => setCameraEnabled(!cameraEnabled)}
                                    >
                                        <motion.div
                                            className="w-5 h-5 bg-white rounded-full m-0.5"
                                            layout
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    </button>
                                </div>

                                {/* Microphone toggle */}
                                <div className="flex items-center justify-between bg-[#27272A] h-12 px-4 rounded">
                                    <div className="flex items-center gap-3">
                                        <Icon icon="mynaui:microphone-solid" className="text-white text-xl" />
                                        <span className="text-sm text-white">Mikrofonu aç</span>
                                    </div>
                                    <button
                                        className={`cursor-pointer w-12 h-6 rounded-full flex items-center transition-colors duration-300 ${microphoneEnabled ? 'bg-blue-600 justify-end' : 'bg-[#3F3F46] justify-start'}`}
                                        onClick={() => setMicrophoneEnabled(!microphoneEnabled)}
                                    >
                                        <motion.div
                                            className="w-5 h-5 bg-white rounded-full m-0.5"
                                            layout
                                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                        />
                                    </button>
                                </div>
                            </motion.div>

                            <motion.div
                                className="flex w-full mt-8 items-center justify-center gap-2"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                <button
                                    className="w-1/2 h-10 rounded-[6px] cursor-pointer text-sm text-white bg-[#27272A] hover:bg-[#27272A] transition-colors"
                                    onClick={() => {
                                        onReject && onReject();
                                        onClose && onClose();
                                    }}
                                >
                                    Reddet
                                </button>
                                <button
                                    className="w-1/2 h-10 rounded-[6px] cursor-pointer text-sm text-white bg-[#3F3F47] transition-colors"
                                    onClick={() => {
                                        onAccept && onAccept({ camera: cameraEnabled, microphone: microphoneEnabled });
                                        onClose && onClose();
                                    }}
                                >
                                    Kabul Et
                                </button>
                            </motion.div>
                        </div>



                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default YourInvitedModal;