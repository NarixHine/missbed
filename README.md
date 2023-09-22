# ![Missbed Icon](https://github.com/NarixHine/missbed/assets/127665924/232af2e8-6851-4c25-9f7f-68fca6aed008) Missbed

> A third-party embedding solution for Misskey.
> 
> ![Preview](https://github.com/NarixHine/missbed/assets/127665924/1935d23f-e348-4b77-acf2-35de8b06706a)

## Features

Missbed uses *Incremental Site Generation* with `Next.js`. **Fast. Flexible. Free to deploy your own.**

![PageSpeed](https://github.com/NarixHine/missbed/assets/127665924/518e01f7-00b6-4e9c-9d91-d72543c6d20d)

The following note components are supported:
- MFM (the syntax used in Misskey notes, usernames, etc.)
  - Mention
  - Hashtag
  - URL & Link (with OpenGraph support & no CORS proxy needed)
  - Bold
  - Quote
  - Centre
  - Small
  - Italic
  - Strike
  - Code
- Renote
- Images (including NSFW Warning)
- Hide Content
- Poll

Dark mode has now been supported. The system preference of the user is followed.

## Usage

### Use `missbed.narix.link`

Embed a note or a timeline of a user using `<iframe>`。

You can read your own UID in `Settings - Other`.

```html
<iframe src='https://missbed.narix.link/timeline/{instance}/{user_id}' />

<iframe src='https://missbed.narix.link/timeboard/{instance}/{user_id}' />

<iframe src='https://missbed.narix.link/note/{instance}/{note_id}' />
```

### Deploy your own

`missbed.narix.link` uses `@vercel/analytics` for analysis and no token for retrieving Misskey data. You can fork this repo, customise `pages/_app.tsx`, `lib/misskey.ts` as well as other related files, and deploy your modified version. Or simply click this button to deploy on Vercel directly.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FNarixHine%2Fmissbed)

## Use cases & examples

- [Yukimori (bot homepage)](https://yukimori.narix.link/)
- [Leaving.Ink (landing page)](https://leaving.ink/)
