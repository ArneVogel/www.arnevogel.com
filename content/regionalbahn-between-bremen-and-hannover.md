---
title: "Regionalbahn Between Bremen and Hannover"
description: "Regionalbahn between bremen and hannover visualized"
author: "Arne Vogel"
date: 2018-03-17T16:25:15+01:00
lastModified: ""
language: "en"
ads: "no"
share: "no"
email: "no"
about: "no"
related: "no"
listed: "yes"
mathjax: "no"
category: ["R","python", "visualization"]
draft: false
---

While traveling with the Deutsche Bahn I noticed that they broadcast amongst others the speed and the position of the train under this url: https://www.wifi-bahn.de/schedule.jason

This is the result of logging the positions and speeds and plotting them with R's ggmap:

![](/images/regionalbahn-between-bremen-and-hannover/rb.png)

The speed is in m/s, each point is after 30 seconds.

Logging with: [bahnlog.py](/download/bahnlog.py)

Plotting with: [bahn.Rmd](/download/bahn.Rmd)