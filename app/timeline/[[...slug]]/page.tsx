import Timeline from '@/components/timeline'
import { notFound } from 'next/navigation'

interface EmbeddableTimelinePageProps {
    params: { slug: string[] }
}

export async function generateMetadata({ params }: EmbeddableTimelinePageProps) {
    const [instance, id] = params.slug
    return {
        title: `Timeline of User ${id}`
    }
}

export default function EmbeddableTimeline({ params }: EmbeddableTimelinePageProps) {
    const [instance, id] = params.slug
    if (instance && id) {
        return <Timeline instance={instance} id={id}></Timeline>
    }
    else {
        notFound()
    }
}
