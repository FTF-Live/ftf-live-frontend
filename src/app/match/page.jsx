"use client";
import PremiumModal from '@/components/modal/PremiumModal';
import ProfileModal from '@/components/modal/ProfileModal';
import BlockedModal from '@/components/modal/stream/BlockedModal';
import DroppedModal from '@/components/modal/stream/DroppedModal';
import RequestGiftModal from '@/components/modal/stream/RequestGiftModal';
import RestrictMemberModal from '@/components/modal/stream/RestrictMemberModal';
import YourInvitedModal from '@/components/modal/stream/YourInvitedModal';
import LoginModal from '@/components/modal/LoginModal';
import { Icon } from '@iconify/react'
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState, useEffect, useRef } from 'react'
import EmojiPicker from '@/components/ui/EmojiPicker';
import GenderFilterModal from '@/components/ui/GenderFilterModal';

const Page = () => {
    const [isSendGiftModalOpen, setIsSendGiftModalOpen] = useState(false);
    const [isYourInvitedModalOpen, setIsYourInvitedModalOpen] = useState(false);
    const [isBlockedModalOpen, setIsBlockedModalOpen] = useState(false);
    const [isDroppedModalOpen, setIsDroppedModalOpen] = useState(false);
    const [isRestrictMemberModalOpen, setIsRestrictMemberModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [mode, setMode] = useState("user");
    const [isMobile, setIsMobile] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(true);
    const [hasMatches, setHasMatches] = useState(false);
    const [activeMatch, setActiveMatch] = useState(null);
    const [viewMode, setViewMode] = useState("standard"); // "standard" or "grid"
    const [conversations, setConversations] = useState({});
    const [message, setMessage] = useState('');
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const chatContainerRef = React.useRef(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionDirection, setTransitionDirection] = useState("next"); // "next", "exit", "start"
    const [isGenderFilterOpen, setIsGenderFilterOpen] = useState(false);
    const [selectedGender, setSelectedGender] = useState("all");
    const genderFilterButtonRef = useRef(null);

    // Mock users data
    const mockUsers = [
        {
            id: 1,
            name: "Anna Lola",
            avatar: "/images/girl.png",
            country: "Monaco",
            gender: "female",
            isVerified: true,
            isOnline: true
        },
        {
            id: 2,
            name: "Emily Parker",
            avatar: "/images/girl.png",
            country: "France",
            gender: "female",
            isVerified: false,
            isOnline: true
        },
        {
            id: 3,
            name: "Alex Johnson",
            avatar: "/images/ergin-bey.png",
            country: "Italy",
            gender: "male",
            isVerified: true,
            isOnline: false
        }
    ];

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

    // Setup mock conversations
    useEffect(() => {
        // Initialize empty conversations
        const initialConversations = {};
        mockUsers.forEach(user => {
            initialConversations[user.id] = [];
        });
        setConversations(initialConversations);
    }, []);

    const handleEmojiSelect = (emoji) => {
        setMessage(prev => prev + emoji);
        setIsEmojiPickerOpen(false);
    };

    const handleSendMessage = () => {
        if (!message.trim() || !activeMatch) return;

        // Add message to conversation
        const updatedConversations = { ...conversations };
        updatedConversations[activeMatch] = [
            ...updatedConversations[activeMatch],
            {
                id: Date.now(),
                sender: 'user',
                text: message,
                timestamp: new Date().toISOString()
            }
        ];

        setConversations(updatedConversations);
        setMessage('');

        // Simulate reply after 1-3 seconds
        const replyTime = 1000 + Math.random() * 2000;
        setTimeout(() => {
            const matchedUser = mockUsers.find(user => user.id === activeMatch);
            const replies = [
                "Merhaba, nasılsın?",
                "Teşekkür ederim!",
                "Harika! Yeni bir şeyler öğreniyorum.",
                "Bugün hava çok güzel, değil mi?",
                "Ne zaman görüşebiliriz?",
                "İlginç bir fikir!"
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];

            const updatedConvs = { ...conversations };
            updatedConvs[activeMatch] = [
                ...updatedConvs[activeMatch],
                {
                    id: Date.now(),
                    sender: 'match',
                    text: randomReply,
                    timestamp: new Date().toISOString()
                }
            ];

            setConversations(updatedConvs);
        }, replyTime);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    // Scroll to bottom of chat when messages change
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [conversations, activeMatch]);

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

    const handleLoginClick = () => {
        setIsLoginModalOpen(true);
    };

    const handleLogin = (provider) => {
        console.log(`Logging in with ${provider}`);
        // Implement actual login logic here
        setIsLoginModalOpen(false);
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
                    <motion.button
                        onClick={handleLoginClick}
                        className='cursor-pointer flex items-center justify-center bg-[#162456] rounded-[6px] h-10 px-3 sm:px-5 gap-2'
                        whileHover={{ scale: 1.05, backgroundColor: '#1c2c6a' }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    >
                        <span className='text-xs sm:text-sm text-white font-bold'>Giriş Yap</span>
                    </motion.button>
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
                {/* Left side - Camera Area */}
                <motion.div
                    className={`w-full md:flex-[0.7] h-full bg-[#18181B] rounded-[6px] relative`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {isTransitioning ? (
                        // Transition animations
                        <motion.div
                            className="w-full h-full flex items-center justify-center"
                            initial={{ opacity: 1 }}
                            animate={
                                transitionDirection === "exit"
                                    ? { opacity: 0, scale: 0.8, y: 20 }
                                    : transitionDirection === "next"
                                        ? { opacity: 1 }
                                        : { scale: [0.9, 1], opacity: [0, 1] }
                            }
                            transition={{ duration: 0.5 }}
                        >
                            {transitionDirection === "start" ? (
                                <motion.div
                                    animate={{
                                        rotate: 360,
                                        scale: [1, 1.2, 1]
                                    }}
                                    transition={{
                                        rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
                                        scale: { duration: 0.8, repeat: Infinity, repeatType: "reverse" }
                                    }}
                                >
                                    <Icon icon="svg-spinners:180-ring" className="w-16 h-16 text-[#3F3F47]" />
                                </motion.div>
                            ) : transitionDirection === "next" ? (
                                <motion.div
                                    className="relative w-full h-full"
                                >
                                    {/* Outgoing image - fades out with a slight zoom */}
                                    <motion.div
                                        className="absolute inset-0"
                                        initial={{ opacity: 1, scale: 1 }}
                                        animate={{ opacity: 0, scale: 1.1 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <img
                                            src='/images/stream.png'
                                            className='w-full h-full object-cover rounded-[6px]'
                                        />
                                    </motion.div>

                                    {/* Incoming image - fades in with a slight zoom */}
                                    <motion.div
                                        className="absolute inset-0"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: 0.1 }}
                                    >
                                        <img
                                            src='/images/girl.png'
                                            className='w-full h-full object-cover rounded-[6px]'
                                        />
                                    </motion.div>

                                    {/* Transition flash effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-[#3F3F47]"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: [0, 0.15, 0] }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </motion.div>
                            ) : (
                                <motion.div
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <img
                                        src='/images/stream.png'
                                        className='w-full h-full object-cover rounded-[6px] opacity-50'
                                    />
                                </motion.div>
                            )}
                        </motion.div>
                    ) : hasMatches ? (
                        <AnimatePresence mode="wait">
                            {viewMode === "standard" ? (
                                <motion.div
                                    key="standard-view"
                                    className="w-full h-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <img
                                        src='/images/stream.png'
                                        className='w-full h-full object-cover rounded-[6px]'
                                    />
                                    {/* Camera preview in standard view */}
                                    <motion.div
                                        className="absolute bottom-4 left-4 w-[160px] h-[112px] overflow-hidden rounded-lg border-2 border-[#27272A]"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.2, duration: 0.3 }}
                                    >
                                        <img
                                            src="/images/ergin-bey.png"
                                            alt="Your profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </motion.div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="grid-view"
                                    className="grid grid-cols-2 gap-3 h-full"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <motion.div
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <img
                                            src='/images/stream.png'
                                            className='w-full h-full object-cover rounded-[6px]'
                                        />
                                    </motion.div>
                                    <motion.div
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                    >
                                        <img
                                            src='/images/girl.png'
                                            className='w-full h-full object-cover rounded-[6px]'
                                        />
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    ) : (
                        // Empty state with only user's camera
                        <motion.div
                            className="absolute bottom-4 left-4 w-[160px] h-[112px] overflow-hidden rounded-lg border-2 border-[#27272A]"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <img
                                src="/images/ergin-bey.png"
                                alt="Your profile"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    )}
                </motion.div>

                {/* Right Side - Chat/User List */}
                <motion.div
                    className='w-full md:flex-[0.3] h-full flex flex-col gap-3'
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {/* Header section - always visible */}
                    <motion.div
                        className='bg-[#18181B] rounded-[6px] h-[72px] w-full border border-[#27272A]'
                        variants={itemVariants}
                    >
                        {hasMatches && activeMatch && (
                            <UserHeader
                                user={mockUsers.find(user => user.id === activeMatch)}
                                onBack={() => setActiveMatch(null)}
                            />
                        )}
                    </motion.div>

                    {/* Content section */}
                    <motion.div
                        className='bg-[#18181B] rounded-[6px] flex-1 w-full border border-[#27272A]'
                        variants={itemVariants}
                    >
                        {hasMatches ? (
                            activeMatch ? (
                                <ChatWindow
                                    messages={conversations[activeMatch] || []}
                                    chatContainerRef={chatContainerRef}
                                    message={message}
                                    setMessage={setMessage}
                                    handleSendMessage={handleSendMessage}
                                    handleKeyPress={handleKeyPress}
                                    isEmojiPickerOpen={isEmojiPickerOpen}
                                    setIsEmojiPickerOpen={setIsEmojiPickerOpen}
                                    handleEmojiSelect={handleEmojiSelect}
                                />
                            ) : (
                                <UserList
                                    users={mockUsers}
                                    onSelectUser={(userId) => {
                                        setActiveMatch(userId);
                                    }}
                                />
                            )
                        ) : (
                            // Empty state for content area
                            <div></div>
                        )}
                    </motion.div>
                </motion.div>
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

                <div className='flex items-center w-full sm:w-auto gap-3'>
                    <motion.button
                        className='cursor-pointer px-4 sm:px-12 bg-[#18181B] rounded-[6px] h-[56px] flex-1 sm:flex-initial flex items-center justify-center gap-2 border border-[#27272A]'
                        style={{ backdropFilter: "blur(50px)" }}
                        whileHover={{ backgroundColor: '#1f1f23' }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setViewMode(viewMode === "standard" ? "grid" : "standard")}
                    >
                        <Icon icon="material-symbols:dashboard-rounded" className='w-5 h-5' />
                        <span className='text-xs sm:text-sm font-medium text-white'>Görünümü Değiştir</span>
                    </motion.button>

                    <motion.div className="relative">
                        <motion.button
                            className='cursor-pointer px-4 sm:px-12 bg-[#18181B] rounded-[6px] h-[56px] flex-1 sm:flex-initial flex items-center justify-center gap-2 border border-[#27272A]'
                            style={{ backdropFilter: "blur(50px)" }}
                            whileHover={{ backgroundColor: '#1f1f23' }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setIsGenderFilterOpen(!isGenderFilterOpen)}
                            ref={genderFilterButtonRef}
                        >
                            <Icon icon="lets-icons:filter-big" className='w-5 h-5' />
                            <span className='text-xs sm:text-sm font-medium text-white'>Cinsiyet Filtrele</span>
                            <img src='/icons/diamond.svg' className='w-4 h-4' />
                        </motion.button>

                        <GenderFilterModal
                            isOpen={isGenderFilterOpen}
                            onClose={() => setIsGenderFilterOpen(false)}
                            selectedGender={selectedGender}
                            buttonRef={genderFilterButtonRef}
                            onSelect={(gender) => {
                                setSelectedGender(gender);
                                console.log("Selected gender filter:", gender);
                                // In a real app, you would filter the users based on the selected gender
                            }}
                        />
                    </motion.div>

                    {hasMatches ? (
                        <div className='flex items-center'>
                            <motion.button
                                className='cursor-pointer min-w-[194px] bg-[#18181B] rounded-tl-[6px] rounded-bl-[6px] h-[56px] flex-1 sm:flex-initial flex items-center justify-center gap-2'
                                style={{ backdropFilter: "blur(50px)" }}
                                whileHover={{ backgroundColor: '#1f1f23' }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    setTransitionDirection("exit");
                                    setIsTransitioning(true);

                                    // Delay the actual state change to allow animation to play
                                    setTimeout(() => {
                                        setActiveMatch(null);
                                        setHasMatches(false);
                                        setIsTransitioning(false);
                                    }, 600);
                                }}
                            >
                                <Icon icon="material-symbols:pause" className='w-5 h-5' />
                                <span className='text-xs sm:text-sm font-medium text-white/60'>Yayından Çık</span>
                            </motion.button>
                            <motion.button
                                onClick={() => {
                                    if (mockUsers.length > 0) {
                                        // Show loading spinner instead of immediately transitioning
                                        setTransitionDirection("start");
                                        setIsTransitioning(true);

                                        // After a brief loading period, start the actual transition
                                        setTimeout(() => {
                                            setTransitionDirection("next");

                                            // Delay the actual user change to allow animation to play
                                            setTimeout(() => {
                                                // Select a different random user
                                                let randomIndex;
                                                do {
                                                    randomIndex = Math.floor(Math.random() * mockUsers.length);
                                                } while (mockUsers[randomIndex].id === activeMatch && mockUsers.length > 1);

                                                setActiveMatch(mockUsers[randomIndex].id);
                                                setIsTransitioning(false);
                                            }, 400);
                                        }, 800); // Show loading for 800ms before transitioning
                                    }
                                }}
                                className='cursor-pointer min-w-[194px] bg-[#27272A] rounded-tr-[6px] rounded-br-[6px] h-[56px] flex-1 sm:flex-initial flex items-center justify-center gap-2'
                                style={{ backdropFilter: "blur(50px)" }}
                                whileHover={{ backgroundColor: '#32323a' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    <Icon icon="tabler:arrows-shuffle" className='w-5 h-5' />
                                </motion.div>
                                <span className='text-xs sm:text-sm font-medium text-white/60'>İleri</span>
                            </motion.button>
                        </div>
                    ) : (
                        <motion.button
                            onClick={() => {
                                if (mockUsers.length > 0) {
                                    setTransitionDirection("start");
                                    setIsTransitioning(true);

                                    // Delay the actual match to allow animation to play
                                    setTimeout(() => {
                                        // Select a random user
                                        const randomIndex = Math.floor(Math.random() * mockUsers.length);
                                        setActiveMatch(mockUsers[randomIndex].id);
                                        setHasMatches(true);
                                        setIsTransitioning(false);
                                    }, 600);
                                }
                            }}
                            className='cursor-pointer px-4 sm:px-12 bg-[#27272A] rounded-[6px] min-w-[388px] h-[56px] flex-1 sm:flex-initial flex items-center justify-center gap-3'
                            style={{ backdropFilter: "blur(50px)" }}
                            whileHover={{ backgroundColor: '#32323a' }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <motion.div
                                animate={{ rotate: [0, 10, 0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <Icon icon="tabler:arrows-shuffle" className='w-5 h-5' />
                            </motion.div>
                            <span className='text-xs sm:text-sm font-medium text-white'>Hemen Eşleş</span>
                        </motion.button>
                    )}
                </div>
            </motion.div>
            {/* Modals */}
            <RequestGiftModal 
                isOpen={isSendGiftModalOpen} 
                onClose={() => { setIsSendGiftModalOpen(false) }} 
                memberName={mockUsers.find(user => user.id === activeMatch)?.name}
                memberAvatar={mockUsers.find(user => user.id === activeMatch)?.avatar}
            />
            <YourInvitedModal isOpen={isYourInvitedModalOpen} onClose={() => { setIsYourInvitedModalOpen(false) }} />
            <BlockedModal isOpen={isBlockedModalOpen} onClose={() => { setIsBlockedModalOpen(false) }} />
            <DroppedModal isOpen={isDroppedModalOpen} onClose={() => { setIsDroppedModalOpen(false) }} />
            <RestrictMemberModal 
                isOpen={isRestrictMemberModalOpen} 
                onClose={() => setIsRestrictMemberModalOpen(false)} 
                memberName={mockUsers.find(user => user.id === activeMatch)?.name}
                memberAvatar={mockUsers.find(user => user.id === activeMatch)?.avatar}
                onRestrict={(data) => {
                    console.log('Reported:', data);
                    setIsRestrictMemberModalOpen(false);
                }}
            />
            <ProfileModal isOpen={isProfileModalOpen} onClose={() => { setIsProfileModalOpen(false) }} />
            <PremiumModal isOpen={isPremiumModalOpen} onClose={() => { setIsPremiumModalOpen(false) }} />
            <LoginModal 
                isOpen={isLoginModalOpen} 
                onClose={() => setIsLoginModalOpen(false)} 
                onLogin={handleLogin}
            />
        </motion.div>
    )
}

export default Page

const UserHeader = ({ user, onBack }) => {
    const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);
    const [isRestrictModalOpen, setIsRestrictModalOpen] = useState(false);

    return (
        <motion.div
            className='mb-3 bg-[#18181B] w-full h-auto rounded-[6px] border border-[#27272A] flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 gap-2 sm:gap-0'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className='flex items-center gap-3 w-full sm:w-auto'>
                <img src={user?.avatar || '/images/girl.png'} className='w-10 h-10 rounded-[6px]' />
                <div className='flex flex-col items-start gap-1'>
                    <div className="flex items-center">
                        <h1 className='text-sm font-bold whitespace-nowrap mr-1'>{user?.name || "Kullanıcı"}</h1>
                        {user?.isOnline && (
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        )}
                    </div>
                    <div className='flex items-center gap-3 flex-wrap'>
                        <div className='flex items-center gap-1'>
                            <img src='/icons/monaco.svg' className='w-4 h-4' />
                            <span className='text-xs sm:text-sm font-normal'>{user?.country || "Monaco"}</span>
                        </div>

                        <div className='flex items-center gap-1'>
                            <Icon icon={user?.gender === "female" ? "tdesign:gender-female" : "tdesign:gender-male"} className='w-4 h-4' />
                            <span className='text-xs sm:text-sm font-normal'>{user?.gender === "female" ? "Kadın" : "Erkek"}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex items-center gap-2 self-end sm:self-auto'>
                <button
                    className='w-10 h-10 rounded-[6px] bg-[#27272A] flex items-center justify-center'
                    onClick={() => setIsRestrictModalOpen(true)}
                >
                    <Icon icon="material-symbols:warning-rounded" className='w-5 h-5' />
                </button>

                <button
                    className='h-10 px-4 shrink-0 rounded-[6px] bg-[#27272A] flex items-center justify-center gap-2'
                    onClick={() => setIsGiftModalOpen(true)}
                >
                    <Icon icon="lucide:gift" className='w-5 h-5' />
                </button>
            </div>

            {/* Gift Modal */}
            <RequestGiftModal
                isOpen={isGiftModalOpen}
                onClose={() => setIsGiftModalOpen(false)}
                user={user}
            />

            {/* Restrict/Report Modal */}
            <RestrictMemberModal
                isOpen={isRestrictModalOpen}
                onClose={() => setIsRestrictModalOpen(false)}
                memberName={user?.name || "Kullanıcı"}
                memberAvatar={user?.avatar || '/images/girl.png'}
                onRestrict={(data) => {
                    console.log("User reported:", data);
                    // Here you would handle the report/restriction action
                }}
            />
        </motion.div>
    )
}

const Message = ({ message, isOwn }) => {
    if (isOwn) {
        return (
            <div className='flex flex-col w-max ml-auto items-start bg-[#3F3F47] p-3 rounded-[12px]'>
                <span className='text-white text-sm font-normal'>{message.text}</span>
            </div>
        )
    }

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
                <span className='text-[#2B7FFF] mb-0.5 text-xs font-medium'>Diğer</span>
                <span className='text-white text-sm font-normal'>{message.text}</span>
            </div>
        </motion.div>
    )
}

const ChatWindow = ({
    messages,
    chatContainerRef,
    message,
    setMessage,
    handleSendMessage,
    handleKeyPress,
    isEmojiPickerOpen,
    setIsEmojiPickerOpen,
    handleEmojiSelect
}) => {
    return (
        <div className="bg-[#18181B] rounded-[6px] w-full flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-[#52525B] scrollbar-track-transparent" ref={chatContainerRef}>
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-4">
                        <div className='bg-[#27272A] w-20 h-20 rounded-[6px] flex items-center justify-center mb-4'>
                            <img src='/icons/message.svg' className='w-10 h-10 text-[#3F3F47]' />
                        </div>
                        <h3 className="text-base font-medium text-white mb-2">Mesajlaşmaya Başlayın</h3>
                    </div>
                ) : (
                    messages.map((msg, index) => (
                        <Message
                            key={msg.id}
                            message={msg}
                            isOwn={msg.sender === 'user'}
                        />
                    ))
                )}
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

const UserList = ({ users, onSelectUser }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='bg-[#18181B] border border-[#27272A] rounded-[6px] w-full h-full flex flex-col overflow-hidden'>
            <div className='px-3 pt-6 pb-3'>
                <div className='flex items-center justify-between w-full'>
                    <div className='flex items-center gap-3'>
                        <h1 className='text-sm font-bold'>Kullanıcı Listesi</h1>
                        <span className='text-[#9F9FA9] text-sm font-normal'>{users.length} Kişi</span>
                    </div>
                </div>

                <div className='w-full h-px bg-[#27272A] my-4'></div>

                <div className='bg-[#27272A] border border-[#3F3F47] h-10 rounded-[6px] w-full flex items-center gap-2 px-3 mb-6'>
                    <Icon icon="mdi:magnify" className='w-6 h-6 text-white/60' />
                    <input
                        type="text"
                        className='w-full h-full bg-transparent outline-none text-white/60 text-sm font-medium'
                        placeholder='Kullanıcı Ara...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className='flex-1 overflow-y-auto px-3 pb-3 scrollbar-thin scrollbar-thumb-[#52525B] scrollbar-track-transparent'>
                <div className='flex flex-col items-start gap-2'>
                    {filteredUsers.length > 0 ? (
                        filteredUsers.map(user => (
                            <UserItem
                                key={user.id}
                                user={user}
                                onClick={() => onSelectUser(user.id)}
                            />
                        ))
                    ) : (
                        <div className="w-full p-4 flex flex-col items-center justify-center text-center">
                            <Icon icon="mdi:account-search-outline" className="w-16 h-16 text-[#3F3F47] mb-4" />
                            <h3 className="text-white font-medium">Kullanıcı Bulunamadı</h3>
                            <p className="text-sm text-[#A1A1AA] mt-2">Arama kriterlerinize uygun kullanıcı yok.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

const UserItem = ({ user, onClick }) => {
    return (
        <motion.div
            className='bg-[#18181B] w-full rounded-[6px] flex items-center justify-between p-3 cursor-pointer hover:bg-[#27272A] transition-colors duration-200'
            onClick={onClick}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            <div className='flex items-center gap-3'>
                <div className="relative">
                    <img src={user.avatar} className='w-10 h-10 rounded-[6px]' />
                    {user.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#18181B]"></div>
                    )}
                </div>
                <div className='flex flex-col items-start gap-1'>
                    <div className="flex items-center">
                        <h1 className='text-sm font-bold whitespace-nowrap mr-1'>{user.name}</h1>
                        {user.isVerified && (
                            <img src='/icons/seal-check.svg' className='w-3.5 h-3.5' />
                        )}
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='flex items-center gap-1'>
                            <img src='/icons/monaco.svg' className='w-3 h-3' />
                            <span className='text-sm font-normal'>{user.country}</span>
                        </div>

                        <div className='flex items-center gap-1'>
                            <Icon icon={user.gender === "female" ? "tdesign:gender-female" : "tdesign:gender-male"} className='w-4 h-4' />
                            <span className='text-sm font-normal'>{user.gender === "female" ? "Kadın" : "Erkek"}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex items-center'>
                <Icon icon="material-symbols:chevron-right-rounded" className="text-[#9F9FA9] w-6 h-6" />
            </div>
        </motion.div>
    )
}