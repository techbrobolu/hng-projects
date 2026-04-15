# Stage 0 — Todo Card

A static todo card UI component built with vanilla HTML, CSS, and JavaScript. Built as part of the HNG Frontend Track.

## Preview

The card displays a single todo item with a title, description, priority badge, status badge, due date, a live countdown, and category tags. Checking the card off triggers an animated collapse of content to signal completion.

---

## How to Run Locally

No build tools or dependencies required.

**1. Clone the repository**
run this in your terminal:

```bash
git clone https://github.com/techbrobolu/hng-projects.git
cd hng-projects/frontend-track/stage-0
```

**2. Open the project**

Option A — Open directly in the browser:
```
Double-click index.html
```

Option B — Use VS Code Live Server (recommended for auto-reload):
1. Install the [Live Server extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code
2. Open the `stage-0` folder in VS Code
3. Right-click `index.html` → **Open with Live Server**

---

## Decisions Made

**Vanilla HTML/CSS/JS — no framework**  
Keeping it framework-free felt right.

**CSS custom properties for the design system**  
All colors, font styles, and spacing tokens are defined in `:root`. This makes it easy to update the look globally without hunting through styles.

**Custom checkbox instead of native `<input type="checkbox">`**  
The native checkbox is visually hidden and a styled `<span>` sits in its place. This gives full control over the checked appearance (the blue fill + checkmark icon) without fighting browser defaults.

**`defer` on the script tag**  
This allows the script to be downloaded immediately the page loads but runs only after the DOM is parsed.

**`max-height` CSS transition for the collapse animation**  
When a todo is marked complete, the description, tags, and badges animate out using a `max-height` transition from a large value to `0`. This avoids JavaScript-driven animations and keeps the toggle logic simple.

**Countdown updates every minute, not every second**  
Once the display shifts from "x mins" to "x hrs" granularity, updating every second would be noise. The interval is set to 60 seconds after the initial render.

---

## Trade-offs

**`max-height` animation has uneven easing**  
Because `max-height` transitions from an arbitrary large value (e.g. `200px`) to `0`, the animation speed isn't linear relative to the actual content height — it can feel like it snaps rather than glides, depending on how much content is there. A JS-based approach measuring `scrollHeight` would be smoother but adds complexity.

**Hardcoded todo data**  
The card content (title, description, dates, tags) is written directly into the HTML. There's no dynamic data layer, so updating the card means editing the markup manually.

**No persistence**  
The complete state lives only in the DOM. Refreshing the page resets the card.
