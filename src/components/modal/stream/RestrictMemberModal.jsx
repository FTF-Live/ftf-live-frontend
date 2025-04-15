"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

const RestrictMemberModal = ({ isOpen, onClose, memberName = "Anna Lola", memberAvatar = "/images/girl.png", onRestrict }) => {
  const [reasonOption, setReasonOption] = useState("");
  const [durationOption, setDurationOption] = useState("");

  // Sample options
  const reasonOptions = [
    "Spam/Trolling",
    "Zorbalık ve Taciz",
    "Nefret Söylemi",
    "Uygunsuz İçerik",
    "Diğer"
  ];

  const durationOptions = [
    "1 saat",
    "1 gün",
    "3 gün",
    "7 gün",
    "30 gün",
    "Kalıcı"
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
      }
    },
    exit: {
      y: 50,
      opacity: 0,
    }
  };

  const handleSubmit = () => {
    if (onRestrict) {
      onRestrict({
        memberName,
        reason: reasonOption,
        duration: durationOption
      });
    }
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
            className="bg-[#18181B] rounded-[6px] w-[95%] max-w-[400px] border border-[#27272A] overflow-hidden"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header with user info */}
            <div className="flex items-center justify-between p-4 border-b border-[#27272A]">
              <div className="flex items-center gap-3">
                <img
                  src={memberAvatar}
                  alt={memberName}
                  className="w-6 h-6 rounded-[6px] object-cover"
                />
                <span className="text-white text-sm font-medium">{memberName}</span>
              </div>
              <button
                onClick={onClose}
                className="text-white cursor-pointer"
              >
                <Icon icon="mdi:close" className="w-5 h-5 cursor-pointer" />
              </button>
            </div>

            <div className="p-6">
              {/* Warning Icon */}
              <div className="flex flex-col items-center mb-4">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Icon icon="mdi:alert-circle-outline" className="text-white text-4xl" />
                </motion.div>

                {/* Title */}
                <motion.h2
                  className="text-white text-base font-semibold mt-3 mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Üyeyi kısıtla
                </motion.h2>

                {/* Description */}
                <motion.p
                  className="text-[#A1A1AA] text-sm text-center mb-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                >
                  Philly green peppers ipsum party Chicago pineapple Hawaiian string. Chicken personal mayo beef
                </motion.p>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-[#27272A] mb-5"></div>

              {/* Selection Dropdowns */}
              <div className="space-y-2">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="relative">
                    <select
                      value={reasonOption}
                      onChange={(e) => setReasonOption(e.target.value)}
                      className="outline-none bg-[#27272A] text-[#9F9FA9] w-full p-3 rounded appearance-none pr-10 cursor-pointer text-sm"
                    >
                      <option value="" disabled>Şikayet nedeni seçiniz</option>
                      {reasonOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Icon icon="tabler:chevron-down" className="text-white" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="relative mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="relative">
                    <select
                      value={durationOption}
                      onChange={(e) => setDurationOption(e.target.value)}
                      className="outline-none bg-[#27272A] text-[#9F9FA9] w-full p-3 rounded appearance-none pr-10 cursor-pointer text-sm"
                    >
                      <option value="" disabled>Kısıtlama süresi seçiniz</option>
                      {durationOptions.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Icon icon="tabler:chevron-down" className="text-white" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Action Button */}
              <motion.button
                className="w-full py-3 rounded text-[#FF6467] hover:text-white cursor-pointer text-sm bg-[#460809] hover:bg-[#bd2324] transition-colors font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={handleSubmit}
                disabled={!reasonOption || !durationOption}
              >
                Şikayet Et ve Kısıtla
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RestrictMemberModal;