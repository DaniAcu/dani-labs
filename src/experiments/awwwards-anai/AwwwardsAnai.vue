<!--

  Inspiration site: https://anaiwood.com/en

-->

<script lang="ts" setup>
import { onMounted } from 'vue'

import gsap from 'gsap';
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import ScrollSmoother from "gsap/dist/ScrollSmoother";

import Grid from './components/Grid.vue';
import { ImageManager } from '../../images/ImageManager';


const headerImg = ImageManager.get("EOIToTneyZ4", "high");

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
  ScrollSmoother.create({ smooth: 1, effects: true, smoothTouch: 0.1 });
  gsap.to(".image-frame", {
    "--horizontal": 0,
    "--vertical": 0,
    scrollTrigger: {
      trigger: ".image-frame",
      scrub: true,
      start: "top top",
      pin: true,
      pinSpacing: true,
      
    }
  })

  const timeline = gsap.timeline({
    defaults: {
      opacity: 0,
      scrollTrigger: {
        trigger: ".boxes",
        scrub: true,
        start: "top bottom",
        end: "bottom bottom"
      }
    }
  })
  timeline.from(".box-1", {
    y: -100,
    x: -100,
  });

  timeline.from(".box-2", {
    y: 100,
    x: -100,
  });

  timeline.from(".box-3", {
    y: -100,
    x: 100,
  })

  timeline.from(".box-4", {
    y: 100,
    x: 100,
  })
})


</script>

<template>
  <header class="flex flex-col justify-center">
    <h1 class="flex flex-col leading-none my-32 text-center text-[10vw]">
        Autumn
        <span>Season</span>
    </h1>

    <div class="image-frame">
      <img class="image" :src="headerImg" alt="Autumn season trees">
    </div>
  </header>
  <section class="flex flex-col h-screen h-dvh px-[10vw] py-[10vh] items-center md:flex-row ">
    <Grid class="flex-[2]"/>
    <div class="flex-[3] flex flex-col py-32">
      <h2 class="text-5xl mb-3">The Beauty of Autumn</h2>
      <p class="text-lg font-light ">
        One of the most striking features of autumn is the dramatic change in foliage. Deciduous trees, which lose their leaves annually, put on a spectacular display of color as their leaves turn from green to vibrant shades of red, orange, yellow, and brown. This transformation occurs due to changes in the length of daylight and temperature, which signal trees to prepare for the dormant winter period.
      </p>
    </div>
  </section>
</template>

<style>
  html, body {
    font-family: "Playfair Display", serif;
    font-optical-sizing: auto;
    box-sizing: border-box;
    background-color: #EFECEC;
  }

  * {
    box-sizing: inherit;
  }
</style>

<style scoped>
  .title-md {
    font-size: 5vw;
  }

  .title {
    display: flex;
    flex-direction: column;
    text-align: center;
    font-size: 10vw;
  }

  .image {
    width: 100vw;
    height: 100vh;

  }

  .image-frame {
    --horizontal: 35%;
    --vertical: 5%;
    clip-path: inset(var(--vertical) var(--horizontal));
  }

  .section {

  }
</style>

