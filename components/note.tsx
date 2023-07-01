import { Note } from 'misskey-js/built/entities'
import { Yomogi } from 'next/font/google'

const yomogi = Yomogi({ weight: '400', subsets: ['latin'] })

export default function Note({ id, user, createdAt, text, files }: Note) {
    return (
        <article className='bg-stone-50 w-full p-7'>
            <header className='flex gap-3'>
                <img src={user.avatarUrl} alt='Avatar' className='w-14 h-14 rounded-full'></img>
                <div className={`${yomogi.className} flex flex-col justify-center leading-tight`}>
                    <p className='text-stone-900 font-bold'>{user.name}</p>
                    <p className='text-stone-900'>{`@${user.username}`}</p>
                </div>
            </header>
            <br></br>
            <div>
                {text}
            </div>
            <br></br>
            <footer className={`${yomogi.className} text-stone-400`}>
                {createdAt.replace('T',' ').split('.')[0]}
            </footer>
        </article>
    )
}
