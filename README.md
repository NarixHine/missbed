# Missbed

> A third-party embedding solution for Misskey.
![Preview](https://github.com/NarixHine/missbed/assets/127665924/69f0d483-8cf1-45b6-8d64-a07fcb1dba0d)

Missbed uses Incremental Site Generation (ISR) with `Next.js` (`Pages` router).

## Features

The following Note components are supported:
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
