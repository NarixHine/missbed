import Skeleton from '@/components/skeleton'

export default function EmbeddableTimeboardLoading() {
    return (
        <div className='grid items-center grid-cols-3 gap-5'>
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
        </div>
    )
}
