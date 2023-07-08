import { DriveFile, Note } from 'misskey-js/built/entities'
import { Yomogi, Sawarabi_Mincho } from 'next/font/google'
import { useEffect, useState } from 'react'
import ProgressiveImage from 'react-progressive-image-loading'
import Image from 'next/image'
import { ImageObject, OgObject } from 'open-graph-scraper/dist/lib/types'
import MfmConverter from '@/lib/mfm'

const yomogi = Yomogi({ weight: '400', subsets: ['latin'] })
const mincho = Sawarabi_Mincho({ weight: '400', subsets: ['latin'] })

export interface NoteProps extends Note {
    instance: string
    ogs?: OgObject[]
    isRenote?: boolean
}

export default function Note({ id, user, createdAt, text, files, cw, poll, renote, instance, ogs = [], isRenote }: NoteProps) {
    const [show, setShow] = useState(!cw)
    return (
        <article className={`bg-stone-50 w-full p-7 rounded ${isRenote ? 'shadow-lg' : ''}`}>
            <header className='flex gap-3'>
                <Image width={56} height={56} src={user.avatarUrl} alt='Avatar' className='rounded-full'></Image>
                <div className={`${yomogi.className} flex flex-col justify-center leading-tight`}>
                    <p className='text-stone-900 font-bold'>{user.name}</p>
                    <p className='text-stone-900'>{`@${user.username}`}</p>
                </div>
            </header>
            <br></br>

            {
                cw ? (<div className={mincho.className}>
                    {new MfmConverter(cw, instance).convert()} <button className='text-slate-400 ml-1 border-solid border-2 px-1' onClick={() => setShow(show => !show)}>{show ? 'Hide' : 'Show'}</button>
                    <br></br><br></br>
                </div>) : <></>
            }
            {
                show ?
                    (<>
                        <Text text={text} ogs={ogs} instance={instance} renote={renote}></Text>
                        <Renote renote={renote}></Renote>
                        <Cards ogs={ogs}></Cards>
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

const Renote = ({ renote }: { renote?: Note }) => renote ? (<>
    <Note {...renote} ogs={[]} instance='' isRenote></Note>
    <br></br>
</>) : <></>

const Cards = ({ ogs }: { ogs: OgObject[] }) => {
    return ogs.length > 0 ? (<>
        {
            ogs.map(({ ogImage, ogTitle, requestUrl, ogDescription }) => (
                (
                    <a key={requestUrl} href={requestUrl} target='_blank' rel='noreferrer'>
                        <div className='flex h-20 my-2 bg-gradient-to-r from-rose-100/20 to-teal-100/20'>
                            <div className='relative w-20 h-20 shrink-0 rounded-l overflow-clip'>
                                <Image quality={100} src={(ogImage as ImageObject[])[0].url} className='object-cover' width={80} height={80} alt={ogTitle as string}></Image>
                            </div>
                            <div className={`${mincho.className} w-full p-4 border-slate-300 border border-l-0 rounded-r overflow-y-clip whitespace-nowrap text-ellipsis overflow-x-hidden`}>
                                {ogTitle}
                                <br></br>
                                <span className='text-slate-500 text-sm'>
                                    {ogDescription ?? ''}
                                </span>
                            </div>
                        </div>
                    </a>
                )))
        }
        <br />
    </>) : <></>
}

const Text = ({ text, instance, ogs, renote }: { text: string | null, instance: string, ogs: OgObject[], renote?: Note }) => {
    if (text) {
        const converter = new MfmConverter(text, instance)
        return (<>
            <div className={`${mincho.className} break-words whitespace-pre-line`}>{converter.convert()}</div>
            <br className={ogs.length > 0 || renote ? 'hidden' : ''}></br>
        </>)
    }
    else {
        return <></>
    }
}

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
                                <button className='text-slate-400 border-solid border-slate-400 border px-1 text-xs' onClick={() => {
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
    </>) : <></>
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
    return poll ? (<>
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
    </>) : <></>
}
