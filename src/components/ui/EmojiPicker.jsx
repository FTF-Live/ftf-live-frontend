"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

// Emoji categories and their emojis
const emojiCategories = [
  {
    name: "Smileys",
    icon: "mdi:emoticon-happy-outline",
    emojis: ["😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘"]
  },
  {
    name: "Gestures",
    icon: "mdi:hand-wave-outline",
    emojis: ["👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🫰", "🤟", "🤘", "🤙", "👈", "👉", "👍", "👎"]
  },
  {
    name: "People",
    icon: "mdi:account-outline",
    emojis: ["👶", "👧", "🧒", "👦", "👩", "🧑", "👨", "👱‍♀️", "👱", "👴", "👵", "🧓", "👲", "👳‍♀️", "👳"]
  },
  {
    name: "Animals",
    icon: "mdi:cat",
    emojis: ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧"]
  },
  {
    name: "Food",
    icon: "mdi:food-apple",
    emojis: ["🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅"]
  },
  {
    name: "Activities",
    icon: "mdi:basketball",
    emojis: ["⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🪀", "🏓", "🏸", "🏒", "🏑", "🥍", "🏏"]
  },
  {
    name: "Objects",
    icon: "mdi:lightbulb-outline",
    emojis: ["⌚", "📱", "📲", "💻", "⌨️", "🖥️", "🖨️", "🖱️", "🖲️", "🕹️", "🗜️", "💽", "💾", "💿", "📀", "📼", "📷"]
  },
  {
    name: "Symbols",
    icon: "mdi:heart-outline",
    emojis: ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘"]
  }
];

const EmojiPicker = ({ isOpen, onClose, onEmojiSelect }) => {
  const [activeCategory, setActiveCategory] = React.useState(0);

  const handleEmojiClick = (emoji) => {
    if (onEmojiSelect) {
      onEmojiSelect(emoji);
    }
  };

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.2,
        staggerChildren: 0.03
      }
    },
    exit: { 
      opacity: 0, 
      y: 10,
      transition: { 
        duration: 0.2 
      }
    }
  };

  const emojiVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    hover: { 
      scale: 1.2,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.9 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="absolute bottom-full left-0 mb-2 z-50 w-[320px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="bg-[#18181B] border border-[#27272A] rounded-lg shadow-lg overflow-hidden">
              {/* Category tabs */}
              <div className="flex items-center border-b border-[#27272A] px-2 py-1 overflow-x-auto hide-scrollbar">
                {emojiCategories.map((category, index) => (
                  <motion.button
                    key={category.name}
                    className={`p-2 rounded-md flex items-center justify-center mx-1 ${
                      activeCategory === index ? 'bg-[#3F3F47] text-white' : 'text-[#9F9FA9] hover:text-white'
                    }`}
                    onClick={() => setActiveCategory(index)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon icon={category.icon} className="w-5 h-5" />
                  </motion.button>
                ))}
              </div>

              {/* Emoji grid */}
              <div className="p-2 max-h-[200px] overflow-y-auto">
                <div className="grid grid-cols-8 gap-1">
                  {emojiCategories[activeCategory].emojis.map((emoji, index) => (
                    <motion.button
                      key={index}
                      className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-[#3F3F47] cursor-pointer text-lg"
                      onClick={() => handleEmojiClick(emoji)}
                      variants={emojiVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      {emoji}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center border-t border-[#27272A] p-2">
                <span className="text-xs text-[#9F9FA9]">{emojiCategories[activeCategory].name}</span>
                <motion.button
                  className="text-[#9F9FA9] hover:text-white p-1 rounded-md"
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon icon="mdi:close" className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default EmojiPicker; 