"use client";

import { RoundedBox, Text } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { ui } from "@/content/ui";
import { useLocale } from "@/lib/locale";
import { palette } from "@/lib/palette";
import { DRAWER_LABEL } from "../layout";
import { FONT_SANS_3D } from "../fonts";

/**
 * The card holder on the drawer front — a real filing drawer says what is
 * in it, on a printed card behind a small metal frame, and that is the
 * whole reason this exists: the drawer was an anonymous box, so nobody had
 * a reason to believe anything was inside it.
 *
 * It is a child of the drawer node, so it slides out with the drawer
 * instead of hanging in the air in front of it. The card is paper, not
 * paint: a cream slab set slightly back inside a matte frame, so the
 * scene's light catches the frame's edge and the card sits in its shadow.
 */
export function DrawerLabel() {
  const invalidate = useThree((s) => s.invalidate);
  const locale = useLocale();
  const { width: W, height: H, x, y, z } = DRAWER_LABEL;

  return (
    <group position={[x, y, z]}>
      {/* Frame — matte black, the nameplate's material, so the two pieces
          of "signage" in the room read as the same object family. */}
      <RoundedBox args={[W, H, 0.004]} radius={0.0015} smoothness={2} castShadow>
        <meshStandardMaterial color={palette.matteBlack} roughness={0.6} metalness={0.15} />
      </RoundedBox>

      {/* The card, inset — narrower and shorter than the frame on every
          side, sitting just proud of it so it reads as a slip of paper
          held in place rather than a printed rectangle. */}
      <mesh position={[0, 0, 0.0022]}>
        <planeGeometry args={[W - 0.008, H - 0.006]} />
        <meshStandardMaterial color={palette.paper} roughness={0.95} />
      </mesh>

      <Text
        font={FONT_SANS_3D}
        fontSize={H * 0.36}
        letterSpacing={0.12}
        color={palette.tabInk}
        anchorX="center"
        anchorY="middle"
        position={[0, 0, 0.0026]}
        onSync={() => invalidate()}
      >
        {ui[locale].drawerLabel}
      </Text>
    </group>
  );
}
