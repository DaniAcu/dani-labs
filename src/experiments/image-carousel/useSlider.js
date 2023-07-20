import { useState, useRef } from "react";


export function useSlider(){
  const [movement, setMovement] = useState(0);
  const lastMovement = useRef(0);
  const mouseDownAt = useRef(0);

  
  
  return {
    movement,
    release() {
      lastMovement.current = movement;
      mouseDownAt.current = 0;
    },
    touch(e) {
      console.log(e);
      const isTouch = e.touches;
      const event = isTouch ? e.touches[0] : e;
      mouseDownAt.current = event.clientX;
    },
    move(e) {
      const isTouch = e.touches;
      const event = isTouch ? e.touches[0] : e;

      if(mouseDownAt.current === 0) return;

      const mouseDelta = mouseDownAt.current - event.clientX;
      const maxDelta = window.innerWidth / 2;

      const porcentange = lastMovement.current + ((mouseDelta / maxDelta) * -100);

      setMovement(Math.max(Math.min(porcentange, 0), -100));
    }
  }
}

export default useSlider;
