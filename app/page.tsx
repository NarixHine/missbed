import GithubCorner from '@/components/github'
import CopyBlock, { ocean } from '@/components/codeblock'
import { Sawarabi_Mincho } from 'next/font/google'
import Head from 'next/head'
import Image from 'next/image'
import Logo from '@/app/opengraph-image.png'

const mincho = Sawarabi_Mincho({ weight: '400', subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`${mincho.className} w-full bg-gradient-to-tr from-indigo-200 via-red-200 to-yellow-100 dark:bg-gradient-to-br dark:from-cyan-600 dark:via-cyan-700 dark:to-sky-900 overflow-y-auto p-8`}>
      <Head>
        <meta name='description' content={'Embedding solution for Misskey. Homepage of Missbed.'} />
      </Head>
      <GithubCorner href='https://github.com/NarixHine/missbed' bannerColor='pink' target='_blank' style={{ opacity: 0.7 }} />

      <h1 className='text-5xl text-center'>
        <div className='my-2 relative h-20'>
          <Image priority={true} className='absolute animate-fade left-1/2 -translate-x-1/2' src={Logo} quality={100} width={80} height={80} alt='Missbed Logo'></Image>
        </div>
        <div className='bg-clip-text font-extrabold text-transparent bg-gradient-to-r from-indigo-300 to-purple-400'>Missbed</div>
      </h1>
      <p className='text-center text-slate-500 dark:text-slate-200 italic'>Embedding solution for <a className='text-lime-600'>Misskey</a></p>
      <br></br>

      <div className='w-2/3 bg-slate-200/60 mx-auto rounded-lg opacity-90 p-5 overflow-x-hidden' style={{ minWidth: 280 }}>
        <CopyBlock
          // @ts-ignore
          text={'<iframe src="https://missbed.narix.link/timeline/{instance}/{user_id}" />\n<iframe src="https://missbed.narix.link/timeboard/{instance}/{user_id}" />\n<iframe src="https://missbed.narix.link/note/{instance}/{note_id}" />'}
          language={'tsx'}
          showLineNumbers={true}
          theme={{ ...ocean }}
          codeBlock
        />
        <hr className='my-5 border-purple-400'></hr>
        <iframe src='/note/firefish.social/9jqn02z9zb8z72rm' width={'100%'} height={700}></iframe>
        <br></br>
        <iframe src='/timeline/firefish.social/9jqk8atccfg7sk8x' width={'100%'} height={1000}></iframe>
      </div>
      <br></br>
    </main>
  )
}
