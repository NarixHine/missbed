import Timeline from '@/components/timeline'
import { notFound } from 'next/navigation'

interface EmbeddableTimeboardPageProps {
    params: { slug: string[] }
}

export async function generateMetadata({ params }: EmbeddableTimeboardPageProps) {
    const [instance, id] = params.slug
    return {
        title: `Timeboard of User ${id}`
    }
}

export default function EmbeddableTimeboard({ params }: EmbeddableTimeboardPageProps) {
    const [instance, id] = params.slug
    if (instance && id) {
        return <Timeline instance={instance} id={id} boardly></Timeline>
    }
    else {
        notFound()
    }
}
