---
title: "The Hardest Lakes of Kalandra"
description: "Finding the maximum difficulty for Path of Exiles Lake of Kalandra expansion"
author: "Arne Vogel"
date: 2022-08-13T14:13:15+02:00
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

In the [latest expansion](https://www.pathofexile.com/kalandra) of Path of Exile you can create your own areas to play in.
An example of this can be seen below:

![Example difficulty calculation](/images/the-hardest-lakes-of-kalandra/difficulty.png)

The area is constructed by placing tiles on a board.
You enter the area from one of the land tiles.

Moving away from the starting tile causes the difficulty to increase.
Further away = more difficult areas, but also more rewards.
In the example the highest difficulty is 10.

## The highest difficulty for different grids
The trailer for the expansion shows different boards of different sizes.
So what is the highest difficulty (and reward) you could achieve on any board size?

What we are looking for is the longest path from the starting location to any other tile on the board.
See the [algorithm](#algorithm) I used to solve this problem.

The first one are quite obvious:

![2x2_0.png](/images/the-hardest-lakes-of-kalandra/2x2_0.png)
![2x2_1.png](/images/the-hardest-lakes-of-kalandra/2x2_1.png)
![3x2_0.png](/images/the-hardest-lakes-of-kalandra/3x2_0.png)
![3x3_0.png](/images/the-hardest-lakes-of-kalandra/3x3_0.png)

The 3x4 board continues with the "U" shape, but introduces a new kink.

![3x4_0.png](/images/the-hardest-lakes-of-kalandra/3x4_0.png)
![3x4_1.png](/images/the-hardest-lakes-of-kalandra/3x4_1.png)
![3x4_2.png](/images/the-hardest-lakes-of-kalandra/3x4_2.png)

In the 3x5 board the pattern continues, but this time a "2" pattern is introduced.

![3x5_0.png](/images/the-hardest-lakes-of-kalandra/3x5_0.png)
![3x5_1.png](/images/the-hardest-lakes-of-kalandra/3x5_1.png)
![3x5_2.png](/images/the-hardest-lakes-of-kalandra/3x5_2.png)
![3x5_3.png](/images/the-hardest-lakes-of-kalandra/3x5_3.png)

Variations of the "2" are the most optimal for the 3x6 and 3x7 boards.

![3x6_0.png](/images/the-hardest-lakes-of-kalandra/3x6_0.png)
![3x7_0.png](/images/the-hardest-lakes-of-kalandra/3x7_0.png)

More chaotic patterns for 4x7 boards.

![4x7_0.png](/images/the-hardest-lakes-of-kalandra/4x7_0.png)
![4x7_1.png](/images/the-hardest-lakes-of-kalandra/4x7_1.png)

Some different patterns for the 5x4 boards.

![5x4_0.png](/images/the-hardest-lakes-of-kalandra/5x4_0.png)
![5x4_1.png](/images/the-hardest-lakes-of-kalandra/5x4_1.png)
![5x4_2.png](/images/the-hardest-lakes-of-kalandra/5x4_2.png)
![5x4_3.png](/images/the-hardest-lakes-of-kalandra/5x4_3.png)
![5x4_4.png](/images/the-hardest-lakes-of-kalandra/5x4_4.png)
![5x4_5.png](/images/the-hardest-lakes-of-kalandra/5x4_5.png)
![5x4_6.png](/images/the-hardest-lakes-of-kalandra/5x4_6.png)
![5x4_7.png](/images/the-hardest-lakes-of-kalandra/5x4_7.png)
![5x4_8.png](/images/the-hardest-lakes-of-kalandra/5x4_8.png)

Quite a lot more patterns for the 5x5 board.

![5x5_0.png](/images/the-hardest-lakes-of-kalandra/5x5_0.png)
![5x5_1.png](/images/the-hardest-lakes-of-kalandra/5x5_1.png)
![5x5_3.png](/images/the-hardest-lakes-of-kalandra/5x5_3.png)
![5x5_4.png](/images/the-hardest-lakes-of-kalandra/5x5_4.png)
![5x5_5.png](/images/the-hardest-lakes-of-kalandra/5x5_5.png)
![5x5_6.png](/images/the-hardest-lakes-of-kalandra/5x5_6.png)
![5x5_7.png](/images/the-hardest-lakes-of-kalandra/5x5_7.png)
![5x5_8.png](/images/the-hardest-lakes-of-kalandra/5x5_8.png)
![5x5_9.png](/images/the-hardest-lakes-of-kalandra/5x5_9.png)
![5x5_10.png](/images/the-hardest-lakes-of-kalandra/5x5_10.png)
![5x5_11.png](/images/the-hardest-lakes-of-kalandra/5x5_11.png)
![5x5_12.png](/images/the-hardest-lakes-of-kalandra/5x5_12.png)
![5x5_13.png](/images/the-hardest-lakes-of-kalandra/5x5_13.png)
![5x5_14.png](/images/the-hardest-lakes-of-kalandra/5x5_14.png)
![5x5_15.png](/images/the-hardest-lakes-of-kalandra/5x5_15.png)
![5x5_16.png](/images/the-hardest-lakes-of-kalandra/5x5_16.png)
![5x5_17.png](/images/the-hardest-lakes-of-kalandra/5x5_17.png)
![5x5_18.png](/images/the-hardest-lakes-of-kalandra/5x5_18.png)
![5x5_19.png](/images/the-hardest-lakes-of-kalandra/5x5_19.png)

Only one optimal pattern for the 5x6 board.

![5x6_0.png](/images/the-hardest-lakes-of-kalandra/5x6_0.png)

And then again quite a few patterns for the 6x6 board.

![6x6_0.png](/images/the-hardest-lakes-of-kalandra/6x6_0.png)
![6x6_1.png](/images/the-hardest-lakes-of-kalandra/6x6_1.png)
![6x6_2.png](/images/the-hardest-lakes-of-kalandra/6x6_2.png)
![6x6_3.png](/images/the-hardest-lakes-of-kalandra/6x6_3.png)
![6x6_4.png](/images/the-hardest-lakes-of-kalandra/6x6_4.png)
![6x6_5.png](/images/the-hardest-lakes-of-kalandra/6x6_5.png)
![6x6_6.png](/images/the-hardest-lakes-of-kalandra/6x6_6.png)
![6x6_7.png](/images/the-hardest-lakes-of-kalandra/6x6_7.png)
![6x6_8.png](/images/the-hardest-lakes-of-kalandra/6x6_8.png)
![6x6_9.png](/images/the-hardest-lakes-of-kalandra/6x6_9.png)
![6x6_10.png](/images/the-hardest-lakes-of-kalandra/6x6_10.png)
![6x6_11.png](/images/the-hardest-lakes-of-kalandra/6x6_11.png)
![6x6_13.png](/images/the-hardest-lakes-of-kalandra/6x6_13.png)
![6x6_12.png](/images/the-hardest-lakes-of-kalandra/6x6_12.png)
![6x6_14.png](/images/the-hardest-lakes-of-kalandra/6x6_14.png)
![6x6_15.png](/images/the-hardest-lakes-of-kalandra/6x6_15.png)
![6x6_16.png](/images/the-hardest-lakes-of-kalandra/6x6_16.png)
![6x6_17.png](/images/the-hardest-lakes-of-kalandra/6x6_17.png)
![6x6_18.png](/images/the-hardest-lakes-of-kalandra/6x6_18.png)
![6x6_19.png](/images/the-hardest-lakes-of-kalandra/6x6_19.png)
![6x6_20.png](/images/the-hardest-lakes-of-kalandra/6x6_20.png)
![6x6_21.png](/images/the-hardest-lakes-of-kalandra/6x6_21.png)


The 7x6 board is the biggest board I was able to check with my [algorithm](#algorithm):

![7x6_0.png](/images/the-hardest-lakes-of-kalandra/7x6_0.png)
![7x6_1.png](/images/the-hardest-lakes-of-kalandra/7x6_1.png)

Some 10x2 patterns.

![10x2_0.png](/images/the-hardest-lakes-of-kalandra/10x2_0.png)
![10x2_1.png](/images/the-hardest-lakes-of-kalandra/10x2_1.png)
![10x2_2.png](/images/the-hardest-lakes-of-kalandra/10x2_2.png)
![10x2_3.png](/images/the-hardest-lakes-of-kalandra/10x2_3.png)
![10x2_4.png](/images/the-hardest-lakes-of-kalandra/10x2_4.png)
![10x2_5.png](/images/the-hardest-lakes-of-kalandra/10x2_5.png)



## Algorithm
The [source code](https://github.com/ArneVogel/lakes-of-kalandra) used to generate these images is open source.
I am not claiming that the source code represents the most optimal way to generate these paths.

First I generate a graph representing the board:

![the graph](/images/the-hardest-lakes-of-kalandra/graph.png)

In this graph I generate all paths between any two nodes.
From these paths I ignore paths here two nodes "meet" without a edge connecting them, as this would create shortcuts:

![invalid join](/images/the-hardest-lakes-of-kalandra/invalid2.png)

Finally I just take the longest path from all the remaining paths.

While not exactly a efficient solution, it works.

And what else can you hope for, for a (maybe?) NP-Hard problem: [longest path problem](https://en.wikipedia.org/wiki/Longest_path_problem).
