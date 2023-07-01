import { api } from 'misskey-js'

const cli = (host: string) => new api.APIClient({
    origin: `https://${host}`
})

export default cli
