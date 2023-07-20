import React, { useEffect, useMemo } from "react";

import "./styles.css";
import useSlider from "./useSlider";

export function ImageCarousel () {
  const el = React.useRef(null)
  const slider = useSlider();

  useEffect(() => {
    const carousel = el.current;
    const images = Array.from(el.current.querySelectorAll("img"));

    carousel.animate({
      transform: `translate(${slider.movement}%, -50%)`
    }, { duration: 1200, fill: "forwards" })

    images.forEach(image => {
      image.animate({
        objectPosition: `${slider.movement + 100}% 50%`
      }, { duration: 1200, fill: "forwards" })
    })
    
  }, [el, slider.movement])



  return (
    <section
      className="carousel"
      onTouchStart={slider.touch}
      onMouseDown={slider.touch}
      onTouchMove={slider.move}
      onMouseMove={slider.move}
      onTouchEnd={slider.touch}
      onMouseUp={slider.release}
    >
      <ul ref={el}>
        {
          images.map(image => {
            return (
              <li key={image.url}>
                <img src={image.url} alt={image.alt} draggable={false} />
              </li>
            )
          })
        }
      </ul>
    </section>
  )
  
}

export default ImageCarousel;


const images = [
  { url: "https://source.unsplash.com/M2T1j-6Fn8w", alt: "anillo de novia de color dorado engastado en un ramo de flores de rosa" },
  { url: "https://source.unsplash.com/464ps_nOflw", alt: "hombre y mujer tomados de la mano" },
  { url: "https://source.unsplash.com/5BB_atDT4oA", alt: "el novio al lado de la novia sosteniendo un ramo de flores" },
  { url: "https://source.unsplash.com/O38Id_cyV4M", alt: "lote de copas de vino transparente en la mesa" },
  { url: "https://source.unsplash.com/mW8IZdX7n8E", alt: "foto de un hombre y una mujer recién casados sosteniendo globos" },
  { url: "https://source.unsplash.com/30UOqDM5QW0", alt: "mujer sosteniendo un ramo de flores de pétalos beige" },
  { url: "https://source.unsplash.com/MEZDyn98La8", alt: "pareja de novios de pie en la isla" },
  { url: "https://source.unsplash.com/fJzmPe-a0eU", alt: "fotografía de enfoque selectivo arreglo floral de isla blanca y rosa" }
]