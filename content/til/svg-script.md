---
title: "TIL: When a SVG Script will execute (and when it won't)"
description: ""
author: "Arne Vogel"
date: 2023-08-21T10:05:34+09:00
lastModified: ""
language: "en"
listed: "yes"
customCSS: []
customJS: []
init: "no"
category: []
draft: false
---

Ok, SVGs can have [script elements](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/script) where you can add regular JavaScript.
But the script won't always be executed when you add it to a page.

---

This script will execute if you add the the SVG directly in the HTML. E.g.,

```
<body>
<svg
  viewBox="0 0 10 10"
  height="120px"
  width="120px"
  xmlns="http://www.w3.org/2000/svg">
  <circle cx="5" cy="5" r="4" />

  <script>
    alert("hi");
  </script>
</svg>
</body>
```

[direct.html](direct.html)

---

But not if you add the SVG in an image tag. The image will show but the script won't be executed. E.g.,

```
<body>
    <img src="test.svg">
</body>
```

[img.html](img.html)

---

Instead you can use an `embed` to add the image, which will execute the script. E.g.
```
<body>
    <embed src="test.svg">
</body>
```

[embed.html](embed.html)


