# Missbed

> A third-party embedding solution for Misskey.
![Preview](https://github.com/NarixHine/missbed/assets/127665924/69f0d483-8cf1-45b6-8d64-a07fcb1dba0d)

## Features

The following note components are supported:
- Mentions, Hashtags & Links (currently no OpenGraph support)
- Images (including NSFW Warning)
- Hide Content
- Enquête

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

`missbed.narix.link` uses `@vercel/analytics`. You can fork this repo, modify `_app.tsx`, and deploy yours. Or simply click this `Deploy with Vercel` button.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FNarixHine%2Fmissbed)
