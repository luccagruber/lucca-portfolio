"use client";

/**
 * Premium three-part lighting for the close-up desk:
 *
 * - Key — strong warm directional from upper-left, camera side, the only
 *   shadow caster (2048² PCFSoft, tight frustum around the desk).
 * - Fill — soft cool directional from the right, lifting the shadow side
 *   without flattening it.
 * - Bounce — hemisphere pairing a cool ceiling with a warm ground/desk
 *   reflection, plus a faint true up-light so undersides never go dead.
 * - Ambient — low; the shadows carry the weight.
 */
export function Lighting() {
  return (
    <>
      <ambientLight intensity={0.13} color="#e9e6df" />

      {/* Desk-surface bounce: warm from below, cool sky above */}
      <hemisphereLight args={["#dbe2ea", "#e7d6ba", 0.42]} />
      <directionalLight position={[0.3, -1, 1.2]} intensity={0.18} color="#ffe9cf" />

      {/* Key — warm, upper-left, in front of the desk */}
      <directionalLight
        position={[-1.7, 2.6, 1.9]}
        intensity={2.8}
        color="#ffe3c2"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-2.2}
        shadow-camera-right={2.2}
        shadow-camera-top={2.2}
        shadow-camera-bottom={-1.2}
        shadow-camera-near={0.6}
        shadow-camera-far={9}
        shadow-bias={-0.00015}
        shadow-normalBias={0.025}
      />

      {/* Fill — soft, cool, from the right; strong enough that the
          right-corner props (the cup) don't sink into their shadow side */}
      <directionalLight position={[2.3, 1.5, 1.4]} intensity={0.7} color="#d6e2ef" />
    </>
  );
}
