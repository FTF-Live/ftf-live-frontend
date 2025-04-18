"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import CustomSelect from '@/components/ui/CustomSelect';

const ProfileModal = ({ isOpen, onClose, userData = {
    username: "selin_f",
    email: "lorem@domain.com",
    avatar: "/images/profile.png",
    gender: "male"
} }) => {
    const [activeTab, setActiveTab] = useState("profile");
    const [username, setUsername] = useState(userData.username);
    const [email, setEmail] = useState(userData.email);
    const [gender, setGender] = useState(userData.gender);
    const [isMobile, setIsMobile] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    // Check if we're on mobile
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        // Initial check
        checkIfMobile();
        
        // Add event listener
        window.addEventListener('resize', checkIfMobile);
        
        // Cleanup
        return () => window.removeEventListener('resize', checkIfMobile);
    }, []);

    // Close sidebar on mobile when tab changes
    useEffect(() => {
        if (isMobile) {
            setIsSidebarOpen(false);
        }
    }, [activeTab, isMobile]);

    // Animation variants
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants = {
        hidden: { y: 20, opacity: 0 },
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
            y: 20,
            opacity: 0,
        }
    };

    const sidebarVariants = {
        hidden: { x: "-100%", opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
            }
        },
        exit: {
            x: "-100%",
            opacity: 0,
        }
    };

    const listItemVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: i => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.3
            }
        }),
        hover: {
            scale: 1.02,
            backgroundColor: "#32323A",
            transition: { duration: 0.2 }
        },
        tap: {
            scale: 0.98,
            transition: { duration: 0.1 }
        }
    };

    const MenuItems = [
        { id: "profile", label: "Profilim", icon: "mdi:account" },
        { id: "media", label: "Görüntü ve Ses", icon: "mdi:video" },
        { id: "subscriptions", label: "Aboneliklerim", icon: "mdi:credit-card-outline" },
        { id: "payments", label: "Ödeme Geçmişim", icon: "mdi:credit-card-outline" },
        { id: "history", label: "Eşleşme Geçmişim", icon: "mdi:history" },
        { id: "theme", label: "Sistem Teması", icon: "mdi:desktop-mac", hasSubmenu: true },
        { id: "language", label: "Türkçe", icon: "mdi:translate", hasSubmenu: true },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "profile":
                return (
                    <motion.div 
                        className="p-4 sm:p-6 h-full overflow-y-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div>
                            <div className='flex items-center justify-between w-full mb-3'>
                                <h2 className="text-[#9F9FA9] text-sm">Profil Resmim</h2>

                                <div className='flex items-center gap-2'>
                                    <Icon icon="tdesign:gender-male" className='text-sm text-white/60' />
                                    <span className='text-sm font-medium text-white/60'>Erkek</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center sm:items-start">
                                <motion.img
                                    src="/images/girl.png"
                                    alt="Profile"
                                    className="w-20 h-20 rounded-full object-cover"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </div>
                        </div>

                        <div className='bg-[#27272A] w-full h-px my-6' />

                        <div className="mb-6">
                            <h2 className="text-[#9F9FA9] text-sm mb-2">Kullanıcı Adım</h2>
                            <motion.input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-3 bg-[#27272A] text-white outline-none rounded-[6px]"
                                whileFocus={{ borderColor: "#3B82F6", borderWidth: "1px" }}
                            />
                        </div>

                        <div className="mb-6">
                            <h2 className="text-[#9F9FA9] text-sm mb-2">E-Posta Adresim</h2>
                            <div className="relative">
                                <motion.input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 bg-[#27272A] text-white outline-none rounded-[6px]"
                                    readOnly
                                    whileFocus={{ borderColor: "#3B82F6", borderWidth: "1px" }}
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <motion.div
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <Icon icon="mdi:check-circle" className="text-blue-500 w-5 h-5" />
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        <motion.button
                            className="w-max flex items-center justify-center ml-auto bg-transparent text-white cursor-pointer text-sm"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => { }}
                        >
                            <Icon icon="mdi:logout" className="text-xl mr-2" />
                            Oturumu Kapat
                        </motion.button>
                    </motion.div>
                );
            case "media":
                return (
                    <motion.div 
                        className="p-4 sm:p-6 h-full overflow-y-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex flex-col items-start">
                            <motion.img
                                src="/images/stream.png"
                                alt="Profile"
                                className="w-full h-[200px] sm:h-[356px] rounded-[6px] object-cover"
                                whileHover={{ scale: 1.01 }}
                                transition={{ duration: 0.2 }}
                            />
                        </div>

                        <div className='bg-[#27272A] w-full h-px my-6' />

                        <div className="mb-6">
                            <h2 className="text-[#9F9FA9] text-sm mb-2">Kamera</h2>
                            <CustomSelect
                                options={[
                                    { value: "", label: "Kamera Seçin" },
                                    { value: "camera1", label: "Kamera 1" },
                                    { value: "camera2", label: "Kamera 2" }
                                ]}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                icon="gridicons:video-camera"
                            />
                        </div>

                        <div className="mb-6">
                            <h2 className="text-[#9F9FA9] text-sm mb-2">Mikrofon</h2>
                            <CustomSelect
                                options={[
                                    { value: "", label: "Mikrofon Seçin" },
                                    { value: "mic1", label: "Mikrofon 1" },
                                    { value: "mic2", label: "Mikrofon 2" }
                                ]}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                icon="mynaui:microphone-solid"
                            />
                        </div>
                    </motion.div>
                );
            case "subscriptions":
                return (
                    <motion.div 
                        className="p-4 sm:p-6 h-full overflow-y-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div 
                            className='bg-[#27272A] w-full rounded-[6px] p-4 sm:p-5'
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className='flex items-center gap-4 w-full'>
                                <motion.div
                                    className='w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-[#3F3F47]'
                                    whileHover={{ rotate: 10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <motion.img 
                                        src='/icons/diamond.svg' 
                                        className='w-5 h-5 sm:w-6 sm:h-6'
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    />
                                </motion.div>

                                <div className='flex flex-col items-start'>
                                    <h1 className='text-sm sm:text-base mb-0.5 font-bold'>Premium Plus</h1>
                                    <p className='text-xs font-medium'>Devam Eden Abonelik</p>
                                </div>
                            </div>

                            <div className='w-full h-px bg-[#3F3F47] my-4 sm:my-6'></div>

                            <div className='flex flex-col items-start gap-3 sm:gap-4 w-full mb-4 sm:mb-6'>
                                <div className='flex items-center justify-between w-full'>
                                    <span className='text-xs font-medium text-[#9F9FA9]'>Başlangıç Tarihi</span>
                                    <span className='text-xs font-medium text-[#FAFAFA]'>12 Jun 2024</span>
                                </div>
                                <div className='flex items-center justify-between w-full'>
                                    <span className='text-xs font-medium text-[#9F9FA9]'>Kartınız</span>
                                    <span className='text-xs font-medium text-[#FAFAFA]'>**** **** **** 9089</span>
                                </div>
                                <div className='flex items-center justify-between w-full'>
                                    <span className='text-xs font-medium text-[#9F9FA9]'>Tutar</span>
                                    <span className='text-xs font-medium text-[#FAFAFA]'>123.89 TL</span>
                                </div>
                            </div>

                            <div className='flex flex-col sm:flex-row items-center justify-between w-full gap-3 sm:gap-0'>
                                <motion.button 
                                    className='text-sm font-medium text-[#9F9FA9] cursor-pointer py-2 w-full sm:w-auto text-center sm:text-left'
                                    whileHover={{ color: "#FFFFFF" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Aboneliği Sonlandır
                                </motion.button>

                                <motion.button 
                                    className='bg-[#3F3F47] h-10 px-6 flex items-center justify-center gap-2 rounded-[6px] cursor-pointer text-sm w-full sm:w-auto'
                                    whileHover={{ backgroundColor: "#52525C" }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <motion.img 
                                        src='/icons/diamond.svg' 
                                        className='w-4 h-4'
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    />
                                    Planı Yükselt
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                );
            case "payments":
                return (
                    <motion.div 
                        className="p-4 sm:p-6 h-full overflow-y-auto space-y-4 sm:space-y-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {Array.from({ length: 10 }).map((_, index) => (
                            <motion.div 
                                key={index} 
                                className='flex flex-col sm:flex-row items-start sm:items-center justify-between w-full gap-3 sm:gap-0'
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                whileHover={{ backgroundColor: "#27272A", scale: 1.01, borderRadius: "6px" }}
                                whileTap={{ scale: 0.99 }}
                                exit={{ opacity: 0, y: 20 }}
                            >
                                <div className='flex items-center gap-3 w-full sm:w-auto'>
                                    <motion.div 
                                        className='bg-[#27272A] w-10 h-10 rounded-full flex items-center justify-center'
                                        whileHover={{ rotate: 10 }}
                                    >
                                        <motion.img 
                                            src='/icons/diamond.svg' 
                                            className='w-4 h-4'
                                            animate={{ rotate: [0, 360] }}
                                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                        />
                                    </motion.div>

                                    <div className='flex flex-col items-start'>
                                        <h1 className='text-sm font-bold mb-0.5'>Elite Paket (1M)</h1>
                                        <span className='text-[#71717B] text-xs'>Başlangıç: 12.09.2025 - Bitiş : 12.10.2025</span>
                                    </div>
                                </div>

                                <div className='flex flex-col items-end justify-center ml-auto'>
                                    <span className='text-sm sm:text-base font-bold'>199,99 TL</span>
                                    <div className='flex items-center gap-1'>
                                        <span className='text-xs text-[#71717B]'>Bekleniyor</span>
                                        <motion.div
                                            animate={{ rotate: [0, 180, 360] }}
                                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                        >
                                            <Icon icon="basil:sand-watch-outline" className='text-[#FE9A00]' />
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                );
            case "history":
                return (
                    <motion.div 
                        className="p-4 sm:p-6 h-full grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {Array.from({ length: 10 }).map((_, index) => (
                            <motion.div 
                                key={index} 
                                className='w-full'
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className='relative'>
                                    <motion.img 
                                        src='/images/stream.png' 
                                        className='w-full h-[120px] sm:h-[150px] rounded-[6px] object-cover mb-2'
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.2 }}
                                    />

                                    <motion.button 
                                        className='w-8 cursor-pointer h-8 rounded-[6px] flex items-center justify-center absolute top-2 right-2 bg-red-500'
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Icon icon="material-symbols:warning-rounded" className='text-white w-5 h-5' />
                                    </motion.button>
                                </div>

                                <div className="flex items-center gap-1">
                                    <span className='text-sm font-bold'>user276327</span>
                                    <Icon icon="mdi:check-circle" className='text-blue-500 w-3 h-3' />
                                </div>

                                <div className='flex items-center gap-2 flex-wrap'>
                                    <span className='text-xs text-[#71717B]'>12.09.2025, 23:43</span>
                                    <div className='bg-[#3F3F47] w-1 h-1 rounded-full'></div>
                                    <span className='text-xs text-[#71717B]'>7 dk, 45 sn</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                );
            default:
  return (
                    <motion.div 
                        className="p-6 h-full flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className="text-[#9F9FA9]">Bu bölüm henüz tamamlanmadı</p>
                    </motion.div>
                );
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
                        className="bg-[#18181B] rounded-md w-[95%] max-w-4xl h-[90vh] sm:h-[80vh] max-h-[600px] border border-[#27272A] overflow-hidden"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center h-14 px-4 border-b border-[#27272A]">
                            <div className="flex items-center gap-2">
                                {isMobile && (
                                    <motion.button 
                                        className="mr-2 text-white cursor-pointer"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                                    >
                                        <Icon icon={isSidebarOpen ? "mdi:close" : "mdi:menu"} className="w-6 h-6" />
                                    </motion.button>
                                )}
                                <img src="/images/logo.png" alt="Logo" className="h-6" />
                            </div>
                            <h2 className="text-white text-sm font-medium">Ayarlar</h2>
                            <motion.button
                                onClick={onClose}
                                className="text-white cursor-pointer"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <Icon icon="mdi:close" className="w-5 h-5" />
                            </motion.button>
                        </div>

                        <div className="flex relative h-[calc(100%-56px)]">
                            {/* Mobile sidebar overlay */}
                            <AnimatePresence>
                                {isMobile && isSidebarOpen && (
                                    <motion.div
                                        className="fixed inset-0 bg-black/50 z-10"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        onClick={() => setIsSidebarOpen(false)}
                                    />
                                )}
                            </AnimatePresence>

                            {/* Sidebar */}
                            <AnimatePresence>
                                {(!isMobile || (isMobile && isSidebarOpen)) && (
                                    <motion.div
                                        className={`${isMobile ? 'absolute left-0 top-0 z-20 w-[250px]' : 'w-[300px]'} border-r border-[#27272A] h-full bg-[#18181B] overflow-y-auto flex flex-col items-start justify-between`}
                                        variants={isMobile ? sidebarVariants : {}}
                                        initial={isMobile ? "hidden" : false}
                                        animate="visible"
                                        exit={isMobile ? "exit" : false}
                                    >
                                        <ul className='p-2 space-y-4 w-full'>
                                            {MenuItems.slice(0, -2).map((item, index) => (
                                                <motion.li 
                                                    key={item.id} 
                                                    className='cursor-pointer rounded-[6px]'
                                                    variants={listItemVariants}
                                                    custom={index}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit={{ opacity: 0, x: -20 }}
                                                    whileHover="hover"
                                                    whileTap="tap"
                                                >
                                                    <button
                                                        className={`flex items-center rounded-[6px] w-full p-3 text-left ${activeTab === item.id ? "bg-[#27272A]" : ""}`}
                                                        onClick={() => {
                                                            setActiveTab(item.id);
                                                            if (isMobile) setIsSidebarOpen(false);
                                                        }}
                                                    >
                                                        <Icon icon={item.icon} className="w-5 h-5 text-white mr-3" />
                                                        <span className={`text-sm font-bold flex-1 ${activeTab === item.id ? "text-white" : "text-[#9F9FA9]"}`}>
                                                            {item.label}
                                                        </span>
                                                        {item.hasSubmenu && (
                                                            <Icon icon="tabler:chevron-right" className="w-4 h-4 text-[#9F9FA9]" />
                                                        )}
                                                    </button>
                                                </motion.li>
                                            ))}
                                        </ul>

                                        <ul className='p-2 w-full'>
                                            {MenuItems.slice(-2).map((item, index) => (
                                                <motion.li 
                                                    key={item.id} 
                                                    variants={listItemVariants}
                                                    custom={index + 5}
                                                    initial="hidden"
                                                    animate="visible"
                                                    exit={{ opacity: 0, x: -20 }}
                                                    whileHover="hover"
                                                    whileTap="tap"
                                                >
                                                    <button
                                                        className={`flex items-center w-full p-3 rounded-[6px] text-left ${activeTab === item.id ? "bg-[#27272A]" : ""}`}
                                                        onClick={() => {
                                                            setActiveTab(item.id);
                                                            if (isMobile) setIsSidebarOpen(false);
                                                        }}
                                                    >
                                                        <Icon icon={item.icon} className="w-5 h-5 text-white mr-3" />
                                                        <span className={`text-sm flex-1 ${activeTab === item.id ? "text-white" : "text-[#9F9FA9]"}`}>
                                                            {item.label}
                                                        </span>
                                                        {item.hasSubmenu && (
                                                            <Icon icon="tabler:chevron-right" className="w-4 h-4 text-[#9F9FA9]" />
                                                        )}
                                                    </button>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Content Area */}
                            <div className="flex-1 h-full overflow-hidden">
                                {renderContent()}
                                asdlğpasdoasd
                            </div>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProfileModal;