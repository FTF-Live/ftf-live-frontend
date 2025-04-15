"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

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
                    <div className="p-6 h-full overflow-y-auto">
                        <div>
                            <div className='flex items-center justify-between w-full mb-3'>
                                <h2 className="text-[#9F9FA9] text-sm">Profil Resmim</h2>

                                <div className='flex items-center gap-2'>
                                    <Icon icon="tdesign:gender-male" className='text-sm text-white/60' />
                                    <span className='text-sm font-medium text-white/60'>Erkek</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-start">
                                <img
                                    src="/images/girl.png"
                                    alt="Profile"
                                    className="w-20 h-20 rounded-full object-cover"
                                />
                            </div>

                        </div>

                        <div className='bg-[#27272A] w-full h-px my-6' />

                        <div className="mb-6">
                            <h2 className="text-[#9F9FA9] text-sm mb-2">Kullanıcı Adım</h2>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-3 bg-[#27272A] text-white outline-none rounded-[6px]"
                            />
                        </div>

                        <div className="mb-6">
                            <h2 className="text-[#9F9FA9] text-sm mb-2">E-Posta Adresim</h2>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 bg-[#27272A] text-white outline-none rounded"
                                    readOnly
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <Icon icon="mdi:check-circle" className="text-blue-500 w-5 h-5" />
                                </div>
                            </div>
                        </div>

                        <motion.button
                            className="w-max flex items-center justify-center ml-auto bg-transparent text-white cursor-pointer text-sm"
                            whileTap={{ scale: 0.97 }}
                            onClick={() => { }}
                        >
                            <Icon icon="mdi:logout" className="text-xl mr-2" />
                            Oturumu Kapat
                        </motion.button>
                    </div>
                );
            case "media":
                return (
                    <div className="p-6 h-full overflow-y-auto">
                        <div className="flex flex-col items-start">
                            <img
                                src="/images/stream.png"
                                alt="Profile"
                                className="w-full h-[356px] rounded-[6px] object-cover"
                            />
                        </div>

                        <div className='bg-[#27272A] w-full h-px my-6' />

                        <div className="mb-6">
                            <h2 className="text-[#9F9FA9] text-sm mb-2">Kamera</h2>
                            <div className="relative">
                                <Icon icon="gridicons:video-camera" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9F9FA9] w-5 h-5" />
                                <select
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full p-3 pl-10 bg-[#27272A] text-sm text-white outline-none rounded-[6px] appearance-none"
                                >
                                    <option value="">Kamera Seçin</option>
                                    <option value="camera1">Kamera 1</option>
                                    <option value="camera2">Kamera 2</option>
                                </select>
                                <Icon icon="mdi:chevron-down" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9F9FA9] w-5 h-5" />
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-[#9F9FA9] text-sm mb-2">Mikrofon</h2>
                            <div className="relative">
                                <Icon icon="mynaui:microphone-solid" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#9F9FA9] w-5 h-5" />
                                <select
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-3 pl-10 bg-[#27272A] text-sm text-white outline-none rounded-[6px] appearance-none"
                                >
                                    <option value="">Mikrofon Seçin</option>
                                    <option value="mic1">Mikrofon 1</option>
                                    <option value="mic2">Mikrofon 2</option>
                                </select>
                                <Icon icon="mdi:chevron-down" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#9F9FA9] w-5 h-5" />
                            </div>
                        </div>
                    </div>
                );
            case "subscriptions":
                return (
                    <div className="p-6 h-full overflow-y-auto">
                        <div className='bg-[#27272A] w-full rounded-[6px] p-5'>
                            <div className='flex items-center gap-4 w-full'>
                                <div className='w-12 h-12 rounded-full flex items-center justify-center bg-[#3F3F47]'>
                                    <img src='/icons/diamond.svg' className='w-6 h-6' />
                                </div>

                                <div className='flex flex-col items-start'>
                                    <h1 className='text-base mb-0.5 font-bold'>Premium Plus</h1>
                                    <p className='text-xs font-medium'>Devam Eden Abonelik</p>
                                </div>
                            </div>

                            <div className='w-full h-px bg-[#3F3F47] my-6'></div>

                            <div className='flex flex-col items-start gap-4 w-full mb-6'>
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

                            <div className='flex items-center justify-between w-full'>
                                <button className='text-sm font-medium text-[#9F9FA9] cursor-pointer py-2'>Aboneliği Sonlandır</button>

                                <button className='bg-[#3F3F47] h-10 px-6 flex items-center justify-center gap-2 rounded-[6px] cursor-pointer text-sm'>
                                    <img src='/icons/diamond.svg' className='w-4 h-4' />
                                    Planı Yükselt
                                </button>
                            </div>
                        </div>
                    </div>
                );
            case "payments":
                return (
                    <div className="p-6 h-full overflow-y-auto space-y-5">

                        {Array.from({ length: 10 }).map((_, index) => (
                            <div key={index} className='flex items-center justify-between w-full'>
                                <div className='flex items-center gap-3'>
                                    <div className='bg-[#27272A] w-10 h-10 rounded-full flex items-center justify-center'>
                                        <img src='/icons/diamond.svg' className='w-4 h-4' />
                                    </div>

                                    <div className='flex flex-col items-start'>
                                        <h1 className='text-sm font-bold mb-0.5'>Elite Paket (1M)</h1>

                                        <span className='text-[#71717B] text-xs'>Başlangıç: 12.09.2025 - Bitiş : 12.10.2025</span>
                                    </div>
                                </div>

                                <div className='flex flex-col items-end justify-center'>
                                    <span className='text-base font-bold'>199,99 TL</span>

                                    <div className='flex items-center gap-1'>
                                        <span className='text-xs text-[#71717B]'>Bekleniyor</span>
                                        <Icon icon="basil:sand-watch-outline" className='text-[#FE9A00]' />
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                );
            case "history":
                return (
                    <div className="p-6 h-full grid grid-cols-2 gap-3 overflow-y-auto">
                        {Array.from({ length: 10 }).map((_, index) => (
                            <div key={index} className='w-full'>
                                <div className='relative'>
                                    <img src='/images/stream.png' className='w-full h-[150px] rounded-[6px] object-cover mb-2' />

                                    <button className='w-8 cursor-pointer h-8 rounded-[6px] flex items-center justify-center absolute top-2 right-2 bg-red-500'>
                                        <Icon icon="material-symbols:warning-rounded" className='text-white w-5 h-5' />
                                    </button>
                                </div>

                                <div className="flex items-center gap-1">
                                    <span className='text-sm font-bold'>user276327</span>
                                    <Icon icon="mdi:check-circle" className='text-blue-500 w-3 h-3' />
                                </div>

                                <div className='flex items-center gap-2'>
                                    <span className='text-xs text-[#71717B]'>12.09.2025, 23:43</span>
                                    <div className='bg-[#3F3F47] w-1 h-1 rounded-full'></div>
                                    <span className='text-xs text-[#71717B]'>7 dk, 45 sn</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            default:
                return (
                    <div className="p-6 h-full flex items-center justify-center">
                        <p className="text-[#9F9FA9]">Bu bölüm henüz tamamlanmadı</p>
                    </div>
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
                        className="bg-[#18181B] rounded-md w-[95%] max-w-4xl h-[80vh] max-h-[600px] border border-[#27272A] overflow-hidden"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center h-14 px-4 border-b border-[#27272A]">
                            <div className="flex items-center gap-2">
                                <img src="/images/logo.png" alt="Logo" className="h-6" />
                            </div>
                            <h2 className="text-white text-sm font-medium">Ayarlar</h2>
                            <button
                                onClick={onClose}
                                className="text-white cursor-pointer"
                            >
                                <Icon icon="mdi:close" className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex h-[calc(100%-60px)]">
                            {/* Sidebar */}
                            <div className="w-[300px] border-r border-[#27272A] h-full overflow-y-auto flex flex-col items-start justify-between">
                                <ul className='p-2 w-full'>
                                    {MenuItems.slice(0, -2).map((item) => (
                                        <li key={item.id} className="">
                                            <button
                                                className={`flex items-center w-full p-3 rounded-md text-left ${activeTab === item.id ? "bg-[#27272A]" : "hover:bg-[#27272A]/50"
                                                    }`}
                                                onClick={() => setActiveTab(item.id)}
                                            >
                                                <Icon icon={item.icon} className="w-5 h-5 text-white mr-3" />
                                                <span className={`text-sm font-bold flex-1 ${activeTab === item.id ? "text-white" : "text-[#9F9FA9]"}`}>
                                                    {item.label}
                                                </span>
                                                {item.hasSubmenu && (
                                                    <Icon icon="tabler:chevron-right" className="w-4 h-4 text-[#9F9FA9]" />
                                                )}
                                            </button>
                                        </li>
                                    ))}
                                </ul>

                                <ul className='p-2 w-full'>
                                    {MenuItems.slice(-2).map((item) => (
                                        <li key={item.id} className="">
                                            <button
                                                className={`flex items-center w-full p-3 rounded-md text-left ${activeTab === item.id ? "bg-[#27272A]" : "hover:bg-[#27272A]/50"
                                                    }`}
                                                onClick={() => setActiveTab(item.id)}
                                            >
                                                <Icon icon={item.icon} className="w-5 h-5 text-white mr-3" />
                                                <span className={`flex-1 ${activeTab === item.id ? "text-white" : "text-[#9F9FA9]"}`}>
                                                    {item.label}
                                                </span>
                                                {item.hasSubmenu && (
                                                    <Icon icon="tabler:chevron-right" className="w-4 h-4 text-[#9F9FA9]" />
                                                )}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Content Area */}
                            <div className="flex-1 h-full overflow-hidden">
                                {renderContent()}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProfileModal;