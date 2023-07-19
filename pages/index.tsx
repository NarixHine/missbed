import dynamic from 'next/dynamic'
import { Sawarabi_Mincho } from 'next/font/google'
import Head from 'next/head'
import GithubCorner from 'react-github-corner'
import Image from 'next/image'

const ReactEmbedGist = dynamic(() => import('react-embed-gist'), {
  ssr: false,
})
const mincho = Sawarabi_Mincho({ weight: '400', subsets: ['latin'] })

export default function Home() {
  return (
    <main className={`${mincho.className} bg-gradient-to-tr from-indigo-200 via-red-200 to-yellow-100 overflow-y-auto p-8`}>
      <Head>
        <meta name='description' content={'Embedding solution for Misskey. Homepage of Missbed.'} />
      </Head>
      <GithubCorner href='https://github.com/NarixHine/missbed' bannerColor='pink' target='_blank' style={{ opacity: 0.7 }} />

      <h1 className='text-5xl text-center'>
        <div className='my-2 relative h-20'>
          <Image priority={true} className='absolute animate-fade left-1/2 -translate-x-1/2' src={'/og.png'} quality={100} width={80} height={80} alt='Missbed Logo'></Image>
        </div>
        <div className='bg-clip-text font-extrabold text-transparent bg-gradient-to-r from-indigo-300 to-purple-400'>Missbed</div>
      </h1>
      <p className='text-center text-slate-500 italic'>Embedding solution for <a className='text-lime-600'>Misskey</a></p>
      <br></br>

      <div className='w-2/3 bg-slate-200/60 mx-auto rounded-lg opacity-90 p-5 overflow-x-hidden' style={{ minWidth: 280 }}>
        <ReactEmbedGist titleClass='hidden' loadingClass='hidden' gist='NarixHine/6451fe18c4924fa55c3102abd8083cdc'></ReactEmbedGist>
        <hr className='my-5 border-purple-400'></hr>
        <iframe src='/note/misskey.cloud/9grjhkquhi' width={'100%'} height={360}></iframe>
        <br></br>
        <iframe src='/timeline/misskey.cloud/9cxdmiu7h5' width={'100%'} height={1000}></iframe>
      </div>
      <br></br>

      <footer className='text-center text-slate-700 align-middle'>— Made by <a target='_blank' rel='noreferrer' href='https://github.com/NarixHine' className='italic'>Narix Hine <Image src='/nh.png' className='align-middle mx-1' quality={100} width={22} height={25} alt='Narix Hine'></Image></a> —</footer>
    </main>
  )
}
