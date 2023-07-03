import { ErrorProps } from 'next/error'
import { Sawarabi_Mincho, Yomogi } from 'next/font/google'
import Image from 'next/image'

const yomogi = Yomogi({ weight: '400', subsets: ['latin'] })
const mincho = Sawarabi_Mincho({ weight: '400', subsets: ['latin'] })

function Error({ statusCode }: ErrorProps) {
    return (
        <article className='bg-stone-50 w-full p-7 rounded'>
            <header className='flex gap-3'>
                <Image width={56} height={56}  src='/avatar.jpg' alt='Avatar' className='rounded-full'></Image>
                <div className={`${yomogi.className} flex flex-col justify-center leading-tight`}>
                    <p className='text-stone-900 font-bold'>{'Narix Hine'}</p>
                    <p className='text-stone-900'>{'@NH'}</p>
                </div>
            </header>
            <br></br>

            <div className={`${mincho.className} break-words whitespace-pre-line`}>
                <p className='text-red-500'>ERROR! {statusCode}</p>
                <p>You are viewing the error page of Missbed, an embedding solution website for Misskey. The error is probably caused by the possibility that the content being accessed is deleted or private.</p>
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
