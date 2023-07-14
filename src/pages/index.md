---
layout: "../layout/retro/RetroLayout.astro"
---

<div class="container">

<img src="/dani.png" alt="Dani's head" width="300" />

Hi! I'm Dani, **this site is in progress**. I will publish my experiments here, thanks for your short visit.


</div>




<style>
	.container {
		display: grid;
    margin: 1rem;
    gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(max(40%, 350px),1fr));
    align-items: center;
    line-height: 1.5rem;
    max-width: 80%;
	}

	.container img {
		margin: auto
	}

	strong {
		color: orange
	}

</style>
