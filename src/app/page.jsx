"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';

const Page = () => {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98
    }
  };

  return (
    <div className="bg-[#09090B] min-h-screen flex flex-col items-center justify-center p-4">
      <motion.div
        className="max-w-4xl w-full mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img src="/images/logo.png" alt="FTF Live" className="h-12 mx-auto mb-6" />
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">Hoş Geldiniz</h1>
        <p className="text-[#9F9FA9] text-sm sm:text-base max-w-xl mx-auto">
          Lütfen devam etmek için bir seçenek seçin
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="bg-[#18181B] border border-[#27272A] rounded-lg overflow-hidden cursor-pointer"
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => router.push('/match')}
        >
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#162456] flex items-center justify-center mb-6">
              <Icon icon="mdi:account-multiple" className="text-3xl text-white" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Match</h2>
            <p className="text-[#9F9FA9] text-sm">Hızlı eşleşmeler ve sohbetler için ideal</p>
          </div>
          <div className="bg-[#27272A] p-4 flex justify-center">
            <motion.button
              className="text-white text-sm font-medium flex items-center"
              whileHover={{ x: 5 }}
            >
              Keşfedin <Icon icon="mdi:arrow-right" className="ml-2" />
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="bg-[#18181B] border border-[#27272A] rounded-lg overflow-hidden cursor-pointer"
          variants={cardVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={() => router.push('/streamer')}
        >
          <div className="p-8 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#460809] flex items-center justify-center mb-6">
              <Icon icon="mdi:video" className="text-3xl text-white" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Streamer</h2>
            <p className="text-[#9F9FA9] text-sm">Yayıncılarla etkileşime geçin ve içerik üretin</p>
          </div>
          <div className="bg-[#27272A] p-4 flex justify-center">
            <motion.button
              className="text-white text-sm font-medium flex items-center"
              whileHover={{ x: 5 }}
            >
              Keşfedin <Icon icon="mdi:arrow-right" className="ml-2" />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Page;