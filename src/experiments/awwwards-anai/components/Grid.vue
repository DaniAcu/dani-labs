<script lang="ts" setup>
import { ImageManager } from '../../../images/ImageManager';

const props = defineProps(['class'])

const images = [
    ImageManager.get("5gdxBw2VyVI", "low"),
    ImageManager.get("pT2zu7UsoX4", "low"),
    ImageManager.get("AwIRvq1hNcg", "low"),
    ImageManager.get("lnkuSyPXZiE", "low"),
] as const;

</script>

<template>
    <div :class="['boxes flex gap-4', props.class]">
        <div class="flex flex-col gap-4">
            <div class="box box-1 aspect-[3/5]">
                <img class="w-full h-full object-cover" :src="images[0]" alt="" />
            </div>
            <div class="box box-2 aspect-[3/5] w-1/2 translate-x-full">
                <img class="w-full h-full object-cover" :src="images[1]" alt="" />
            </div>
        </div>
        <div class="flex flex-col gap-4 translate-y-8">
            <div class="box box-3 aspect-[3/5] w-1/2 ">
                <img class="w-full h-full object-cover" :src="images[2]" alt="" />
            </div>
            <div class="box box-4 aspect-[3/5] w-9/12">
                <img class="w-full h-full object-cover" :src="images[3]" alt="" />
            </div>
        </div>
    </div>
</template>
