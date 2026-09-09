---
title: Interaction lab
description: A test page for the reusable visual widgets used in future notes.
author: Hongbin Miao
layout: explorable
published: true
---

## Overview

This page is a testing surface, not a published note. It keeps the interaction contract visible while the visual language evolves. The controls below are described in [Building blocks](#building-blocks); the readable explanation remains the source of truth when motion is reduced.

## Experiment

```interactive
component: three-body
preset: figure-eight
controls: [play, reset, speed]
explore: true
```

The lab currently exercises the same scene contract used by [@Threlte](https://threlte.xyz/): a written idea, a light 2D view, and an optional 3D view.

## Building blocks

- a responsive 2D Canvas plot with D3 coordinate scales;
- a Threlte scene with OrbitControls and a preserved camera state;
- reusable play, reset, range, toggle, segmented, and theme controls;
- reduced-motion and WebGL failure paths that leave the written explanation readable.

Keep this page unpublished. Add a new `preset` in the interactive registry when a future note needs a different experiment. The coordinate layer follows [@D3 scales](https://d3js.org/d3-scale) so a future explorable can keep its data and drawing concerns separate.
