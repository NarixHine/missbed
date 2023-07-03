import { DriveFile, Note } from 'misskey-js/built/entities'
import { Yomogi, Sawarabi_Mincho } from 'next/font/google'
import { useEffect, useState } from 'react'
import ProgressiveImage from 'react-progressive-image-loading'
import Autolinker from 'autolinker'
import Image from 'next/image'

const yomogi = Yomogi({ weight: '400', subsets: ['latin'] })
const mincho = Sawarabi_Mincho({ weight: '400', subsets: ['latin'] })

export default function Note({ id, user, createdAt, text, files, cw, poll }: Note) {
    const [show, setShow] = useState(!cw)

    return (
        <article className='bg-stone-50 w-full p-7 rounded'>
            <header className='flex gap-3'>
                <Image width={56} height={56} src={user.avatarUrl} alt='Avatar' className='w-14 h-14 rounded-full'></Image>
                <div className={`${yomogi.className} flex flex-col justify-center leading-tight`}>
                    <p className='text-stone-900 font-bold'>{user.name}</p>
                    <p className='text-stone-900'>{`@${user.username}`}</p>
                </div>
            </header>
            <br></br>

            <div className={`${mincho.className} ${cw ? '' : 'hidden'}`}>
                {cw} <button className='text-slate-400 ml-1 border-solid border-2 px-1' onClick={() => setShow(show => !show)}>{show ? 'Hide' : 'Show'}</button>
                <br></br><br></br>
            </div>
            {
                show ?
                    (<>
                        <Text text={text}></Text>
                        <Enquette poll={poll}></Enquette>
                        <Images files={files}></Images>
                    </>) : <></>
            }

            <footer className={`${yomogi.className} text-stone-500 text-sm`}>
                <a className='underline' href={`${user.avatarUrl.split('proxy')[0]}notes/${id}`} target='_blank' rel='noreferrer'>Noted</a> at {createdAt.replace('T', ' ').split('.')[0]}
            </footer>
        </article>
    )
}

const Text = ({ text }: { text: string | null }) => text ? (
    <>
        <div className={`${mincho.className} break-words whitespace-pre-line`} dangerouslySetInnerHTML={{
            __html: Autolinker.link(text ?? '', {
                className: 'text-link'
            })
        }}></div>
        <br></br>
    </>
) : <></>

const Images = ({ files }: { files: DriveFile[] }) => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => setIsMounted(true), [])

    return files.length > 0 ? (<>
        <div className={'grid grid-cols-2 gap-2 p-2 bg-gradient-to-r from-rose-100/20 to-teal-100/20'} style={{ boxShadow: 'rgba(3, 102, 214, 0.2) 0px 0px 0px 3px' }}>
            {
                isMounted ? files.map((file) => (
                    <ProgressiveImage key={file.id} preview={file.thumbnailUrl} src={file.url} render={(src, style) => (
                        <div className='overflow-clip aspect-square rounded relative'>
                            <Image fill src={src} alt={file.name} style={{ ...style, objectFit: 'cover' }} />
                        </div>
                    )}></ProgressiveImage>
                )) : <></>
            }
        </div>
        <br></br>
    </>
    ) : <></>
}

const Enquette = ({ poll }: {
    poll: {
        expiresAt: string | null
        multiple: boolean
        choices: {
            isVoted: boolean
            text: string
            votes: number
        }[]
    } | undefined
}) => {
    const allVotes = poll ? poll.choices.reduce((a, b) => a + b.votes, 0) : 0
    return poll ? (
        <>
            {
                poll.choices.map(({ text, votes }) => (
                    <div
                        key={text}
                        className={`${mincho.className} w-full border-lime-200 border-2 my-1 whitespace-nowrap rounded`}
                    >
                        <div style={{ width: `${votes / allVotes * 100}%` }} className='p-2 bg-lime-100 text-teal-800 text-sm rounded'>
                            {text} <a className='text-xs border-l px-1 border-teal-600 text-teal-600'>{votes} {votes === 1 ? 'Vote' : 'Votes'}</a>
                        </div>
                    </div>
                ))
            }
            <br></br>
        </>
    ) : <></>
}
