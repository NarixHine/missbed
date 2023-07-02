import { Note } from 'misskey-js/built/entities'
import { Yomogi, Klee_One } from 'next/font/google'
import ProgressiveImage from 'react-progressive-image-loading'

const yomogi = Yomogi({ weight: '400', subsets: ['latin'] })
const klee = Klee_One({ weight: '400', subsets: ['latin'] })

export default function Note({ id, user, createdAt, text, files }: Note) {
    return (
        <article className='bg-stone-50 w-full p-7 rounded-3xl'>
            <header className='flex gap-3'>
                <img src={user.avatarUrl} alt='Avatar' className='w-14 h-14 rounded-full'></img>
                <div className={`${yomogi.className} flex flex-col justify-center leading-tight`}>
                    <p className='text-stone-900 font-bold'>{user.name}</p>
                    <p className='text-stone-900'>{`@${user.username}`}</p>
                </div>
            </header>
            <br></br>
            <div className={klee.className}>
                {text}
            </div>
            <br></br>
            <div className={`${files.length > 0 ? 'grid' : 'hidden'} grid-cols-2 gap-5 p-1.5`} style={{ boxShadow: ' rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset' }}>
                {
                    files.map((file) => (
                        <ProgressiveImage key={file.id} preview={file.thumbnailUrl} src={file.url} render={(src, style) => (
                            <div className='overflow-clip max-h-48 rounded'>
                                <img src={src} alt={file.name} style={style} className='rounded' />
                            </div>
                        )}></ProgressiveImage>
                    ))
                }
            </div>
            <br></br>
            <footer className={`${yomogi.className} text-stone-500`}>
                <a href={`${user.avatarUrl.split('proxy')[0]}notes/${id}`} target='_blank' rel='noreferrer'>Posted at {createdAt.replace('T', ' ').split('.')[0]}</a>
            </footer>
        </article>
    )
}
