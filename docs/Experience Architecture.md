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

Drawer Opening ────── or ────── Picture Frame (About)

↓                               ↓

Project Selection               About Viewer (photo turns over)

↓                               ↓

Project Viewer                  Return to Workspace

↓

Return to Workspace

↓

Contact Rail \+ Footer

The two doors — Project Viewer and About — are mutually exclusive: each one's open guard requires the other closed.

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

\# Picture Frame / About Viewer

The About experience is the picture frame itself. The 3D frame flies to the camera, hands off its exact screen quad, and the DOM frame turns the photograph over on a vertical hinge — About is read on the back of the print.

Picture Frame (3D) responsible for:

\- the hover breath and the click hotspot  
\- the flight to the camera apex and the screen-quad hand-off  
\- the settle back onto the desk

About Viewer (DOM) responsible for:

\- the flip animation (both faces)  
\- rendering the About text as real DOM  
\- closing (×, Escape, click-out)

States

\- Closed  
\- Frame-Lifting  
\- Opening  
\- Viewing  
\- Closing  
\- Frame-Returning

Scrolling is disabled while viewing.

Never responsible for:

\- project content  
\- contact

\---

\# Hotspot

One shared component: a flat, unlit, billboarded black dot-and-ring.

It marks exactly one object — the picture frame. The folders carry no mark: the drawer sliding open is already the invitation.

A ring pings slowly outward while idle; the ring tightens onto the dot under the pointer. It never intercepts the pointer — the object it marks is the hit target.

\---

\# Contact Rail \+ Footer

The page below the scene. Responsible only for contact information and credits.

\- Four brand-mark links, side by side, full width, no heading.  
\- The email address is printed as selectable text outside the link (one click selects the whole address).  
\- A fixed header button ("Contact") jumps here from anywhere.  
\- Background is one shared gradient starting at the scene's own background color; both sections are transparent over it.  
\- The wrapper climbs slightly over the canvas with a short transparent-to-stage fade so the sticky canvas's bottom edge never shows as a hard line. The wrapper is pointer-events-none (the overlap must not swallow clicks meant for the drawer); the rail and footer opt back in.

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

Contact Rail

↓

Footer

Parallel door (from any idle workspace state):

Click Picture Frame

↓

Frame Lifts to Camera

↓

Photograph Turns Over (About)

↓

Close (×)

↓

Frame Returns to Desk

Reverse:

Footer

↑

Contact Rail

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

