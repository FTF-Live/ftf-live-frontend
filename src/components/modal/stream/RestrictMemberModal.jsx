"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import CustomSelect from '@/components/ui/CustomSelect';

const RestrictMemberModal = ({ isOpen, onClose, memberName = "Anna Lola", memberAvatar = "/images/girl.png", onRestrict }) => {
  const [reasonOption, setReasonOption] = useState("");
  const [durationOption, setDurationOption] = useState("");

  // Sample options
  const reasonOptions = [
    { value: "Spam/Trolling", label: "Spam/Trolling" },
    { value: "Zorbalık ve Taciz", label: "Zorbalık ve Taciz" },
    { value: "Nefret Söylemi", label: "Nefret Söylemi" },
    { value: "Uygunsuz İçerik", label: "Uygunsuz İçerik" },
    { value: "Diğer", label: "Diğer" }
  ];

  const durationOptions = [
    { value: "1 saat", label: "1 saat" },
    { value: "1 gün", label: "1 gün" },
    { value: "3 gün", label: "3 gün" },
    { value: "7 gün", label: "7 gün" },
    { value: "30 gün", label: "30 gün" },
    { value: "Kalıcı", label: "Kalıcı" }
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
                  <CustomSelect
                    options={[
                      { value: "", label: "Şikayet nedeni seçiniz", disabled: true },
                      ...reasonOptions
                    ]}
                    value={reasonOption}
                    onChange={(e) => setReasonOption(e.target.value)}
                    placeholder="Şikayet nedeni seçiniz"
                    icon="mdi:alert-circle-outline"
                  />
                </motion.div>

                <motion.div
                  className="relative mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <CustomSelect
                    options={[
                      { value: "", label: "Kısıtlama süresi seçiniz", disabled: true },
                      ...durationOptions
                    ]}
                    value={durationOption}
                    onChange={(e) => setDurationOption(e.target.value)}
                    placeholder="Kısıtlama süresi seçiniz"
                    icon="mdi:timer-outline"
                  />
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