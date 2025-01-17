<script setup lang="ts">
import 'lazysizes';
// import a plugin
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import useImages from '@/hooks/ImagesHooks';

const { images, val, updateVal, length } = useImages();


</script>
<template>
    <div class="bg-white p-2 flex justify-between items-center">
        <button @click="$router.back()">
            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M31 36L19 24L31 12" stroke="#333" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </button>
        <button @click="$router.push({ name: 'comic' })">
            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18V42H39V18L24 6L9 18Z" fill="none" stroke="#333" stroke-width="4" stroke-linecap="round"
                    stroke-linejoin="round" />
                <path d="M19 29V42H29V29H19Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round" />
                <path d="M9 42H39" stroke="#333" stroke-width="4" stroke-linecap="round" />
            </svg>
        </button>
    </div>
    <div class="fixed inset-x-0 bottom-0 bg-white p-2">
        <span>{{ val }} / {{ length }}</span>
        <input id="small-range" type="range" v-model="val" @change="updateVal" :max="length" min="1" step="1"
            class="w-full h-1  bg-gray-200 rounded-lg appearance-none cursor-pointer range-sm dark:bg-gray-700">
    </div>
    <img v-for="(item, index) in images" :id="(index + 1).toString()" :key="item.name" :data-src="item.url"
        :alt="item.name" class="lazyload w-full" />
</template>