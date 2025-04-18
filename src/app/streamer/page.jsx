"use client";
import PremiumModal from '@/components/modal/PremiumModal';
import ProfileModal from '@/components/modal/ProfileModal';
import BlockedModal from '@/components/modal/stream/BlockedModal';
import DroppedModal from '@/components/modal/stream/DroppedModal';
import RequestGiftModal from '@/components/modal/stream/RequestGiftModal'
import RestrictMemberModal from '@/components/modal/stream/RestrictMemberModal';
import YourInvitedModal from '@/components/modal/stream/YourInvitedModal';
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect } from 'react'
import EmojiPicker from '@/components/ui/EmojiPicker';

const Page = () => {
    const [isSendGiftModalOpen, setIsSendGiftModalOpen] = useState(false);
    const [isYourInvitedModalOpen, setIsYourInvitedModalOpen] = useState(false);
    const [isBlockedModalOpen, setIsBlockedModalOpen] = useState(false);
    const [isDroppedModalOpen, setIsDroppedModalOpen] = useState(false);
    const [isRestrictMemberModalOpen, setIsRestrictMemberModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
    const [mode, setMode] = useState("user");
    const [isMobile, setIsMobile] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(true);

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

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        }
    };

    const fadeInVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { duration: 0.3 }
        }
    };

    return (
        <motion.div
            className='w-full h-screen bg-[#09090B] overflow-hidden p-2 sm:p-5 flex flex-col'
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Header */}
            <motion.div
                className='bg-[#18181B] w-full h-auto sm:h-16 rounded-[6px] flex flex-col sm:flex-row items-center justify-between p-3 mb-3'
                variants={itemVariants}
            >
                <div className='flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-start mb-3 sm:mb-0'>
                    <button className='w-10 h-10 flex items-center justify-center bg-[#27272A] rounded-[6px]' style={{
                        backdropFilter: "blur(10px)"
                    }}>
                        <motion.div whileHover={{ rotate: 90 }} transition={{ duration: 0.3 }}>
                            <Icon icon="ion:apps" className='w-4 h-4' />
                        </motion.div>
                    </button>

                    <img src='/images/logo.png' className='w-[100px] sm:w-[120px] h-auto sm:h-[25px]' />

                    {isMobile && (
                        <motion.button
                            className='w-10 h-10 rounded-[6px] bg-[#27272A] flex sm:hidden items-center justify-center'
                            onClick={() => setIsChatOpen(!isChatOpen)}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Icon icon={isChatOpen ? "mdi:close" : "mdi:message"} className='w-5 h-5' />
                        </motion.button>
                    )}
                </div>

                <div className='flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap justify-center w-full sm:w-auto'>
                    <motion.div
                        className='flex items-center justify-center bg-[#162456] rounded-[6px] h-10 px-3 sm:px-5 gap-2 sm:gap-3'
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <motion.span
                            onClick={() => setMode('streamer')}
                            className={`cursor-pointer text-xs sm:text-sm ${mode === 'streamer' ? 'text-white' : 'text-white/60'} font-bold transition-colors duration-300`}
                            whileHover={{ color: '#FFFFFF' }}
                        >
                            Yayıncı Modu
                        </motion.span>
                        <motion.span
                            onClick={() => setMode('user')}
                            className={`cursor-pointer text-xs sm:text-sm ${mode === 'user' ? 'text-white' : 'text-white/60'} font-bold transition-colors duration-300`}
                            whileHover={{ color: '#FFFFFF' }}
                        >
                            Kullanıcı Modu
                        </motion.span>
                    </motion.div>

                    <motion.button
                        onClick={() => setIsPremiumModalOpen(true)}
                        className='cursor-pointer flex items-center justify-center bg-[#162456] rounded-[6px] h-10 px-3 sm:px-5 gap-2'
                        whileHover={{ scale: 1.05, backgroundColor: '#1c2c6a' }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        <motion.img
                            src='/icons/diamond.svg'
                            className='w-4 h-4'
                            initial={{ rotate: 0 }}
                            whileHover={{ rotate: 20 }}
                            transition={{ duration: 0.3 }}
                        />
                        <span className='text-xs sm:text-sm text-white font-bold'>Premium Ol</span>
                    </motion.button>

                    <motion.button
                        onClick={() => setIsProfileModalOpen(true)}
                        className='cursor-pointer flex items-center h-10 rounded-[6px] bg-[#27272A] px-2 gap-2 sm:gap-3'
                        whileHover={{ backgroundColor: '#32323a' }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <motion.img
                            src='/images/ergin-bey.png'
                            className='h-8 w-8 rounded-[6px]'
                            whileHover={{ scale: 1.08 }}
                            transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        />
                        <span className='text-xs sm:text-sm font-bold'>user276327</span>
                        <motion.img
                            src='/icons/seal-check.svg'
                            className='w-4 h-4'
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                        />
                    </motion.button>

                    <motion.button
                        className='w-10 h-10 rounded-[6px] bg-[#27272A] flex items-center justify-center'
                        whileHover={{ backgroundColor: '#32323a', rotate: 30 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        <Icon icon="solar:moon-bold" className='w-5 h-5' />
                    </motion.button>
                </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
                className='flex-1 flex flex-col md:flex-row items-start justify-center w-full gap-3 min-h-0'
                variants={itemVariants}
            >
                {/* Stream */}
                <motion.div
                    className={`w-full md:flex-[0.75] h-full ${isMobile && isChatOpen ? 'hidden' : 'block'}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.img
                        src='/images/stream.png'
                        className='w-full h-full object-cover rounded-[6px]'
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                    />
                </motion.div>

                {/* Chat/User List */}
                <AnimatePresence>
                    {(!isMobile || (isMobile && isChatOpen)) && (
                        <motion.div
                            className='w-full md:flex-[0.25] h-full flex flex-col'
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {mode === 'streamer' ? (
                                <UserList
                                    setIsBlockedModalOpen={() => setIsBlockedModalOpen(true)}
                                    setIsDroppedModalOpen={() => setIsDroppedModalOpen(true)}
                                    setRestrictMemberModalOpen={() => setIsRestrictMemberModalOpen(true)}
                                />
                            ) : (
                                <div className="flex flex-col h-full">
                                    <UserHeader />
                                    <div className="flex-1 min-h-0">
                                        <Chat />
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Footer */}
            <motion.div
                className='w-full h-auto sm:h-[56px] flex flex-col sm:flex-row items-center justify-between mt-3 gap-3 sm:gap-0'
                variants={itemVariants}
            >
                <div className='flex items-center gap-2 w-full justify-center sm:justify-start sm:w-auto'>
                    <motion.div
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Icon icon="heroicons:users-16-solid" />
                    </motion.div>
                    <span className='text-xs sm:text-sm font-medium text-[#71717B]'>
                        <span className='font-bold mr-1'>18.000</span>
                        Yayın izleyicisi
                    </span>
                </div>

                <div className='flex items-center w-full sm:w-auto'>
                    <motion.button
                        className='cursor-pointer px-4 sm:px-12 bg-[#18181B] rounded-tl-[6px] rounded-bl-[6px] h-[56px] flex-1 sm:flex-initial flex items-center justify-center gap-2'
                        style={{ backdropFilter: "blur(50px)" }}
                        whileHover={{ backgroundColor: '#1f1f23' }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Icon icon="material-symbols:pause" className='w-5 h-5' />
                        <span className='text-xs sm:text-sm font-medium text-white/60'>Yayından Çık</span>
                    </motion.button>
                    <motion.button
                        onClick={() => { setIsSendGiftModalOpen(true) }}
                        className='cursor-pointer px-4 sm:px-12 bg-[#27272A] rounded-tr-[6px] rounded-br-[6px] h-[56px] flex-1 sm:flex-initial flex items-center justify-center gap-2'
                        style={{ backdropFilter: "blur(50px)" }}
                        whileHover={{ backgroundColor: '#32323a' }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <motion.div
                            animate={{ rotate: [0, 10, 0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        >
                            <Icon icon="lucide:gift" className='w-5 h-5' />
                        </motion.div>
                        <span className='text-xs sm:text-sm font-medium text-white/60'>Hediye Gönder</span>
                    </motion.button>
                </div>
            </motion.div>

            {/* Modals */}
            <RequestGiftModal isOpen={isSendGiftModalOpen} onClose={() => { setIsSendGiftModalOpen(false) }} />
            <YourInvitedModal isOpen={isYourInvitedModalOpen} onClose={() => { setIsYourInvitedModalOpen(false) }} />
            <BlockedModal isOpen={isBlockedModalOpen} onClose={() => { setIsBlockedModalOpen(false) }} />
            <DroppedModal isOpen={isDroppedModalOpen} onClose={() => { setIsDroppedModalOpen(false) }} />
            <RestrictMemberModal isOpen={isRestrictMemberModalOpen} onClose={() => { setIsRestrictMemberModalOpen(false) }} />
            <ProfileModal isOpen={isProfileModalOpen} onClose={() => { setIsProfileModalOpen(false) }} />
            <PremiumModal isOpen={isPremiumModalOpen} onClose={() => { setIsPremiumModalOpen(false) }} />
        </motion.div>
    )
}

export default Page

export const OtherMessage = ({ title = 'Diğer', message = 'Merhaba, nasılsın?' }) => {
    return (
        <motion.div
            className='flex items-end gap-3 w-max'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <img src='/images/girl.png' className='w-5 h-5 rounded-full' />

            <div className='flex flex-col items-start bg-[#27272A] p-3 rounded-[12px]' style={{
                backdropFilter: "blur(50px)"
            }}>

                <span className='text-[#2B7FFF] mb-0.5 text-xs font-medium'>{title}</span>
                <span className='text-white text-sm font-normal'>{message}</span>

            </div>
        </motion.div>
    )
}

export const UserHeader = () => {
    return (
        <motion.div
            className='mb-3 bg-[#18181B] w-full h-auto sm:h-16 rounded-[6px] border border-[#27272A] flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 gap-2 sm:gap-0'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className='flex items-center gap-3 w-full sm:w-auto'>
                <img src='/images/girl.png' className='w-10 h-10 rounded-[6px]' />
                <div className='flex flex-col items-start gap-1'>
                    <h1 className='text-sm font-bold whitespace-nowrap'>Anna Lola Ya...</h1>
                    <div className='flex items-center gap-3 flex-wrap'>
                        <div className='flex items-center gap-1'>
                            <img src='/icons/monaco.svg' className='w-4 h-4' />
                            <span className='text-xs sm:text-sm font-normal'>Monaco</span>
                        </div>

                        <div className='flex items-center gap-1'>
                            <Icon icon="tdesign:gender-male" className='w-4 h-4' />
                            <span className='text-xs sm:text-sm font-normal'>Monaco</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-2 self-end sm:self-auto'>
                <button className='w-10 h-10 rounded-[6px] bg-[#27272A] flex items-center justify-center'>
                    <Icon icon="material-symbols:warning-rounded" className='w-5 h-5' />
                </button>

                <button className='h-10 px-4 shrink-0 rounded-[6px] bg-[#27272A] flex items-center justify-center gap-2'>
                    <Icon icon="mage:user-plus" className='w-5 h-5' />
                    <span className='text-sm font-medium'>Takip Et</span>
                </button>
            </div>
        </motion.div>
    )
}

export const GiftMessage = ({ title = 'Diğer', message = 'Merhaba, nasılsın?' }) => {
    return (
        <div className='w-full bg-[#27272A] border border-[#3F3F47] rounded-[10px] px-4 py-3 flex items-center justify-between gap-3'
            style={{
                boxShadow: "0px 6px 31.8px 0px #18181B"
            }}
        >
            <div className='flex items-center gap-3'>
                <img src='/images/gifts/1.png' className='w-[56px] h-[56px] rounded-full' />

                <div className='bg-[#3F3F47] w-px h-[90%]'></div>

                <div className='flex flex-col items-start'>
                    <h1 className='text-sm font-medium mb-1'>Yayıncı</h1>
                    <p className='text-sm font-medium text-white/60'>hediye istiyor</p>
                </div>
            </div>

            <button className='bg-[#52525C] h-8 text-sm font-medium text-white/80 cursor-pointer flex items-center justify-center rounded-[6px] px-3'>
                Hediye Gönder
            </button>

        </div >
    )
}
export const MyMessage = ({ title = 'Ben', message = 'Merhaba, nasılsın?' }) => {
    return (
        <div className='flex flex-col w-max ml-auto items-start bg-[#3F3F47] p-3 rounded-[12px]'>

            <span className='text-white text-sm font-normal'>{message}</span>

        </div>
    )
}

export const Chat = () => {
    const [message, setMessage] = React.useState('');
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = React.useState(false);
    const chatContainerRef = React.useRef(null);

    const handleEmojiSelect = (emoji) => {
        setMessage(prev => prev + emoji);
        setIsEmojiPickerOpen(false);
    };

    const handleSendMessage = () => {
        if (message.trim() === '') return;
        // Here you would handle sending the message
        console.log('Sending message:', message);
        setMessage('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Scroll to bottom of chat when messages change
    React.useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, []);

    return (
        <div className="bg-[#18181B] rounded-[6px] w-full flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-[#52525B] scrollbar-track-transparent" ref={chatContainerRef}>
                <GiftMessage />
                <OtherMessage title="user123" message="Hey, nasıl gidiyor?" />
                <MyMessage message="İyiyim, sen nasılsın?" />
                <OtherMessage title="user456" message="Harika! Yeni bir şeyler öğreniyorum." />
                <GiftMessage />
                <OtherMessage title="user456" message="Harika! Yeni bir şeyler öğreniyorum." />
                <OtherMessage title="user456" message="Harika! Yeni bir şeyler öğreniyorum." />

                <div className="flex items-center gap-2">
                    <Icon icon="weui:more-filled" className="text-white/60 w-5 h-5" />
                    <span className="text-sm font-medium text-white/60">Yazıyor...</span>
                </div>
            </div>

            <div className="p-4 border-t border-[#27272A]">
                <div className="h-12 w-full rounded-[6px] bg-[#27272A] flex items-center justify-center gap-2 px-3 relative" style={{
                    backdropFilter: "blur(50px)"
                }}>
                    <div className="relative flex items-center justify-center">
                        <motion.button
                            onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="outline-none cursor-pointer"
                        >
                            <Icon icon="mdi:emoji" className="w-6 h-6 mr-2 text-[#9F9FA9] hover:text-white transition-colors" />
                        </motion.button>

                        {/* Emoji Picker */}
                        <EmojiPicker
                            isOpen={isEmojiPickerOpen}
                            onClose={() => setIsEmojiPickerOpen(false)}
                            onEmojiSelect={handleEmojiSelect}
                        />
                    </div>

                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="w-full h-full bg-transparent outline-none text-white/60 text-sm font-medium"
                        placeholder="Mesaj yaz..."
                    />

                    <div className="border-l border-white/10 h-[60%]"></div>

                    <motion.button
                        className="w-10 h-10 rounded-[6px] bg-[#27272A] flex items-center justify-center"
                        onClick={handleSendMessage}
                        whileHover={{ scale: 1.05, backgroundColor: "#32323A" }}
                        whileTap={{ scale: 0.95 }}
                        disabled={!message.trim()}
                    >
                        <Icon icon="carbon:send-filled" className={`w-5 h-5 ${message.trim() ? 'text-blue-500' : 'text-[#71717B]'}`} />
                    </motion.button>
                </div>
            </div>
        </div>
    )
}

const UserList = ({ setIsBlockedModalOpen, setIsDroppedModalOpen, setRestrictMemberModalOpen }) => {
    return (
        <div className='bg-[#18181B] border border-[#27272A] rounded-[6px] w-full h-full flex flex-col overflow-hidden'>
            <div className='px-3 pt-6 pb-3'>
                <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center gap-3'>
                        <h1 className='text-sm font-bold'>Kullanıcı Listesi</h1>
                        <span className='text-[#9F9FA9] text-sm font-normal'>324 Kişi</span>
                    </div>
                    <Icon icon="mdi:close" className='w-5 h-5 text-white/60' />
                </div>

                <div className='w-full h-px bg-[#27272A] my-4'></div>

                <div className='bg-[#27272A] border border-[#3F3F47] h-10 rounded-[6px] w-full flex items-center gap-2 px-3 mb-6'>
                    <Icon icon="mdi:magnify" className='w-6 h-6 text-white/60' />
                    <input type="text" className='w-full h-full bg-transparent outline-none text-white/60 text-sm font-medium' placeholder='Kullanıcı Ara...' />
                </div>
            </div>

            <div className='flex-1 overflow-y-auto px-3 pb-3 scrollbar-thin scrollbar-thumb-[#52525B] scrollbar-track-transparent'>
                <div className='flex flex-col items-start gap-2'>
                    <StreamUser setIsBlockedModalOpen={setIsBlockedModalOpen} setIsDroppedModalOpen={setIsDroppedModalOpen} setRestrictMemberModalOpen={setRestrictMemberModalOpen} />
                    <StreamUser setIsBlockedModalOpen={setIsBlockedModalOpen} setIsDroppedModalOpen={setIsDroppedModalOpen} setRestrictMemberModalOpen={setRestrictMemberModalOpen} />
                    <StreamUser setIsBlockedModalOpen={setIsBlockedModalOpen} setIsDroppedModalOpen={setIsDroppedModalOpen} setRestrictMemberModalOpen={setRestrictMemberModalOpen} />
                    <StreamUser setIsBlockedModalOpen={setIsBlockedModalOpen} setIsDroppedModalOpen={setIsDroppedModalOpen} setRestrictMemberModalOpen={setRestrictMemberModalOpen} />
                    <StreamUser setIsBlockedModalOpen={setIsBlockedModalOpen} setIsDroppedModalOpen={setIsDroppedModalOpen} setRestrictMemberModalOpen={setRestrictMemberModalOpen} />
                    <StreamUser setIsBlockedModalOpen={setIsBlockedModalOpen} setIsDroppedModalOpen={setIsDroppedModalOpen} setRestrictMemberModalOpen={setRestrictMemberModalOpen} />
                    <StreamUser setIsBlockedModalOpen={setIsBlockedModalOpen} setIsDroppedModalOpen={setIsDroppedModalOpen} setRestrictMemberModalOpen={setRestrictMemberModalOpen} />
                    <StreamUser setIsBlockedModalOpen={setIsBlockedModalOpen} setIsDroppedModalOpen={setIsDroppedModalOpen} setRestrictMemberModalOpen={setRestrictMemberModalOpen} />
                </div>
            </div>
        </div>
    )
}

const StreamUser = ({ setIsBlockedModalOpen, setIsDroppedModalOpen, setRestrictMemberModalOpen }) => {
    return (
        <div className='bg-[#18181B] w-full h-16 rounded-[6px] flex items-center justify-between p-3'>
            <div className='flex items-center gap-3'>
                <img src='/images/girl.png' className='w-10 h-10 rounded-[6px]' />
                <div className='flex flex-col items-start gap-1'>
                    <h1 className='text-sm font-bold whitespace-nowrap'>Anna Lola Ya...</h1>
                    <div className='flex items-center gap-3'>
                        <div className='flex items-center gap-1'>
                            <img src='/icons/monaco.svg' className='w-3 h-3' />
                            <span className='text-sm font-normal'>Monaco</span>
                        </div>

                        <div className='flex items-center gap-1'>
                            <Icon icon="tdesign:gender-male" className='w-4 h-4' />
                            <span className='text-sm font-normal'>Monaco</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-2'>
                <button onClick={() => setRestrictMemberModalOpen(true)} className='cursor-pointer w-10 h-10 rounded-[6px] bg-[#3F3F47] flex items-center justify-center'>
                    <Icon icon="material-symbols:warning-rounded" className='w-6 h-6' />
                </button>
                <button onClick={() => setIsBlockedModalOpen(true)} className='cursor-pointer w-10 h-10 rounded-[6px] bg-[#27272A] flex items-center justify-center'>
                    <Icon icon="material-symbols:warning-rounded" className='w-5 h-5' />
                </button>

                <button onClick={() => setIsDroppedModalOpen(true)} className='cursor-pointer h-10 w-10 shrink-0 rounded-[6px] bg-[#27272A] flex items-center justify-center'>
                    <Icon icon="stash:signout-alt-duotone" className='w-7 h-7' />
                </button>
            </div>
        </div>
    )
}