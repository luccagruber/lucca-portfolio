\# Portfolio Vision

\#\# Overview

This portfolio is designed as an interactive experience rather than a conventional website.

Visitors do not arrive at a homepage—they arrive at my workspace.

The opening scene presents a familiar corporate cubicle, viewed from the perspective of someone standing in front of my desk. The environment should feel immediately recognizable: calm, ordinary, organized, and intentionally understated.

My work is not presented through cards or sections.

Instead, my projects physically exist inside my desk's drawer, waiting to be opened like real project files.

The experience is built around a single metaphor, and that metaphor should never be broken.

Everything personal lives inside that same metaphor: who I am is written on the back of the photograph standing on the desk — click the picture frame and the print turns over.

Only contact remains below the scene: a plain, full-width rail at the foot of the page, prioritizing clarity and usability. There is no separate "traditional portfolio" anymore.

\---

\# Core Concept

Imagine visiting someone's workspace.

The desk belongs to me.

Its drawer stores my work.

To understand what I've built, you open the project files exactly as someone would inside a real office.

Nothing more.

Nothing less.

\---

\# Design Principles

\- Personal without feeling playful.  
\- Professional without feeling corporate.  
\- Memorable without relying on spectacle.  
\- Calm, deliberate and confident.  
\- Minimal, never empty.  
\- Every visible object has a reason to exist.  
\- The desk drawer is always the visual protagonist.  
\- The interaction teaches itself.  
\- Remove everything that distracts from the metaphor.

Whenever realism conflicts with usability, usability wins—but the illusion should always be preserved.

\---

\# Rendering Style

The desk is a real 3D model with its wood texture — weighted, believable, with a built-in working drawer.

Everything on it is rendered as high-quality stylized 3D, generated in code and swappable for real models later.

Not photorealistic.

Not cartoon.

Think of premium animated product renders with:

\- soft shadows  
\- rounded geometry  
\- matte materials  
\- subtle imperfections  
\- believable proportions  
\- physically plausible lighting

The goal is warmth, familiarity and clarity.

\---

\# Workspace Palette

Desk  
\- Natural wood (from the real model)

Room  
\- Quiet warm grays (floor \#D8D4CC, wall \#E3E0DA)

Folders  
\- Classic Manila  
\- Warm Cream (\#D9C89E)

Coffee Cup  
\- White paper Starbucks cup (real model, credited)

Picture Frame  
\- Matte black

Nameplate  
\- Matte black, engraved lettering

Click hotspot  
\- Flat unlit black dot-and-ring (\#141414) — the one mark that is not pretending to be real

Page foot (below the scene)  
\- Light greys easing from the stage color (\#E9E7E2) into \#D6D5D1  
\- Dark chocolate ink (\#43291A) — reads brown at a glance, still dark enough for small print

Overall palette

Neutral.

Quiet.

Corporate.

No saturated colors.

Project colors never appear outside project files.

\---

\# Scene Composition

The camera sits very close, straight in front of the desk, slightly low — you are seated at it, inside the space.

It never yaws, never tilts, and never reacts to mouse movement. The scene is completely static except intentional animated moments.

The composition focuses only on the desk and its drawer.

The room itself is intentionally ignored.

Visible objects:

\- Office desk (with its drawer)  
\- Nameplate  
\- Picture frame — the door to About, marked by the desk's only click hotspot  
\- Closed MacBook, centered between the left and right prop clusters  
\- Notebook with glasses resting on it  
\- Starbucks coffee cup

Never include:

\- monitors  
\- keyboards  
\- open screens of any kind  
\- decorative objects  
\- unnecessary clutter

The workspace should feel like the idealized version of an everyday corporate cubicle.

\---

\# Opening Experience

The portfolio opens directly inside the workspace.

There are no instructions.

No hero section.

No CTA.

No onboarding.

Two quiet cues and nothing else: a scroll hint at the foot of the stage (the word, a rail, a lit segment travelling down it) and the click hotspot floating above the photograph, pulsing a slow ring outward.

Users naturally scroll.

The first small downward scroll (approximately 100–150px) triggers a single animation.

The animation is NOT controlled continuously by scroll.

Instead, scrolling simply starts the sequence.

Sequence:

\- the desk drawer slides open with weight  
\- camera barely eases forward — just enough added depth  
\- two folders rise into view from inside

The animation finishes independently.

Afterwards, the scene becomes static again.

If the user returns to the very top of the page, the reverse animation plays once.

\---

\# Projects

Exactly two folders exist.

Never more.

Folder appearance:

\- classic American manila folders  
\- cream / yellow  
\- no branding  
\- no icons  
\- only the project name on the tab

Projects

\- Accul Rebugr  
\- Gruber Goal

The outside of every folder remains visually neutral.

Each project's visual identity begins only after opening.

\---

\# Project Experience

Selecting a folder lifts it out of the drawer. It floats toward you and its front cover swings open on its hinge.

The folder becomes the primary focus.

The workspace softly blurs and dims behind it — contextual background only.

The open folder is the corporate project report: the index printed inside the cover, the pages pinned under a fastener, each turn physical.

Information unfolds page by page.

Navigation uses clicks.

Never scrolling.

Each page reveals progressively deeper information about the project.

The amount of pages depends entirely on project content.

Closing the project returns the folder to its exact position inside the drawer.

A subtle Close (×) control is available after the folder has fully opened.

\---

\# Project Identity

Workspace

Always neutral.

Projects

Own their visual language.

Accul Rebugr

\- Background \#0B0B0B  
\- Accent Moss Green (\#4A6741)

Gruber Goal

\- Petrol (\#00303F)  
\- Brick Red (\#A93226)  
\- Off White (\#F5F5F5)

\---

\# About — The Photograph

The picture frame on the desk is the door to who I am.

It carries the desk's only click hotspot. Selecting it lifts the frame toward the camera — the same flight and weight as a folder — and then the photograph turns over on its vertical hinge.

About is written on the back of the print, because that is what the backs of photographs are for.

The text is real DOM — crisp, selectable — never painted onto a 3D surface.

A plain Close (×) turns the photo back and returns the frame to the desk.

The rule that governs everything: the scene is navigation, the DOM is content. Every interactive object is a door.

\---

\# Transition

The immersive experience ends naturally.

There are no cinematic transitions.

No morphs.

No dissolves — fades over the exit were tried and rejected.

The workspace simply scrolls away. The page below begins at the scene's own background color and cools into a bright, quiet grey, with plain breathing room before the rail.

Below it the page ends with:

\- Contact — four ways to reach me, side by side, spanning the full width, no heading; the email address is printed and copyable  
\- Footer

A fixed Contact button in the header points there from anywhere in the experience.

The storytelling exists only to introduce the projects and the person.

Everything afterwards prioritizes usability.

\---

\# Mobile

Mobile should preserve the concept rather than the implementation.

Interactions may be simplified.

The feeling of opening project files should remain.

Usability always takes priority.

\---

\# Success Criteria

A successful implementation should make visitors think:

"I've never seen a portfolio presented like this."

without ever asking:

"How do I use it?"  
