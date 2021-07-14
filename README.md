A small video streaming demo platform built with Next.js using a custom video player, providing a streaming example following the DASH protocol.

Check it out to explore all features (such as keep watching, watchlist, tv show season list, etc.): https://next-video-streaming-platform-hls.vercel.app

## Frontend
- React.js
- Next.js
- Typescript
- SASS
- Redux
- Dash.js

## API
The following api is being utilized: https://developers.themoviedb.org/3/getting-started/introduction

## Static Site Generation
Overview pages like "Home", "TV" and "Movie" are being pre-rendered on build and revalidated every hour (page visit premised), hence are extremely performant and barely have any loading time. 

Single detail pages could have been statically optimized as well, but the movie API to this state is not suitable for ssg, hence they are being rendered server side. 

![Preview](https://github.com/timfuhrmann/next-video-streaming-platform-hls/blob/develop/public/readme-preview.png)

## Dynamic Adaptive Streaming
"Dynamic Adaptive Streaming over HTTP (DASH), also known as MPEG-DASH, is an adaptive bitrate streaming technique that enables high quality streaming of media content over the Internet delivered from conventional HTTP web servers. Similar to Apple's HTTP Live Streaming (HLS) solution, MPEG-DASH works by breaking the content into a sequence of small segments, which are served over HTTP.
For demo purposes the same demo video is being used for every media item." [Read more.](https://en.wikipedia.org/wiki/Dynamic_Adaptive_Streaming_over_HTTP)

## Custom Media Player
The application uses its own custom media player. Because of missing resources audio and subtitle selection are not included but could easily be implemented.

![Media Player](https://github.com/timfuhrmann/next-video-streaming-platform-hls/blob/develop/public/readme-media-player.png)

## SEO
In terms of SEO the application is optimized and provides suitable tags for every media item generated server side.

![SEO](https://github.com/timfuhrmann/next-video-streaming-platform-hls/blob/develop/public/readme-seo-demo.png)

## Getting Started

Make sure to copy paste the `.env.public` contents to your local dotenv file and fill in the missing fields.

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
