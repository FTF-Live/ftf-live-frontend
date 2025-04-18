"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 }
};

const modalVariants = {
  hidden: {
    y: "-50vh",
    opacity: 0
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.3,
      type: "spring",
      damping: 25,
      stiffness: 500
    }
  },
  exit: {
    y: "100vh",
    opacity: 0
  }
};

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  if (!isOpen) return null;

  const handleLoginWithGoogle = () => {
    onLogin && onLogin('google');
  };

  const handleLoginWithFacebook = () => {
    onLogin && onLogin('facebook');
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={backdropVariants}
    >
      <motion.div
        className="bg-[#18181B] rounded-[6px] w-[95%] max-w-[720px] relative flex flex-col md:flex-row items-start max-h-[90vh] md:h-[360px] overflow-hidden"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className='w-full md:w-[264px] h-[120px] md:h-full'>
          <img 
            src='/images/login.png' 
            className='rounded-tl-[6px] rounded-tr-[6px] md:rounded-tr-none md:rounded-bl-[6px] w-full md:w-[264px] h-full object-cover' 
          />
        </div>

        <div className='flex flex-col items-start h-full w-full md:w-[calc(100%-264px)]'>
          <div className='flex items-center justify-between w-full p-4 border-b border-b-[#27272A]'>
            <h1 className="text-sm font-bold text-white text-center">Giriş Yap</h1>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
              aria-label="Close modal"
            >
              <Icon icon="mdi:close" className="w-5 h-5" />
            </button>
          </div>

          {/* Login buttons */}
          <div className="flex flex-col gap-4 py-6 px-4 w-full overflow-y-auto">
            <button
              onClick={handleLoginWithGoogle}
              className="flex items-center justify-between cursor-pointer gap-2 bg-[#2B7FFF] text-white py-3 px-4 rounded-[6px] w-full hover:bg-[#2B7FFF]/80 transition-colors"
            >
              <Icon icon="akar-icons:google-fill" className="w-5 h-5 text-white" />
              <span className="text-sm text-white font-medium">Google</span>
              <div className='w-5 h-5'></div>
            </button>

            <button
              onClick={handleLoginWithFacebook}
              className="flex items-center justify-between cursor-pointer gap-2 bg-[#1447E6] text-white py-3 px-4 rounded-[6px] w-full hover:bg-[#1447E6]/80 transition-colors"
            >
              <Icon icon="akar-icons:facebook-fill" className="w-5 h-5 text-white" />
              <span className="text-sm text-white font-medium">Facebook</span>
              <div className='w-5 h-5'></div>
            </button>

            <div className='flex items-center justify-center gap-3 my-2'>
              <div className='w-full h-[1px] bg-[#27272A]'></div>
              <span className='text-[#9F9FA9] shrink-0 text-sm'>ya da</span>
              <div className='w-full h-[1px] bg-[#27272A]'></div>
            </div>

            <button
              onClick={() => onLogin && onLogin('password')}
              className="flex items-center justify-between cursor-pointer gap-2 bg-[#27272A] text-white py-3 px-4 rounded-[6px] w-full hover:bg-[#27272A]/80 transition-colors"
            >
              <Icon icon="fluent:key-24-filled" className="w-5 h-5 text-white" />
              <span className="text-sm text-white font-medium">Şifre ile Giriş Yap</span>
              <div className='w-5 h-5'></div>
            </button>
            <div className="mt-4 text-sm text-[#9F9FA9] text-center">
              <p>Kişisel verilerinizin KVKK kapsamında işlenmesine izin veriyorum.</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginModal; 