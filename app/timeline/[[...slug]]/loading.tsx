import Skeleton from '@/components/skeleton'

export default function EmbeddableTimelineLoading() {
    return (
        <>
            <Skeleton />
            <div className='w-3 h-3 bg-stone-50 dark:bg-slate-900 mx-auto'></div>
            <Skeleton />
            <div className='w-3 h-3 bg-stone-50 dark:bg-slate-900 mx-auto'></div>
            <Skeleton />
        </>
    )
}
