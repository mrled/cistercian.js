# Preview images

I generate social preview images for `og:image` and `twitter:image`.

This is done via `puppeteer` on the server, which loads a special `/preview/[number]` route that has no site chrome and is only used for this purpose, and then takes a screenshot.

This runs on the backend, which since I'm deploying to Vercel means it runs as a Vercel Serverless Function.

## Manual caching

Initially I was doing manual caching, which kept a `_puppeteer_screenshots_` directory in the repo, and saved screenshots there. This worked fine locally, but when deploying to Vercel, apparently the Functions don't have access to the git repo checkout dir. I logged the CWD and its contents, which showed this:

```
Node CWD: /var/task.next
node_modules
now__bridge.js
now__launcher.js
```

To fix this, I might change the code to just keep the screenshots in the CWD.

## Allowing NextJS API to read files

Apparently, this is not possible: <https://github.com/vercel/next.js/issues/8251>

Although it is possible for "Node.js Serverless Functions", it is NOT possible for "Next.js SSR page(s) or function(s)": <https://vercel.com/knowledge/how-can-i-use-files-in-serverless-functions>

Note that Vercel Functions do not even get the contents of your `/public` directory (which Next uses for static files).

## Automatic Vercel caching

However, I don't think this is necessary, per <https://vercel.com/docs/edge-network/caching>. I can just include a `Cache-Control` header with one of the prescribed values, and the CDN will handle that for me automatically. That's probably good enough.

## What about the default image?

The default image is saved as a file and I want to keep it as a fallback, so that even if there is trouble with `puppeteer` or screenshot generation otherwise fails, it won't give a 5xx error.

I think to do this, I will just base64 encode it and keep it in `lib/`. lol.
