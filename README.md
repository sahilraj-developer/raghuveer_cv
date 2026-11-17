# Raghuveer — creator & store portfolio

Next.js portfolio for a YouTuber and store owner. It shows the latest long-form videos and Shorts from YouTube, Instagram Reels/posts, and a store drop.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Social links and content fetching

The **Connect With Us** section uses the official Facebook, YouTube, and Instagram URLs in `lib/site.ts`. These are outbound profile links, open in a new tab, and do not require API credentials. The YouTube card links to `@nankutech`, whose latest videos and Shorts have their own channel section with YouTube branding, channel name, video thumbnails, titles, publish dates, and available view counts.

The content feeds are separate from those profile links:

- **YouTube videos and Shorts:** `lib/youtube-server.ts` reads the primary `@RaghuveerCV` channel and separately resolves the second `@nankutech` channel, then reads their public RSS feeds. It refreshes about hourly and needs no API key. If handle lookup is blocked, set `YOUTUBE_CHANNEL_ID` and `YOUTUBE_NANKUTECH_CHANNEL_ID` to the corresponding channel IDs. RSS provides public upload metadata; it does not provide subscriber counts or all analytics.
- **Instagram posts and Reels:** `lib/instagram.ts` first requests the Instagram Graph API when `INSTAGRAM_ACCESS_TOKEN` is configured. This requires an eligible Instagram professional account connected to a Meta app and an access token with media permissions. The token stays server-side and results are cached. If no usable API result is available, the app uses comma-separated public post/Reel URLs from `INSTAGRAM_POST_URLS`; these provide links only, not automatic captions, thumbnails, or account-wide updates. An empty result falls back to the profile link.
- **Facebook:** `lib/facebook.ts` fetches recent posts from a Facebook Page when `FACEBOOK_PAGE_ID` and `FACEBOOK_PAGE_ACCESS_TOKEN` are configured. The Meta app/token needs `pages_read_engagement` and `pages_read_user_content` plus appropriate Page access; Meta may also require Page Public Content Access for Pages the app does not manage. The supplied share URL remains the outbound link. A share URL or personal profile is not a Page ID and cannot authorize feed access. See Meta's [Page Feed API requirements](https://developers.facebook.com/docs/graph-api/reference/page/feed/).

For Instagram or Facebook API access, keep tokens in server environment variables and set them in the hosting provider's secret settings for deployment. Never commit access tokens. The public social links work without API credentials.

