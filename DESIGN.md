# Portfolio Design Direction

## 1. Design Goal

Create a distinctive personal developer portfolio inspired by two websites:

* https://landonorris.com/ for its layouts, visual storytelling, and scroll-driven animations.
* https://www.formula1.com/ for its color palette, typography, and bold visual identity.

The portfolio should feel like a carefully designed personal website, not a generic AI-generated developer template.

Use these websites as inspiration, not as templates to copy. The portfolio must have its own identity and reflect my projects, experience, and personality.

Keep the existing website and improve it incrementally. Do not rebuild it from scratch unless necessary.

## 2. Visual Identity

### Colors

Use a Formula 1-inspired palette:

* Primary red: #E10600
* Dark background: #15151E
* Black: #000000
* Off-white: #F5F5F5
* White: #FFFFFF

Use red as an accent for important elements, active states, and selected highlights.

Use dark backgrounds and white text for strong contrast. Off-white can be used for lighter sections.

Avoid adding unnecessary colors. The design should remain visually consistent.

These are starting colors inspired by Formula 1, not an exact reproduction of its official branding.

### Typography

Use Titillium Web or another suitable open-source font.

Typography should be bold, clean, and readable.

Use:

* Large, expressive headings.
* Strong contrast between headings and body text.
* Clear differences in font size and weight.
* Condensed or bold typography where appropriate.

Avoid excessive letter spacing and unnecessary uppercase text.

Do not use Formula 1's proprietary typeface or copy its official logo.

## 3. Layout and Composition

Take inspiration from the Lando Norris website.

Use:

* Large, impactful hero sections.
* Asymmetrical layouts where they serve a purpose.
* Strong visual hierarchy.
* Generous but intentional spacing.
* Full-width sections when appropriate.
* Different compositions for different sections.

Do not make every section follow the same centered heading and three-card layout.

Avoid excessive empty space that does not contribute to the design.

The layout should feel connected as the user scrolls through the portfolio.

## 4. Scroll-Driven Text Animation

One of the most important design features is the text highlight animation inspired by the Lando Norris website.

Create a scroll-driven text reveal effect.

Expected behavior:

1. Text begins in a muted or less prominent color.
2. As the user scrolls, a highlight moves across the text.
3. Words gradually become fully visible or change to the highlighted color.
4. The animation progress should follow the user's scroll position.
5. The effect should feel smooth and natural.

Use this effect for selected headings, introductory text, or important descriptions.

Do not apply it to every paragraph. Keep ordinary body text easy to read.

The effect must work on desktop and mobile.

Respect the user's reduced-motion preference. If reduced motion is enabled, display the text normally without requiring scrolling to reveal it.

## 5. Animations and Interactions

Take inspiration from the smooth transitions and immersive scrolling of the Lando Norris website.

Use animations only when they improve the experience.

Possible effects:

* Scroll-driven text highlights.
* Subtle image reveals.
* Smooth section transitions.
* Purposeful hover effects.
* Carefully chosen entrance animations.

Avoid:

* Constantly pulsing elements.
* Excessive glowing effects.
* Animations that delay access to content.
* Unnecessary parallax effects.
* Animations that make the site difficult to navigate.

Ensure animations do not interfere with usability or performance.

## 6. Components

### Navigation

Create a clean, functional navigation bar.

It should be easy to use on desktop and mobile.

Avoid excessive glassmorphism, glowing effects, and unnecessary decorative elements.

### Hero

Make the hero section visually memorable.

Use large typography and a clear introduction.

Present my name, role, and a concise description of what I do.

Include clear links to my projects and contact information without relying on generic CTA phrases.

### Skills

Present skills in a way that reflects their actual importance and my experience.

Avoid making every skill an identical card with a gradient icon.

### Experience and Research

Prioritize readability and clear information.

Use layouts that distinguish work experience from research and publications.

Keep all claims accurate. Do not exaggerate responsibilities, achievements, or publication status.

### Projects

Give important projects enough visual space.

Use screenshots, descriptions, technologies, and links where available.

Avoid presenting every project in an identical card.

Make the projects themselves the focus.

### Contact

Keep the contact section simple and easy to use.

Avoid generic phrases such as "Let's Build Together."

Use natural wording that reflects my personality.

## 7. Responsive Design

The website must work well on desktop, tablet, and mobile.

Do not simply shrink the desktop layout.

Reorganize content when necessary to make it comfortable to use on smaller screens.

Ensure:

* Text remains readable.
* Buttons have comfortable tap targets.
* Images scale correctly.
* Animations work on touch devices.
* No content is unintentionally clipped.
* Navigation is accessible.

## 8. Accessibility

Maintain sufficient color contrast.

Provide visible keyboard focus indicators.

Ensure all interactive elements can be operated using a keyboard.

Do not rely on hover alone to reveal important controls.

Support reduced-motion preferences.

Make sure all important content remains accessible if JavaScript fails.

## 9. Anti-Slop Rules

Avoid common generic AI-generated design patterns:

* Excessive cyan-to-purple gradients.
* Glassmorphism on every component.
* Glowing borders and shadows everywhere.
* Identical cards repeated throughout the page.
* Generic icons used without a clear purpose.
* Excessively rounded buttons and containers.
* Repetitive section layouts.
* Generic AI-sounding copywriting.
* Unnecessary animations and decorative elements.

Every major design choice should have a clear purpose.

## 10. Implementation Rules

Before modifying the website:

1. Read this DESIGN.md.
2. Read the installed Anti-Slop skills.
3. Review the existing website and its audit.
4. Identify which changes are necessary and which are optional.
5. Present a plan before making significant changes.

Preserve existing working features, project information, links, and functionality.

Make changes incrementally. Do not rewrite the entire website unnecessarily.

After implementation, test the website at desktop, tablet, and mobile sizes.

Check accessibility, performance, and reduced-motion behavior.

## 11. Final Design Principle

The portfolio should feel like a personal website designed with intention.

Use the visual storytelling and scrolling experience of the Lando Norris website as inspiration, and the bold typography and restrained red, black, and white palette of Formula 1 as inspiration.

Do not copy either website directly.

The final result should be recognizable as my own portfolio, with my projects and personality at the center.
