---
title: "TIL: How to display Test Outputs in Rust"
description: ""
author: "Arne Vogel"
date: 2023-09-15T12:01:54+09:00
lastModified: ""
language: "en"
listed: "yes"
customCSS: []
customJS: []
init: "no"
category: []
draft: false
---

Add ` -- --nocapture` to the test command for prints in tests to display.

So the full command becomes `cargo test -- --nocapture`.


