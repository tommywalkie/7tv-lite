# 7TV Lite

Lightweight client for browsing the latest [7TV](https://7tv.app/) emotes.

Based on Vue 3, Tanstack Query, and WindiCSS.

## Context

A much needed backend migration happened for 7TV on **10/21/24**, and it's a
vast improvement over the old system, there is still some room for improvement
but it is way more stable now.

However, we lost the ability to browse latest emotes on the website, a support
[post](https://discord.com/channels/817075418054000661/1298458293550977034) was
submitted on their Discord. One month later it was still not addressed.

Then I discovered that their [GraphQL API](https://7tv.io/v3/gql/playground)
still had a category for latest emotes, so I used it to make this simple
client. Also I wanted to pick up Vue again after a long time.

## License

MIT
