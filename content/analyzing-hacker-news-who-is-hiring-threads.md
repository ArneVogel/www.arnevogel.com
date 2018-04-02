---
title: 'Analyzing Hacker News "Who Is Hiring" Threads'
description: ""
author: "Arne Vogel"
date: 2017-12-30T17:54:49+01:00
lastModified: ""
language: "en"
ads: "no"
share: "no"
email: "no"
about: "no"
related: "no"
listed: "yes"
category: ["visualization"]
draft: false
---

Analyzing 41194 comments and 6367099 words posted in Hacker News "Who is Hiring" threads. If you don't know what those threads are here is the latest one: [Ask HN: Who is hiring? (December 2017)](https://news.ycombinator.com/item?id=15824597)

In these threads companies can self promote their job offerings and in doing to they describe the jobs they are offering. 

In this post I show the most interesting things I found while playing around with the data. Note: don't take this too serious. I only did this for the fun of exploring and plotting data. This is no serious scientific and/or statistical analysis.

![words](/images/analyzing-hacker-news-who-is-hiring-threads/words.png)

One of the first things I did was look at how many top-level comments there were in each thread and how many words on average those comments had. The amount of companies promoting their jobs on Hacker News rose quite dramatically between 2015 and 2017. I don't think this has to do with the rise in popularity of Hacker News because the trend in google searches for Hacker News in the last [five years](https://trends.google.com/trends/explore?date=today%205-y&q=hacker%20news) has not risen on that level, it has even declined in the same period. 

Another thing I noticed is the decline in average words per post in the end of 2014. In a few months the average fell more than 30%. I have no idea what caused this decline. 

![data science](/images/analyzing-hacker-news-who-is-hiring-threads/data_science.png)

The mentions match with what you would expect. Collecting, working and getting insights from data got more and more important.

![go, rust, java, c++](/images/analyzing-hacker-news-who-is-hiring-threads/sys_prog.png)

The rise of Go is facinating. Already in the first year of the release of a [stable version](https://blog.golang.org/go-version-1-is-released) in 2012 it overtook c++ in mentions in the threads. And that even though Go is 14 ranks behind C++ in the Tiobe Index for [December 2017](https://www.tiobe.com/tiobe-index/).

![docker](/images/analyzing-hacker-news-who-is-hiring-threads/docker.png)

Docker also got off to a good start. First released on [13 March 2013](https://en.wikipedia.org/wiki/Docker_\(software\)) it quickly found it's way into the companies posting on Hacker News.

![germany](/images/analyzing-hacker-news-who-is-hiring-threads/germany.png)

The germans are invading. 

![os](/images/analyzing-hacker-news-who-is-hiring-threads/os.png)

Windows or Linux? Clearly Linux.

![javascript framework](/images/analyzing-hacker-news-who-is-hiring-threads/js_framework.png)

React outpacing Angular since 3 years.

<hr>

If you want to play around with the data yourself here is the data I got from the [Hacker News API](https://github.com/HackerNews/API) (as of 30.12.2017): [hn_hiring.json](/download/hn_hiring.json) (53mb). The json contains all the top level comments for each thread. The threads are sorted ascending by creation date.