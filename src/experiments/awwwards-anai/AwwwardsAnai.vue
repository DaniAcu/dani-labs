<!--

  Inspiration site: https://anaiwood.com/en

-->

<script lang="ts" setup>
import { onMounted } from 'vue'

import gsap from 'gsap';
import ScrollTrigger from "gsap/dist/ScrollTrigger";

import Grid from './components/Grid.vue';

gsap.registerPlugin(ScrollTrigger);

onMounted(() => {
  console.log(gsap);
  const timeline = gsap.timeline()
  timeline.to(".image-frame", {
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
})


</script>

<template>
  <header class="flex flex-col justify-center">
    <h1 class="flex flex-col leading-none my-32 text-center text-[10vw]">
        Autumn
        <span>Season</span>
    </h1>

    <div class="image-frame">
      <img class="image" src="https://source.unsplash.com/EOIToTneyZ4" alt="Autumn season trees">
    </div>
  </header>
  <section class="flex h-screen h-dvh p-32 gap-32">
    <Grid />
    <div class="flex flex-col py-32">
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

