import Note from './note'
import { useState } from 'react'
import cli from '@/lib/misskey'
import { Note as NoteType } from 'misskey-js/built/entities'
import { OgObject } from 'open-graph-scraper/dist/lib/types'

export default function Timeline({ notes, userId, instance, boardly = false, ogs }: {
    notes: NoteType[],
    userId: string,
    instance: string,
    ogs: OgObject[][],
    boardly?: boolean
}) {
    const [loaded, setLoaded] = useState({ loadedNotes: notes, loadedOgs: ogs })
    const { loadedNotes, loadedOgs } = loaded

    const [isLoading, setIsLoading] = useState(false)
    const [isFinished, setIsFinished] = useState(notes.length < 10 ? true : false)

    const loadNotes = async () => {
        setIsLoading(true)

        const loadingNotes = await cli(instance).request('users/notes', {
            userId,
            untilId: loadedNotes[loadedNotes.length - 1].id,
        })
        const loadingOgs = (await (await fetch('/api/og', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                texts: loadingNotes.map(note => note.text)
            })
        })).json()).ogs
        setLoaded(({ loadedNotes, loadedOgs }) => ({ loadedNotes: loadedNotes.concat(loadingNotes), loadedOgs: loadedOgs.concat(loadingOgs) }))

        if (loadingNotes.length < 10)
            setIsFinished(true)
        setIsLoading(false)
    }

    return (
        <div className={boardly ? 'grid items-center grid-cols-3 gap-5' : ''}>
            {
                loadedNotes.map((note, index) => (
                    <div key={note.id}>
                        <Note {...note} instance={instance} ogs={loadedOgs[index]}></Note>
                        {boardly ? <></> : <div className='w-3 h-3 bg-stone-50 dark:bg-slate-900 mx-auto'></div>}
                    </div>
                ))
            }
            <button disabled={isLoading || isFinished} onClick={loadNotes} className='w-32 h-32 mx-auto group relative block p-1 text-sm font-medium text-gray-900 rounded bg-gradient-to-br from-teal-50 to-lime-50 group-hover:from-teal-50 group-hover:to-lime-50 focus:ring-4 focus:outline-none focus:ring-lime-50'>
                <div className='w-full h-full px-5 py-2.5 flex items-center justify-center transition-all ease-in duration-75 bg-stone-50 dark:bg-slate-900 rounded group-hover:bg-opacity-0'>
                    <svg className={`w-6 h-6 ${isLoading ? 'text-stone-300' : 'text-stone-600'} ${isFinished ? 'hidden' : ''}`} aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 8'>
                        <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1' />
                    </svg>
                </div>
            </button>
        </div>
    )
}
