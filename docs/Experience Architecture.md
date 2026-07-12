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

Never responsible for:

\- drawer logic  
\- project state  
\- page navigation

\---

\# Workspace

Responsible for:

\- rendering the cubicle  
\- desk  
\- props  
\- filing cabinet

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

Responsible for:

\- opening animation  
\- page rendering  
\- page transitions  
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

