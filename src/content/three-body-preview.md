---
title: Three bodies, one quiet rhythm
description: Three equal masses share a single path. Start by watching, then look at the rule beneath the motion.
author: Hongbin Miao
layout: explorable
published: false
---

## Start with a question

Give three objects a position, a velocity, and a rule for attracting one another. What happens next?

Not every three-body orbit looks chaotic. With a particular set of initial conditions, three equal masses follow the same figure-eight path, each arriving at a different moment. Before reaching for an equation, take a moment to watch.

```interactive
component: three-body
preset: figure-eight
controls: [play, reset, speed]
explore: true
```

## Follow one body

Press **Play** and follow the red point. It crosses the center, moves around one side, and returns through the other. The remaining bodies trace the same path at different phases.

Lower the playback speed to see the crossing more clearly. This changes how quickly you watch the calculation, **not the force or the masses**. Reset returns to the same initial conditions.

> A shared path does not mean a simple explanation. Sometimes the useful first step is to look again.

## The rule beneath the motion

Each body accelerates toward the other two. For this example, all masses and the gravitational constant are set to one in normalized units.

```math
F = \frac{G m_1 m_2}{r^2}
```

This equation gives the magnitude of the attraction between a pair of bodies. Its direction follows the line between them; the simulation adds the contributions from both neighbors.

The following code shows one pairwise acceleration contribution. The animation uses a fixed-step numerical integrator, so the visible path is an approximation.

```javascript
function accelerationFromNeighbor(position, neighbor, mass) {
	const dx = neighbor.x - position.x;
	const dy = neighbor.y - position.y;
	const distance = Math.hypot(dx, dy);
	const scale = mass / distance ** 3; // G = 1

	return { x: dx * scale, y: dy * scale };
}
```

This small example assumes distinct positions. A general simulator also needs to handle close encounters and numerical error.

## A special solution

The figure-eight is a particular periodic solution, not a picture of how every three-body system behaves. Different starting conditions need not preserve the same closed path.

I like using a small experiment alongside a written explanation: one makes the behavior visible, the other gives us space to question what we have seen.

### References

- Chenciner and Montgomery, [A remarkable periodic solution of the three-body problem in the case of equal masses](https://arxiv.org/abs/math/0011268).
- My [Three Body Problem project](https://github.com/zslrmhb/Three-Body-Problem).
