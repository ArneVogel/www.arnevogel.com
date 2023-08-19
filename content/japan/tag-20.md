---
title: "Tag 20 - Napoleon in Ägypten"
description: ""
author: "Arne Vogel"
date: 2023-08-19T15:08:31+09:00
lastModified: ""
language: "de"
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


Heute war ich im Sumida Hokusai Museum.

![Hokusai Museum](hokusai-museum.jpg)

Hokusai ist der Künstler von **Die große Welle vor Kanagawa** von dem es auch einen Druck im Museum gab.

![Hokusai Die große Welle von Kanagawa](hokusai-welle.jpg)

Das Museum war wirklich gut gemacht.
Alle Bilder hatten englische Beschreibungen und es gab diese Terminals, an denen der geschichtliche Hintergrund zu jedem Bild erklärt wurde.
Es gab auch eine Chronik mit Ereignissen aus Hokusais Leben neben Ereignissen aus der Weltgeschichte.
Dadurch wurden die Lebensumstände von Hokusai (er lebte von 1760 bis 1849) noch einmal in einen Kontext gesetzt.

Ich hatte keine Ahnung, dass [Napoleon in Ägypten](https://de.wikipedia.org/wiki/%C3%84gyptische_Expedition) unterwegs war.

![Napoleon in Ägypten](bonaparte.jpg)
(Bonaparte beim Besuch des Pesthauses in Jaffa [Gemeinfreie Abildung](https://commons.wikimedia.org/wiki/File:Antoine-Jean_Gros_-_Bonaparte_visitant_les_pestif%C3%A9r%C3%A9s_de_Jaffa.jpg))

Wachsfiguren die Hokusai im alter mit seiner Tocher dargstellen:

![Hokusai im Alter](hokusai-wohnung.jpg)

---

Das Essen teile ich jetzt schon.


Nach dem Museum bin ich mit der anderen Praktikantin hier in der Nähe in ein [Restaurant](https://kikanbo.co.jp/) gegangen.
Sie hat dort schon öfter gegessen und jemand aus der Arbeitsgruppe hat es empfohlen.

![Essbares Feuer](feuer.jpg)

Wir haben beide die schärfste Version genommen…

Was man auf der Suppe sieht, ist Chili und Sansho-Pfeffer.

Und ich sag mal so, ich lasse das Ambiete für sich sprechen:

![ambiente](ambiente.jpg)
![ambiente](ambiente2.jpg)

Interessant ist, dass der Sansho-Pfeffer den Mund und die Lippen taub macht.
Ich hatte schon scharfes Essen, aber diese Taubheit war etwas ganz anderes.

Aber ich hab aufgegessen!

Zumindest den festen Teil der Suppe.
Ich habe 2 Löffel von der Suppe probiert und dann schnell aufgehört.

![Aufgegessen](aufgegessen.jpg)

---

Noch zwei Bilder vom Abendspaziergang.

Nochmal Kando Schrein:

![kando schrein](kando.jpg)

Und ein Bild aus dem Elektroviertel:

![Werbung in Chiyoda](werbung.jpg)

---

Ok heute habe ich gelernt, dass GitHub ein 100MB Datei limit hat.
Bzw. man sollte den `git push` abwarten bis man den Laptop zu klappt.
Das war der Grund warum der Eintrag von Gestern erst heute gekommen ist.

`remote: error: File content/japan/tag-19/metro.mp4 is 129.80 MB; this exceeds GitHub's file size limit of 100.00 MB`

Nach dem reencoding mit ffmpeg:

`remote: warning: File content/japan/tag-19/metro.mp4 is 77.77 MB; this is larger than GitHub's recommended maximum file size of 50.00 MB`

(und der Befehl, nur für mich nochmal `ffmpeg -i in.mp4 -c:a copy -c:v libx265 -crf 10 -preset ultrafast -s 1280x720 -pix_fmt yuv420p -map 0 out.mp4`).
(und der Befehl um die Bitrate zu limitieren `ffmpeg -i in.mp4 -b:v 4000k out.mp4`).

