import dynamic from 'next/dynamic'
import { Sawarabi_Mincho } from 'next/font/google'
import Head from 'next/head'
import Div100vh from 'react-div-100vh'
import GithubCorner from 'react-github-corner'

const ReactEmbedGist = dynamic(() => import('react-embed-gist'), {
  ssr: false,
})
const mincho = Sawarabi_Mincho({ weight: '400', subsets: ['latin'] })

export default function Home() {
  return (
    <Div100vh className={`${mincho.className} bg-gradient-to-tr from-indigo-200 via-red-200 to-yellow-100 overflow-y-auto p-12`}>
      <Head>
        <meta name='description' content={'Embedding solution for Misskey. Homepage of Missbed.'} />
      </Head>
      <GithubCorner href='https://github.com/NarixHine/missbed' bannerColor='pink' target='_blank' style={{ opacity: 0.7 }} />

      <h1 className='text-5xl text-center'>
        <span className='bg-clip-text font-extrabold text-transparent bg-gradient-to-r from-indigo-300 to-purple-400'>Missbed</span>
      </h1>
      <p className='text-center text-slate-500 italic'>Embedding solution for <a className='text-lime-600'>Misskey</a></p>
      <br></br>

      <main className='w-1/2 bg-slate-200/60 mx-auto rounded-lg opacity-90 p-5 overflow-x-hidden' style={{ minWidth: 280 }}>
        <ReactEmbedGist titleClass='hidden' loadingClass='hidden' gist='NarixHine/6451fe18c4924fa55c3102abd8083cdc'></ReactEmbedGist>
        <hr className='my-5 border-slate-800'></hr>
        <iframe src='/note/misskey.dev/9gqe0616gv' width={'100%'} height={660} className='mx-auto'></iframe>
        <br></br>
        <iframe src='/timeline/misskey.cloud/9cxdmiu7h5' width={'100%'} height={800} className='mx-auto'></iframe>
      </main>
    </Div100vh>
  )
}
