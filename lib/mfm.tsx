import { MfmNode, toString, parse } from 'mfm-js'
import { ReactNode } from 'react'
import { CopyBlock, github } from 'react-code-blocks'

export default class MfmConverter {
    instance: string = 'misskey.io'

    constructor(instance?: string) {
        if (instance)
            this.instance = instance
    }

    toReact(node: MfmNode, children: ReactNode) {
        switch (node.type) {
            case 'bold':
                return <span className='font-bold'>{children}</span>
            case 'quote':
                return <blockquote className='relative text-stone-600 border-l border-solid border-stone-600 pl-2 m-2 ml-4'>{children}</blockquote>
            case 'link':
                return <a href={node.props.url} target='_blank' rel='noreferrer' className='font-mono text-link'>{children}</a>
            case 'center':
                return <div className='text-center'>{children}</div>
            case 'small':
                return <small>{children}</small>
            case 'italic':
                return <span className='italic'>{children}</span>
            case 'strike':
                return <span className='line-through'>{children}</span>

            // no children
            case 'mention':
                return <a className='text-link' href={`https://${node.props.host ?? this.instance}/@${node.props.username}`} target='_blank' rel='noreferrer'>{node.props.acct}</a>
            case 'url':
                const { url } = node.props
                const [protocol, empty, host, ...paths] = url.split('/')
                return (<a href={url} target='_blank' rel='noreferrer' className='text-link font-mono'>
                    <span className='opacity-60 text-sm'>{`${protocol}//`}</span>
                    <span className='font-bold'>{host}</span>
                    <span className='opacity-80 text-sm'>/{paths.join('/')}</span>
                </a>)
            case 'hashtag':
                return <a className='text-link' href={`https://${this.instance}/tags/${node.props.hashtag}`} target='_blank' rel='noreferrer'>#{node.props.hashtag}</a>
            case 'text':
                return <>{node.props.text}</>
            case 'blockCode':
                return <CopyBlock
                    // @ts-ignore
                    text={node.props.code}
                    language={node.props.lang ?? 'text'}
                    showLineNumbers={true}
                    theme={{ ...github, mode: 'dark' }}
                />
            case 'inlineCode':
                return <code>{node.props.code}</code>

            default:
                return <>{toString(node)}</>
        }
    }

    recur(node: MfmNode[] | MfmNode): ReactNode {
        if (Array.isArray(node)) {
            return node.map(node => this.recur(node))
        }
        else {
            const { children } = node
            if (children)
                return this.toReact(node, this.recur(children))
            else
                return this.toReact(node, <></>)
        }
    }

    convert(text: string) {
        return this.recur(parse(text))
    }
}
