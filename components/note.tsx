import { DriveFile, Note } from 'misskey-js/built/entities'
import { Yomogi, Sawarabi_Mincho } from 'next/font/google'
import { useEffect, useState } from 'react'
import ProgressiveImage from 'react-progressive-image-loading'
import Autolinker from 'autolinker'
import Image from 'next/image'

const yomogi = Yomogi({ weight: '400', subsets: ['latin'] })
const mincho = Sawarabi_Mincho({ weight: '400', subsets: ['latin'] })

export interface NoteProps extends Note {
    instance: string
}

export default function Note({ id, user, createdAt, text, files, cw, poll, instance }: NoteProps) {
    const [show, setShow] = useState(!cw)

    return (
        <article className='bg-stone-50 w-full p-7 rounded'>
            <header className='flex gap-3'>
                <Image width={56} height={56} src={user.avatarUrl} alt='Avatar' className='rounded-full'></Image>
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
                        <Text text={text} instance={instance}></Text>
                        <Enquette poll={poll}></Enquette>
                        <Images files={files}></Images>
                    </>) : <></>
            }

            <footer className={`${yomogi.className} text-stone-500 text-sm`}>
                <a className='underline' href={`https://${instance}/notes/${id}`} target='_blank' rel='noreferrer'>Noted</a> at {createdAt.replace('T', ' ').split('.')[0]}
            </footer>
        </article>
    )
}

const Text = ({ text, instance }: { text: string | null, instance: string }) => text ? (
    <>
        <div className={`${mincho.className} break-words whitespace-pre-line`} dangerouslySetInnerHTML={{
            __html: Autolinker.link(text, {
                className: 'text-link',
                mention: 'twitter',
                hashtag: 'twitter',
                replaceFn: (match) => {
                    const pattern = match.getMatchedText()
                    const tag = match.buildTag()
                    switch (match.type) {
                        case 'mention':
                            return tag.setAttr('href', `https://${instance}/${pattern}`)
                        case 'hashtag':
                            return tag.setAttr('href', `https://${instance}/tags/${pattern.replace('#', '')}`)
                        default:
                            return tag
                    }
                }
            })
        }}></div>
        <br></br>
    </>
) : <></>

const Images = ({ files }: { files: DriveFile[] }) => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => setIsMounted(true), [])
    const [opacities, setOpacities] = useState<number[]>(files.map(({ isSensitive }) => (isSensitive ? 0.1 : 1)))

    return files.length > 0 ? (<>
        <div className={'grid grid-cols-2 gap-2 p-2 bg-gradient-to-r from-rose-100/20 to-teal-100/20'} style={{ boxShadow: 'rgba(3, 102, 214, 0.2) 0px 0px 0px 3px' }}>
            {
                isMounted ? files.map(({ id, thumbnailUrl, url, name }, index) => (
                    <ProgressiveImage key={id} preview={thumbnailUrl} src={url} render={(src, style) => (
                        <div className='overflow-clip aspect-square rounded relative'>
                            <Image fill src={src} alt={name} style={{ ...style, objectFit: 'cover', opacity: opacities[index], filter: `blur(${Math.floor((1 - opacities[index]) * 5)}px)` }} />
                            <div style={{ opacity: 1 - opacities[index] }} className={`${mincho.className} ${1 - opacities[index] > 0 ? '' : 'hidden'} w-full p-1 text-center absolute top-1/2 -translate-y-1/2`}>
                                <a className='text-lg'>NSFW</a>
                                <br></br>
                                <button className='text-slate-400 border-solid border-slate-400 border-2 px-1 text-xs' onClick={() => {
                                    const fadeInInterval = setInterval(() => {
                                        setOpacities(opacities => Array.from(opacities, (opacity, i) => {
                                            const newOpacity = i === index ? opacity + 0.01 : opacity
                                            if (newOpacity > 1) {
                                                clearInterval(fadeInInterval)
                                            }
                                            return newOpacity
                                        }))
                                    }, 5)
                                }}>Click to View</button>
                            </div>
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
