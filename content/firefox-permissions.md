---
title: "How I made the most intrusive Firefox extension"
description: ""
author: "Arne Vogel"
date: 2026-04-11T07:37:02+02:00
lastModified: ""
language: "en"
about: "no"
related: "no"
listed: "yes"
mathjax: "no"
toc: "no"
customCSS: []
customJS: []
init: "no"
category: []
draft: false
---

Or, how actually limiting the permissions of my web extension made me win the ["Middle Finger Emoji Sticker" Award](https://jack.cab/blog/every-firefox-extension#the-middle-finger-emoji-sticker-award) for requesting the most permissions of all Firefox extensions.

Two years ago I made a proof of concept web extension that warns users if they access a domain that has been identified by [watchlist internet](https://www.watchlist-internet.at/), [verbraucherschutz.com](https://www.verbraucherschutz.com/) or [verbraucherschutz.de](https://verbraucherschutz.de/) as a fake store.
At the time a lot of news outlets gave warnings on how to identify such fake stores and I thought why not automate this?

So I built a proof of concept: FalscheLaden (literal translation of "FakeStores" into German) which would [show a warning](https://github.com/ArneVogel/FalscheLaden/blob/master/falscheladen/warning.js) when accessing one of the already identified fake stores.

![FalscheLaden](/images/firefox-permissions/falscheladen.png)

## Permissions

So what permissions does such an extension need?
I need to access the fake store domains to show my warning, but I also don't want to access all websites.
So I tried this: can I hardcode the permissions to those [3695 domains](https://github.com/ArneVogel/FalscheLaden/blob/master/falscheladen/manifest.json#L7)?
And it turns out I could!

So my manifest.json (the file in which you request permissions) basically looks like this:

![manifest.json](/images/firefox-permissions/manifest.png)

And surprisingly I was able to add it like this to addons.
Which resulted in a ridiculously big list of requested permissions on the addons page.

![Access your data for sites in the $website domain: for 3695 websites](/images/firefox-permissions/permissions.jpg)

## Thoughts

Today, two years after publishing it, I discovered that FalscheLaden has the most requested permissions by the excellent blog post [Installing every* Firefox extension](https://jack.cab/blog/every-firefox-extension), as it never was my intention to achieve this.

I thought it was an interesting proof of concept that you don't necessarily have to request permissions to all websites if you have only a limited (though potentially huge) set of domains your extension needs to work on.
Of course it would be an issue for the specific use case of FalscheLaden as every update of the fake store list would require an update and the request of more permissions.
