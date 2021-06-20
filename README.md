A small video streaming platform built with Next.js using a custom video player, providing a streaming example using the HLS protocol.

Check it out to explore all features: https://next-video-streaming-platform-hls.vercel.app

## API
The following api is being utilized: https://developers.themoviedb.org/3/getting-started/introduction

## Static Site Generation
Overview pages like "Home", "TV" and "Movie" are being pre-rendered on build and revalidated every hour (page visit premised), hence are extremely performant and barely have any loading time. 

Single detail pages could have been statically optimized as well, but unfortunately the movie API is not suitable in this way, hence they are being rendered server side. 

![Media Player](https://github.com/timfuhrmann/next-video-streaming-platform-hls/blob/develop/public/readme-preview.png)

## Video Streaming (HLS)
HLS breaks down video files into smaller downloadable HTTP files and delivers them using the HTTP protocol. This approach provides several advantages such as smaller loading times, adaptive bitrate video delivery [and more.](https://developer.apple.com/documentation/http_live_streaming)

Because of missing resources, the same demo video is being used for every media item.

## Custom Media Player
The application uses its own custom media player. Unfortunately the audio and subtitle selection had to be removed because of missing support
by the demo video.

![Media Player](https://github.com/timfuhrmann/next-video-streaming-platform-hls/blob/develop/public/media-player.png)

## SEO
In terms of SEO the application is optimized and provides suitable meta tags for every media item generated server side:

![SEO](https://github.com/timfuhrmann/next-video-streaming-platform-hls/blob/develop/public/readme-seo.png)

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
