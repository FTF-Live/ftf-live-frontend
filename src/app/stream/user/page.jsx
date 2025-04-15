"use client";
import PremiumModal from '@/components/modal/PremiumModal';
import ProfileModal from '@/components/modal/ProfileModal';
import BlockedModal from '@/components/modal/stream/BlockedModal';
import DroppedModal from '@/components/modal/stream/DroppedModal';
import RequestGiftModal from '@/components/modal/stream/RequestGiftModal'
import RestrictMemberModal from '@/components/modal/stream/RestrictMemberModal';
import YourInvitedModal from '@/components/modal/stream/YourInvitedModal';
import { Icon } from '@iconify/react'
import React, { useState } from 'react'

const page = () => {
    const [isSendGiftModalOpen, setIsSendGiftModalOpen] = useState(false);
    const [isYourInvitedModalOpen, setIsYourInvitedModalOpen] = useState(true);
    const [isBlockedModalOpen, setIsBlockedModalOpen] = useState(false);
    const [isDroppedModalOpen, setIsDroppedModalOpen] = useState(false);
    const [isRestrictMemberModalOpen, setIsRestrictMemberModalOpen] = useState(false);
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
    const [mode, setMode] = useState("user");
    return (
        <div className='w-screen h-screen bg-[#09090B] overflow-hidden p-5'>
            <div className='bg-[#18181B] w-full h-16 rounded-[6px] flex items-center justify-between p-3 mb-3'>
                <div className='flex items-center gap-6'>
                    <button className='w-10 h-10 flex items-center justify-center bg-[#27272A] rounded-[6px]' style={{
                        backdropFilter: "blur(10px)"
                    }}>
                        <Icon icon="ion:apps" className='w-4 h-4' />
                    </button>

                    <img src='/images/logo.png' className='w-[120px] h-[25px]' />
                </div>

                <div className='flex items-center gap-3'>

                    <button className='flex items-center justify-center bg-[#162456] rounded-[6px] h-10 px-5 gap-3'>
                        <span onClick={() => setMode('streamer')} className='cursor-pointer text-sm text-white font-bold'>Yayıncı Modu</span>
                        <span onClick={() => setMode('user')} className='cursor-pointer text-sm text-white font-bold'>Kullanıcı Modu</span>
                    </button>
                    <button onClick={() => setIsPremiumModalOpen(true)} className='cursor-pointer flex items-center justify-center bg-[#162456] rounded-[6px] h-10 px-5 gap-3'>
                        <img src='/icons/diamond.svg' className='w-4 h-4' />
                        <span className='text-sm text-white font-bold'>Premium Ol</span>
                    </button>

                    <button onClick={() => setIsProfileModalOpen(true)} className='cursor-pointer flex items-center h-10 rounded-[6px] bg-[#27272A] px-2 gap-3'>
                        <img src='/images/ergin-bey.png' className='h-8 w-8 rounded-[6px]' />
                        <span className='text-sm font-bold'>user276327</span>
                        <img src='/icons/seal-check.svg' className='w-4 h-4' />
                    </button>

                    <button className='w-10 h-10 rounded-[6px] bg-[#27272A] flex items-center justify-center'>
                        <Icon icon="solar:moon-bold" className='w-5 h-5' />
                    </button>
                </div>
            </div>

            <div className='flex-1 flex items-start justify-center w-full gap-3'>
                <img src='/images/stream.png' className='flex-[0.75] object-cover rounded-[6px]' style={{
                    height: "calc(100vh - (96px + 88px))"
                }} />

                <div className='flex-[0.25] w-full'>
                    {mode == 'streamer' ? (
                        <UserList
                            setIsBlockedModalOpen={() => setIsBlockedModalOpen(true)}
                            setIsDroppedModalOpen={() => setIsDroppedModalOpen(true)}
                            setRestrictMemberModalOpen={() => setIsRestrictMemberModalOpen(true)}
                        />
                    ) : (
                        <>
                            <UserHeader />
                            <Chat />
                        </>
                    )}
                </div>
            </div>

            <div className='w-full h-[56px] flex items-center justify-between mt-3'>
                <div className='flex items-center gap-2'>
                    <Icon icon="heroicons:users-16-solid" />
                    <span className='text-sm font-medium text-[#71717B]'>
                        <span className='font-bold mr-1'>18.000</span>
                        Yayın izleyicisi
                    </span>
                </div>

                <div className='flex items-center'>
                    <button className='cursor-pointer px-12 bg-[#18181B] rounded-tl-[6px] rounded-bl-[6px] h-[56px] flex items-center justify-center gap-2' style={{
                        backdropFilter: "blur(50px)"
                    }}>
                        <Icon icon="material-symbols:pause" className='w-5 h-5' />
                        <span className='text-sm font-medium text-white/60'>Yayından Çık</span>
                    </button>
                    <button
                        onClick={() => { setIsSendGiftModalOpen(true) }}
                        className='cursor-pointer px-12 bg-[#27272A] rounded-tr-[6px] rounded-br-[6px] h-[56px] flex items-center justify-center gap-2' style={{
                            backdropFilter: "blur(50px)"
                        }}>
                        <Icon icon="lucide:gift" className='w-5 h-5' />
                        <span className='text-sm font-medium text-white/60'>Hediye Gönder</span>
                    </button>
                </div>
            </div>

            <RequestGiftModal isOpen={isSendGiftModalOpen} onClose={() => { setIsSendGiftModalOpen(false) }} />
            <YourInvitedModal isOpen={isYourInvitedModalOpen} onClose={() => { setIsYourInvitedModalOpen(false) }} />
            <BlockedModal isOpen={isBlockedModalOpen} onClose={() => { setIsBlockedModalOpen(false) }} />
            <DroppedModal isOpen={isDroppedModalOpen} onClose={() => { setIsDroppedModalOpen(false) }} />
            <RestrictMemberModal isOpen={isRestrictMemberModalOpen} onClose={() => { setIsRestrictMemberModalOpen(false) }} />
            <ProfileModal isOpen={isProfileModalOpen} onClose={() => { setIsProfileModalOpen(false) }} />
            <PremiumModal isOpen={isPremiumModalOpen} onClose={() => { setIsPremiumModalOpen(false) }} />
        </div>


    )
}

export default page

export const OtherMessage = ({ title = 'Diğer', message = 'Merhaba, nasılsın?' }) => {
    return (
        <div className='flex items-end gap-3 w-max'>
            <img src='/images/girl.png' className='w-5 h-5 rounded-full' />

            <div className='flex flex-col items-start bg-[#27272A] p-3 rounded-[12px]' style={{
                backdropFilter: "blur(50px)"
            }}>

                <span className='text-[#2B7FFF] mb-0.5 text-xs font-medium'>{title}</span>
                <span className='text-white text-sm font-normal'>{message}</span>

            </div>
        </div>
    )
}

export const UserHeader = () => {
    return (
        <div className='mb-3 bg-[#18181B] w-full h-16 rounded-[6px] border border-[#27272A] flex items-center justify-between p-3'>
            <div className='flex items-center gap-3'>
                <img src='/images/girl.png' className='w-10 h-10 rounded-[6px]' />
                <div className='flex flex-col items-start gap-1'>
                    <h1 className='text-sm font-bold whitespace-nowrap'>Anna Lola Ya...</h1>
                    <div className='flex items-center gap-3'>
                        <div className='flex items-center gap-1'>
                            <img src='/icons/monaco.svg' className='w-4 h-4' />
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
                <button className='w-10 h-10 rounded-[6px] bg-[#27272A] flex items-center justify-center'>
                    <Icon icon="material-symbols:warning-rounded" className='w-5 h-5' />
                </button>

                <button className='h-10 px-4 shrink-0 rounded-[6px] bg-[#27272A] flex items-center justify-center gap-2'>
                    <Icon icon="mage:user-plus" className='w-5 h-5' />
                    <span className='text-sm font-medium'>Takip Et</span>
                </button>
            </div>
        </div>
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

const Chat = () => {
    return (
        <div className='bg-[#18181B] rounded-[6px] w-full h-full'>
            <div className='flex flex-col gap-3 p-4 overflow-y-auto'>
                <GiftMessage />
                <OtherMessage title="user123" message="Hey, nasıl gidiyor?" />
                <MyMessage message="İyiyim, sen nasılsın?" />
                <OtherMessage title="user456" message="Harika! Yeni bir şeyler öğreniyorum." />
                <GiftMessage />

                <div className='flex items-center gap-2 mb-3'>
                    <Icon icon="weui:more-filled" className='text-white/60 w-5 h-5' />
                    <span className='text-sm font-medium text-white/60'>Yazıyor...</span>
                </div>

                <div className='h-12 w-full rounded-[6px] bg-[#27272A] flex items-center justify-center gap-2 px-3' style={{
                    backdropFilter: "blur(50px)"
                }}>
                    <Icon icon="mdi:emoji" className="w-6 h-6 mr-2" />

                    <input type="text" className='w-full h-full bg-transparent outline-none text-white/60 text-sm font-medium' placeholder='Mesaj yaz...' />

                    <div className='border-l border-white/10 h-[60%]'></div>

                    <button className='w-10 h-10 rounded-[6px] bg-[#27272A] flex items-center justify-center'>
                        <Icon icon="carbon:send-filled" className='w-5 h-5' />
                    </button>
                </div>

            </div>
        </div>
    )
}

const UserList = ({ setIsBlockedModalOpen, setIsDroppedModalOpen, setRestrictMemberModalOpen }) => {
    return (
        <div className='bg-[#18181B] border border-[#27272A] rounded-[6px] w-full h-full px-3 pt-6 pb-3'>
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

            <div className='flex flex-col items-start'>
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