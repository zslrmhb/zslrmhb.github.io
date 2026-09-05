---
title: Interaction lab
description: A private regression page for the reusable visual widgets used in future notes.
author: Hongbin Miao
layout: explorable
published: false
---

This page is a testing surface, not a published note. It keeps the interaction contract visible while the visual language evolves.

```interactive
component: three-body
preset: figure-eight
controls: [play, reset, speed]
explore: true
```

The lab currently exercises:

- a responsive 2D Canvas plot with D3 coordinate scales;
- a Threlte scene with OrbitControls and a preserved camera state;
- reusable play, reset, range, toggle, segmented, and theme controls;
- reduced-motion and WebGL failure paths that leave the written explanation readable.

Keep this page unpublished. Add a new `preset` in the interactive registry when a future note needs a different experiment.
