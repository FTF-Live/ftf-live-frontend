import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

// Emoji categories with their emojis
const emojiCategories = [
  {
    name: 'Smileys',
    icon: 'mdi:emoticon-outline',
    emojis: ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '🥰', '😘', '😗', '😙', '😚', '🙂', '🤗', '🤔', '🤨', '😐', '😑', '😶', '🙄', '😏', '😣', '😥', '😮', '🤐', '😯', '😪', '😫', '😴', '😌', '😛', '😜', '😝', '🤤']
  },
  {
    name: 'Gestures',
    icon: 'mdi:hand-wave-outline',
    emojis: ['👋', '🤚', '✋', '🖖', '👌', '🤌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃', '🫀', '🫁', '🧠', '🦷', '🦴', '👀', '👁️', '👅', '👄']
  },
  {
    name: 'People',
    icon: 'mdi:account-outline',
    emojis: ['👶', '👧', '🧒', '👦', '👩', '🧑', '👨', '👩‍🦱', '👨‍🦱', '👩‍🦰', '👨‍🦰', '👱‍♀️', '👱‍♂️', '👩‍🦳', '👨‍🦳', '👩‍🦲', '👨‍🦲', '🧔', '👵', '🧓', '👴', '👲', '👳‍♀️', '👳‍♂️', '🧕', '👮‍♀️', '👮‍♂️', '👷‍♀️', '👷‍♂️', '💂‍♀️', '💂‍♂️', '🕵️‍♀️', '🕵️‍♂️', '👩‍⚕️', '👨‍⚕️', '👩‍🌾', '👨‍🌾']
  },
  {
    name: 'Animals',
    icon: 'mdi:cat',
    emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐻‍❄️', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦢', '🦅', '🦉', '🦤', '🪶', '🦩', '🦚', '🦜', '🐍', '🦎', '🐲', '🐉', '🦕', '🦖', '🐳', '🐬', '🦭', '🐟', '🐠', '🐡']
  },
  {
    name: 'Food',
    icon: 'mdi:food-apple-outline',
    emojis: ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🫑', '🥔', '🧄', '🧅', '🥕', '🌽', '🥗', '🥘', '🍝', '🍕', '🌮', '🌯', '🥙', '🧆', '🥚', '🍳', '🥞', '🧇']
  },
  {
    name: 'Activities',
    icon: 'mdi:basketball',
    emojis: ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🪀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛼', '🛶', '🎿', '⛷️', '🏂', '🪂', '🏋️‍♀️', '🏋️‍♂️', '🤼‍♀️', '🤼‍♂️', '🤸‍♀️', '🤸‍♂️', '⛹️‍♀️', '⛹️‍♂️']
  },
  {
    name: 'Objects',
    icon: 'mdi:lightbulb-outline',
    emojis: ['⌚', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️', '🗜️', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽️', '🎞️', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '🧭', '⏱️', '⏲️', '⏰', '🕰️', '⌛', '⏳', '📡', '🔋', '🔌']
  },
  {
    name: 'Symbols',
    icon: 'mdi:heart-outline',
    emojis: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓', '🆔']
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { duration: 0.2, staggerChildren: 0.03 }
  },
  exit: { opacity: 0, y: 20, scale: 0.95, transition: { duration: 0.15 } }
};

const emojiVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  hover: { scale: 1.2, transition: { duration: 0.1 } }
};

const EmojiPicker = ({ isOpen, onClose, onEmojiSelect }) => {
  const [activeCategory, setActiveCategory] = useState(emojiCategories[0]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="absolute bottom-full left-0 mb-2 z-50"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
        >
          <div 
            className="bg-[#27272A] border border-[#3F3F46] rounded-lg shadow-lg p-2"
            style={{ width: '320px', maxHeight: '300px' }}
          >
            {/* Category Tabs */}
            <div className="flex overflow-x-auto mb-2 pb-1 scrollbar-hide">
              {emojiCategories.map((category) => (
                <motion.button
                  key={category.name}
                  className={`p-2 rounded-md flex-shrink-0 ${activeCategory.name === category.name ? 'bg-[#3F3F46]' : 'hover:bg-[#3F3F46]/50'}`}
                  onClick={() => setActiveCategory(category)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon icon={category.icon} className="w-5 h-5 text-gray-300" />
                </motion.button>
              ))}
            </div>
            
            {/* Emoji Grid */}
            <div className="max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#52525B] scrollbar-track-[#27272A] p-1">
              <div className="grid grid-cols-8 gap-1">
                {activeCategory.emojis.map((emoji, index) => (
                  <motion.button
                    key={`${emoji}-${index}`}
                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-[#3F3F46] cursor-pointer text-xl"
                    onClick={() => onEmojiSelect(emoji)}
                    variants={emojiVariants}
                    whileHover="hover"
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>
            </div>
            
            {/* Footer */}
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-[#3F3F46]">
              <span className="text-xs text-gray-400">{activeCategory.name}</span>
              <motion.button
                className="text-gray-400 hover:text-white"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon icon="mdi:close" className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
          
          {/* Click away overlay */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={onClose}
            style={{ cursor: 'default' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EmojiPicker; 