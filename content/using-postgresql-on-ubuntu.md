---
title: "Using Postgresql on Ubuntu"
description: ""
author: "Arne Vogel"
date: 2018-01-18T11:56:52+01:00
lastModified: ""
language: "en"
ads: "no"
share: "no"
email: "no"
about: "no"
related: "no"
listed: "yes"
mathjax: "no"
category: ["postgresql", "ubuntu"]
draft: no
---

Logging into psql as postgres user: 

	sudo -u postgres psql

Switching databases: 

	\c [DB NAME]

Executing an example query: 

	SELECT * from user;

Note that `SELECT` has to be capitalized, otherwise it will result in a syntac error. Also don't forget the `;` at the end of the query.

Exiting psql: 

	\q