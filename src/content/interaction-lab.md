---
title: Interaction lab
description: A public test bed for reusable 2D and 3D interactions in future notes.
author: Hongbin Miao
layout: explorable
date: 2026-10-18
published: true
---

## Overview

This public lab demonstrates the interaction system used in future notes. The controls are described in [Building blocks](#building-blocks); the written explanation remains available when motion is reduced or 3D is unavailable.

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

Add a new `preset` in the interactive registry when a future note needs a different experiment. The coordinate layer follows [@D3 scales](https://d3js.org/d3-scale) so a future explorable can keep its data and drawing concerns separate.
