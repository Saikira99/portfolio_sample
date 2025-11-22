import * as THREE from "three";

export const handleMouseMove = (
  event: MouseEvent,
  setMousePosition: (x: number, y: number) => void
) => {
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  setMousePosition(mouseX, mouseY);
};

export const handleTouchMove = (
  event: TouchEvent,
  setMousePosition: (x: number, y: number) => void
) => {
  const mouseX = (event.touches[0].clientX / window.innerWidth) * 2 - 1;
  const mouseY = -(event.touches[0].clientY / window.innerHeight) * 2 + 1;
  setMousePosition(mouseX, mouseY);
};

export const handleTouchEnd = (
  setMousePosition: (
    x: number,
    y: number,
    interpolationX: number,
    interpolationY: number
  ) => void
) => {
  setTimeout(() => {
    setMousePosition(0, 0, 0.03, 0.03);
    setTimeout(() => {
      setMousePosition(0, 0, 0.1, 0.2);
    }, 1000);
  }, 2000);
};

export const handleHeadRotation = (
  headBone: THREE.Object3D,
  mouseX: number,
  mouseY: number,
  interpolationX: number,
  interpolationY: number,
  lerp: (x: number, y: number, t: number) => number
) => {
  if (!headBone) return;
  if (window.scrollY < 200) {
    const maxRotation = Math.PI / 5;
    const easeX = Math.pow(interpolationX, 1.5);
    const easeY = Math.pow(interpolationY, 1.5);

    headBone.rotation.y = lerp(
      headBone.rotation.y,
      mouseX * maxRotation * 1.2,
      easeY
    );

    let minRotationX = -0.35;
    let maxRotationX = 0.45;
    const clampedY = Math.max(minRotationX, Math.min(maxRotationX, mouseY));
    const targetRotationX = -clampedY * maxRotation - 0.3 * maxRotation;

    headBone.rotation.x = lerp(
      headBone.rotation.x,
      targetRotationX,
      easeX
    );

    headBone.rotation.z = lerp(
      headBone.rotation.z,
      mouseX * 0.15,
      easeY * 0.5
    );
  } else {
    if (window.innerWidth > 1024) {
      headBone.rotation.x = lerp(headBone.rotation.x, -0.4, 0.02);
      headBone.rotation.y = lerp(headBone.rotation.y, -0.3, 0.02);
      headBone.rotation.z = lerp(headBone.rotation.z, 0, 0.02);
    }
  }
};
