# Teams Origami Transition

A concept prototype for Microsoft Teams — when you click "Join now", the entire join screen folds into an origami crane, flies across the viewport, and disappears into the meeting room.

Life is full of distractions to take you away from the things you don't want to do. This explores the opposite: what if the uncomfortable moment itself became the delight? Instead of escapism, craft.

Built for the [Reve x Design Meetup Makeathon](https://luma.com/ldhaw009). We won 3rd!

---

## What it does

**Scene 1 — Join screen**
A faithful React mock of the Teams pre-meeting UI. You can toggle your camera, then hit "Join now".

**Scene 2 — Fold & flight**
The join screen is captured as a screenshot and mapped as a texture onto a flat paper mesh. The mesh folds into a crane over ~3 seconds — your UI literally printed on its wings — then the crane flies diagonally across the screen and exits.

**Scene 3 — Meeting room**
The crane is gone. The meeting has started.

---

## Tech stack

| Layer | Tool |
|---|---|
| Concept & ideation | [Reve 2.0](https://app.reve.com/) |
| UI (join + meeting screens) | React + Vite |
| Screen capture | html2canvas |
| Origami fold engine | [OrigamiSimulator](https://github.com/amandaghassaei/OrigamiSimulator) (Three.js / WebGL) |
| Crane flight animation | GSAP |

The fold physics are driven by Amanda Ghassaei's [OrigamiSimulator](https://github.com/amandaghassaei/OrigamiSimulator), a GPU-based origami engine built on Three.js. It runs in an embedded iframe and communicates with the React app via `postMessage`.

---

## Credits

Concept and pitch by [Christina Lu](https://www.christina-lu.com/) and [Ivan Song](https://ivansong.webflow.io/). Interaction built by Christina Lu.

- Origami fold engine — [Amanda Ghassaei](https://github.com/amandaghassaei/OrigamiSimulator) (MIT license)
- Built with [Claude Code](https://claude.ai/code)
