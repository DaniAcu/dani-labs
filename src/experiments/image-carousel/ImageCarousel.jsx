import { useRef } from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";

import "./styles.css";

import { ImageManager } from "../../images/ImageManager";

export function ImageCarousel () {
  const el = useRef();
  useLenis(lenis => {
    const carousel = el.current;
    const images = Array.from(carousel.querySelectorAll("img"));

    const movement = (100 * lenis.animatedScroll / lenis.dimensions.scrollWidth)

    images.forEach(image => {
      image.animate({
        objectPosition: `${movement}% 50%`
      }, { duration: 1200, fill: "forwards" })
    })
  }, [el])

  return (
    <ReactLenis 
      root 
      options={{
        orientation: "horizontal",
        gestureOrientation: "horizontal"
      }}
    >
      <section className="carousel">
          <ul ref={el}>
            {
              images.map(image => {
                return (
                  <li className="carousel-item" key={image.url}>
                    <img className="carousel-item-img" src={image.url} alt={image.alt} draggable={false} />
                  </li>
                )
              })
            }
          </ul>
      </section>
    </ReactLenis>
  )
  
}

export default ImageCarousel;



const images = [
  { url: ImageManager.get("M2T1j-6Fn8w"), alt: "anillo de novia de color dorado engastado en un ramo de flores de rosa" },
  { url: ImageManager.get("464ps_nOflw"), alt: "hombre y mujer tomados de la mano" },
  { url: ImageManager.get("5BB_atDT4oA"), alt: "el novio al lado de la novia sosteniendo un ramo de flores" },
  { url: ImageManager.get("O38Id_cyV4M"), alt: "lote de copas de vino transparente en la mesa" },
  { url: ImageManager.get("mW8IZdX7n8E"), alt: "foto de un hombre y una mujer recién casados sosteniendo globos" },
  { url: ImageManager.get("30UOqDM5QW0"), alt: "mujer sosteniendo un ramo de flores de pétalos beige" },
  { url: ImageManager.get("MEZDyn98La8"), alt: "pareja de novios de pie en la isla" },
  { url: ImageManager.get("fJzmPe-a0eU"), alt: "fotografía de enfoque selectivo arreglo floral de isla blanca y rosa" }
]