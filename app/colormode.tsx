'use client'

import { useEffect } from 'react'
import usePrefersColorScheme from 'use-prefers-color-scheme'

export default function ColorMode() {
    const mode = usePrefersColorScheme()
    useEffect(() => {
        document.documentElement.setAttribute('style', `color-scheme: ${mode === 'light' ? 'light' : 'dark'};`)
    }, [mode])
    return <></>
}
