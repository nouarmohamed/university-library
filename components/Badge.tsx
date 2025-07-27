import Image from 'next/image'
import React from 'react'
import { Avatar, AvatarFallback } from './ui/avatar'
import { getInitials } from '@/lib/utils'
import { Image as IKImage } from '@imagekit/next'
import config from '@/lib/config'

interface BadgeProps {
    fullName: string
    email: string
    universityId: number
    universityCard: string
    accountStatus: string
}

const Badge = ({fullName, email, universityId, universityCard, accountStatus }: BadgeProps) => {

    return (
        <section className="mt-5 relative">
            <Image
                src="/icons/badge.png"
                alt="Profile Banner"
                width={500}
                height={500}
            />
            <div className='absolute top-25 left-10'>
                <div className='flex flex-row items-center gap-4 mb-5'>
                    <div className='p-2 bg-dark-700 rounded-full'>
                        <Avatar className='size-20! text-3xl'>
                            <AvatarFallback>{fullName ? getInitials(fullName) : "CN"}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className='flex flex-col gap-3'>
                        {accountStatus === 'APPROVED' && (
                            <div className='flex gap-2'>
                                <Image
                                    src="/icons/verified.svg"
                                    alt="Verified icon"
                                    width={20}
                                    height={20}
                                />
                                <p>Verified Student</p>
                            </div>
                        )}
                        <div>
                            <h2 className='text-xl font-semibold text-white mb-1.5'>{fullName}</h2>
                            <p>{email}</p>
                        </div>
                    </div>
                </div>
                <div className='mb-4 ml-4'>
                    <p>University</p>
                    <h2 className='text-xl font-semibold text-white mt-1.5'>JavaScript Journey</h2>
                </div>
                <div className='mb-4 ml-4'>
                    <p>Student ID</p>
                    <h2 className='text-xl font-semibold text-white mt-1.5'>{universityId}</h2>
                </div>
            </div>
            <IKImage
                src={universityCard}
                urlEndpoint={config.env.imageKit.endpointUrl}
                alt='Universiry Card'
                width={450}
                height={450}
                style={{ borderRadius: '12px', overflow: 'hidden', position: 'absolute', left: '50%', transform: 'translate(-50%, -50%)', top: '50%' }}
            />
        </section>
    )
}

export default Badge