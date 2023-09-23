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
    const converter = new MfmConverter(instance)
    return (
        <article className={'bg-stone-50 dark:bg-slate-900 w-full p-7 rounded'} style={{ boxShadow: isRenote ? 'rgba(50, 50, 93, 0.25) 0px 10px 20px -4px, rgba(0, 0, 0, 0.3) 0px 6px 10px -5px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset' : '' }}>
            <header className='flex gap-3'>
                <Image width={56} height={56} src={user.avatarUrl} alt='Avatar' className='rounded-full'></Image>
                <div className={`${yomogi.className} flex flex-col justify-center leading-tight`}>
                    <a className='text-stone-900 dark:text-stone-50 font-bold hover:underline block' href={`https://${instance}/@${user.username}`} target='_blank' rel='noreferrer'>{converter.convert(user.name)}</a>
                    <p className='text-stone-900 dark:text-stone-50'>{`@${user.username}`}</p>
                </div>
            </header>
            <br></br>

            {
                cw && (<div className={mincho.className}>
                    {converter.convert(cw)} <button className='text-slate-400 ml-1 border-solid border-2 px-1' onClick={() => setShow(show => !show)}>{show ? 'Hide' : 'Show'}</button>
                    <br></br><br></br>
                </div>)
            }
            {
                show && (<>
                    <Text text={text} converter={converter}></Text>
                    <Renote renote={renote}></Renote>
                    <Cards ogs={ogs}></Cards>
                    <Enquette poll={poll}></Enquette>
                    <Images imgs={files.filter(({ type }) => type.startsWith('image'))}></Images>
                </>)
            }

            <footer className={`${yomogi.className} text-stone-500 dark:text-slate-300 text-sm`}>
                {
                    isRenote ? 'Noted' : <>
                        <a className='underline' href={`https://${instance}/notes/${id}`} target='_blank' rel='noreferrer'>Noted</a>
                        {' '} on <a className='underline' href={`https://${instance}/`} target='_blank' rel='noreferrer'>{instance}</a>
                    </>
                }
                {' '} at {createdAt.replace('T', ' ').split('.')[0]}
            </footer>
        </article>
    )
}

const Renote = ({ renote }: { renote?: Note }) => renote && (<>
    <Note {...renote} ogs={[]} instance='' isRenote></Note>
    <br></br>
</>)

const Cards = ({ ogs }: { ogs: OgObject[] }) => {
    return ogs.length > 0 && (<>
        {
            ogs.map(({ ogImage, ogTitle, requestUrl, ogDescription }) => (
                (
                    <a key={requestUrl} href={requestUrl} target='_blank' rel='noreferrer'>
                        <div className='flex h-20 my-2 bg-gradient-to-r from-rose-100/20 to-teal-100/20'>
                            <div className='relative w-20 h-20 shrink-0 rounded-l overflow-clip'>
                                <Image quality={100} src={(ogImage as ImageObject[])[0].url} className='object-cover' width={80} height={80} alt={ogTitle as string}></Image>
                            </div>
                            <div className={`${mincho.className} dark:text-stone-100 w-full p-4 border-slate-300 border border-l-0 rounded-r overflow-y-clip whitespace-nowrap text-ellipsis overflow-x-hidden`}>
                                {ogTitle}
                                <br></br>
                                <span className='text-slate-500 dark:text-stone-300 text-sm'>
                                    {ogDescription ?? ''}
                                </span>
                            </div>
                        </div>
                    </a>
                )))
        }
        <br />
    </>)
}

const Text = ({ text, converter }: { text: string | null, converter: MfmConverter }) => {
    return text && (<>
        <div className={`${mincho.className} dark:text-slate-200 break-words whitespace-pre-line`}>{converter.convert(text)}</div>
        <br></br>
    </>)
}

const Images = ({ imgs }: { imgs: DriveFile[] }) => {
    const [isMounted, setIsMounted] = useState(false)
    useEffect(() => setIsMounted(true), [])
    const [opacities, setOpacities] = useState<number[]>(imgs.map(({ isSensitive }) => (isSensitive ? 0.1 : 1)))

    return imgs.length > 0 && (<>
        <div className={`grid ${imgs.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-2 p-2 bg-gradient-to-r from-rose-100/20 to-teal-100/20`} style={{ boxShadow: 'rgba(3, 102, 214, 0.2) 0px 0px 0px 3px' }}>
            {
                isMounted && imgs.map(({ id, thumbnailUrl, url, name }, index) => (
                    <ProgressiveImage key={id} preview={thumbnailUrl} src={url} render={(src, style) => (
                        <div className='overflow-clip aspect-video rounded relative'>
                            <Image fill src={src} alt={name} style={{ ...style, objectFit: 'cover', opacity: opacities[index], filter: `blur(${Math.floor((1 - opacities[index]) * 10)}px)` }} />
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
                ))
            }
        </div>
        <br></br>
    </>)
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
    return poll && (<>
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
    </>)
}
