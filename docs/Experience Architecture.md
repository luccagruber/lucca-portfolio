\# Experience Architecture

\#\# Principle

Each system owns exactly one responsibility.

No component should control another component's internal behavior.

Communication happens only through explicit state changes.

\---

\# Experience Flow

Arrival

↓

Workspace

↓

Drawer Opening

↓

Project Selection

↓

Project Viewer

↓

Return to Workspace

↓

Traditional Portfolio

\---

\# Camera

Responsible for:

\- framing  
\- subtle easing  
\- focus transitions

Contract:

\- straight front view — zero yaw, zero tilt, permanently  
\- framings are positions only  
\- mouse movement never moves the camera or the scene

Never responsible for:

\- drawer logic  
\- project state  
\- page navigation

\---

\# Workspace

Responsible for:

\- rendering the room  
\- the desk (a real GLB, which owns its drawer)  
\- props

Never responsible for:

\- project content  
\- page navigation

\---

\# Drawer

Responsible for:

\- opening  
\- closing  
\- revealing folders

States

\- Closed  
\- Opening  
\- Open  
\- Closing

Never responsible for:

\- opening projects

\---

\# Folder System

Responsible for:

\- rendering folders  
\- selection  
\- returning folders

States

\- Hidden  
\- Revealed  
\- Selected  
\- Returning

Never responsible for:

\- page content

\---

\# Project Viewer

The viewer is the folder itself, in DOM: the 3D folder flies to the camera, hands off its exact screen quad, and the DOM folder opens its cover over it.

Responsible for:

\- opening animation (cover on its hinge)  
\- page rendering (fastened stack)  
\- page transitions (physical turns over the top hinge)  
\- closing

States

\- Closed  
\- Opening  
\- Viewing  
\- Closing

Scrolling is disabled while viewing.

Navigation uses clicks only.

\---

\# About Section

Responsible only for presenting personal information.

No storytelling.

No interaction.

\---

\# Footer

Responsible only for contact information.

\---

\# State Machine

TOP

↓

Drawer Closed

↓

Small Scroll

↓

Play Opening Animation

↓

Drawer Open

↓

Select Folder

↓

Open Project

↓

Browse Pages

↓

Close Project

↓

Drawer Open

↓

Continue Scrolling

↓

About

↓

Footer

Reverse:

Footer

↑

About

↑

Workspace

↑

Reach Top

↓

Play Closing Animation

↓

Drawer Closed

\---

\# Technical Philosophy

Animations are event-driven.

Never continuously tied to scroll progress.

Scrolling triggers transitions.

GSAP owns animations.

React owns state.

React Three Fiber owns rendering.

Each layer has one responsibility.

