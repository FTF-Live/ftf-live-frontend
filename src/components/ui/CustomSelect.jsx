"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { createPortal } from 'react-dom';

const CustomSelect = ({
  options,
  value,
  onChange,
  placeholder = "Seçiniz",
  icon = null,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);
  const [portalContainer, setPortalContainer] = useState(null);
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0, width: 0 });
  const selectRef = useRef(null);
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  // Initialize portal container
  useEffect(() => {
    // Check if window exists (for SSR)
    if (typeof window !== 'undefined') {
      setPortalContainer(document.body);
    }
  }, []);

  // Update position when dropdown opens
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width
      });
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      // Don't close if clicking inside the dropdown
      if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
        return;
      }

      // Close if clicking outside the select button and dropdown
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelectOption = (option, event) => {
    if (event) {
      // Prevent event from bubbling up
      event.stopPropagation();
    }

    setSelectedValue(option.value);
    setIsOpen(false);

    if (onChange) {
      onChange({ target: { value: option.value } });
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Find the selected option's label
  const selectedOption = options.find(option => option.value === selectedValue);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className={`relative w-full ${className}`} ref={selectRef}>
      <motion.button
        ref={buttonRef}
        type="button"
        className={`w-full p-3 ${icon ? 'pl-10' : ''} bg-[#27272A] text-sm text-white outline-none rounded-[6px] appearance-none flex items-center justify-between`}
        onClick={toggleDropdown}
        whileHover={{ backgroundColor: "#32323a" }}
        whileTap={{ scale: 0.98 }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {icon && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9F9FA9]">
            <Icon icon={icon} className="w-5 h-5" />
          </span>
        )}
        <span className={selectedValue ? "text-white" : "text-[#9F9FA9]"}>
          {displayText}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
        >
          <Icon icon="mdi:chevron-down" className="text-[#9F9FA9] w-5 h-5" />
        </motion.div>
      </motion.button>

      {portalContainer && isOpen && createPortal(
        <AnimatePresence>
          <div
            className="fixed inset-0 z-[60]"
            onClick={(e) => {
              // Only close if clicking on the backdrop
              if (e.target === e.currentTarget) {
                setIsOpen(false);
              }
            }}
          >
            <motion.ul
              ref={dropdownRef}
              className="absolute bg-[#32323A] border border-[#3F3F47] rounded-[6px] shadow-lg max-h-60 overflow-auto"
              style={{
                top: buttonPosition.top + 4,
                left: buttonPosition.left,
                width: buttonPosition.width,
                zIndex: 9999
              }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              role="listbox"
              onClick={(e) => e.stopPropagation()}
            >
              {options.map((option, index) => (
                <motion.li
                  key={option.value || index}
                  className={`cursor-pointer p-3 hover:bg-[#3F3F47] ${selectedValue === option.value ? 'bg-[#3F3F47] text-white' : 'text-[#9F9FA9]'
                    }`}
                  onClick={(e) => handleSelectOption(option, e)}
                  whileHover={{ backgroundColor: "#4a4a52" }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  role="option"
                  aria-selected={selectedValue === option.value}
                >
                  <div className="flex items-center justify-between">
                    <span>{option.label}</span>
                    {selectedValue === option.value && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon icon="mdi:check" className="text-blue-500 w-5 h-5" />
                      </motion.span>
                    )}
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </AnimatePresence>,
        portalContainer
      )}
    </div>
  );
};

export default CustomSelect; 