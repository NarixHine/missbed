# Missbed

> An third-party embedding solution for Misskey.

Missbed uses Incremental Site Generation (ISR) with `Next.js` (`Pages` router).

## Features

Following Note components are supported:
- Images
- Hide Content
- Links (no OpenGraph Cards)

## Usage

You can embed a note or a timeline of a user using `<iframe>`。

You can read your own UID in `Settings - Other`.

```html
<iframe src='https://missbed.narix.link/timeline/{instance}/{user_id}' />

<iframe src='https://missbed.narix.link/timeboard/{instance}/{user_id}' />

<iframe src='https://missbed.narix.link/note/{instance}/{note_id}' />
```

## TODO 

- Support Enquête
