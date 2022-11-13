---
title: "TIL: Window Resize Behavior on Mobile"
description: ""
author: "Arne Vogel"
date: 2022-11-13T11:44:25+01:00
lastModified: ""
language: "en"
listed: "yes"
customCSS: []
customJS: []
init: "no"
category: []
draft: false
---

When the url bar on mobile gets hidden it triggers a `window.resize`.
This is something I learned by a [PR for listudy](https://github.com/ArneVogel/listudy/pull/129).

In my code I had `window.onresize = resize_ground;` to adjust the size of the chess board when the browser window changed width.
But as [Sean Yeh](https://seanyeh.com/) in the PR pointed out this caused unintended behavior in mobile browsers.
When scrolling down the url bar would hide.
As this would trigger a `window.resize` and thus the chess board would get resized causing the page position to jump back to the top.

The simple solution was to just check for the width.

```
function onresize() {
    // Don't resize ground if the window width is unchanged
    if (window.innerWidth === window.window_width) {
        return;
    }

    window.window_width = window.innerWidth;
    resize_ground();
}
```

This works for listudy as the resize only actually cared about fixing the width so there would be no overlap.
