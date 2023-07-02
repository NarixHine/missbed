import { ErrorProps } from 'next/error'
import { Sawarabi_Mincho, Yomogi } from 'next/font/google'

const yomogi = Yomogi({ weight: '400', subsets: ['latin'] })
const mincho = Sawarabi_Mincho({ weight: '400', subsets: ['latin'] })

function Error({ statusCode }: ErrorProps) {
    return (
        <article className='bg-stone-50 w-full p-7 rounded'>
            <header className='flex gap-3'>
                <img src={'https://misskey.cloud/proxy/avatar.webp?url=https%3A%2F%2Fmedia.misskey.cloud%2Ffiles%2Fwebpublic-40882392-aaa6-4e8a-9fa6-8493a7a196ef.png&avatar=1'} alt='Avatar' className='w-14 h-14 rounded-full'></img>
                <div className={`${yomogi.className} flex flex-col justify-center leading-tight`}>
                    <p className='text-stone-900 font-bold'>{'Narix Hine'}</p>
                    <p className='text-stone-900'>{'@NH'}</p>
                </div>
            </header>
            <br></br>

            <div className={`${mincho.className} break-words whitespace-pre-line`}>
                <p className='text-red-500'>ERROR! {statusCode}</p>
                <p>You are viewing the error page of Missbed, an embedding solution website for Misskey. The error is probably caused by the fact that the content being accessed is deleted or private.</p>
            </div>
            <br></br>
            <footer className={`${yomogi.className} text-stone-500 text-sm`}>
                <a className='underline' href='https://github.com/NarixHine/missbed' target='_blank' rel='noreferrer'>Developed</a> on Jul. 2 2023
            </footer>
        </article>
    )
}

Error.getInitialProps = ({ res, err }: any) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}

export default Error
