---
title: "TIL: Using Wireshark to print UDP Data"
description: ""
author: "Arne Vogel"
date: 2023-09-21T10:36:48+09:00
lastModified: ""
language: "en"
listed: "yes"
customCSS: []
customJS: []
init: "no"
category: []
draft: false
---

You can use Wireshark to display the content of UDP packets.

To do this append `-Tfields -e data` to the wireshark command.

E.g. `sudo tshark -f "port not 53 and not arp and not tcp and not stp and not icmp6" -i enp65s0f0np0 -Tfields -e data`
