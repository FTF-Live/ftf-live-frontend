"use client";
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const GenderFilterModal = ({ isOpen, onClose, selectedGender, onSelect, buttonRef }) => {
    const dropdownRef = useRef(null);
    
    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            // Close the dropdown if clicked outside
            if (
                isOpen &&
                dropdownRef.current && 
                !dropdownRef.current.contains(event.target) &&
                buttonRef?.current && 
                !buttonRef.current.contains(event.target)
            ) {
                onClose();
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose, buttonRef]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={dropdownRef}
                    className="absolute bottom-full left-0 w-full mb-2 bg-[#18181B] rounded-lg shadow-lg overflow-hidden z-[1000]"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    style={{
                        width: buttonRef?.current?.offsetWidth || 'auto',
                        marginBottom: '8px'
                    }}
                >
                    <div className="divide-y divide-[#27272A]">
                        <div 
                            className={`flex items-center h-14 px-3 cursor-pointer ${selectedGender === 'all' ? 'bg-[#27272A]' : ''}`} 
                            onClick={() => onSelect('all')}
                        >
                            <Icon icon="mingcute:user-3-line" className="w-5 h-5 mr-3 text-white" />
                            <span className="text-white">Tümü</span>
                        </div>
                        
                        <div 
                            className={`flex items-center justify-between h-14 px-3 cursor-pointer ${selectedGender === 'female' ? 'bg-[#27272A]' : ''}`} 
                            onClick={() => onSelect('female')}
                        >
                            <div className="flex items-center">
                                <Icon icon="tdesign:gender-female" className="w-5 h-5 mr-3 text-white" />
                                <span className="text-white">Kadın</span>
                            </div>
                            <div className="flex items-center">
                                <img src="/icons/diamond.svg" alt="Diamond" className="w-4 h-4 mr-1" />
                                <span className="text-white">50</span>
                            </div>
                        </div>
                        
                        <div 
                            className={`flex items-center justify-between h-14 px-3 cursor-pointer ${selectedGender === 'male' ? 'bg-[#27272A]' : ''}`} 
                            onClick={() => onSelect('male')}
                        >
                            <div className="flex items-center">
                                <Icon icon="tdesign:gender-male" className="w-5 h-5 mr-3 text-white" />
                                <span className="text-white">Erkek</span>
                            </div>
                            <div className="flex items-center">
                                <img src="/icons/diamond.svg" alt="Diamond" className="w-4 h-4 mr-1" />
                                <span className="text-white">50</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GenderFilterModal;