<script setup lang="ts">
import 'lazysizes';
// import a plugin
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import useImages from '@/hooks/ImagesHooks';

const images = useImages();

</script>
<template>
    <button @click="$router.back()">
        <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M31 36L19 24L31 12" stroke="#333" stroke-width="4" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>
    </button>
    <img v-for="item in images" :key="item.name" :data-src="item.url" :alt="item.name" class="lazyload" />
</template>
<style scoped>
.card {
    width: 200px;
    height: 200px;
    background-color: #66f;
    margin: 2px;
    color: #fff;
    writing-mode: sideways-rl;
    text-orientation: mixed;
    border-radius: 5px;
    opacity: 0.8;
}

li {
    list-style: none;
    margin: 2px;
}

img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    margin: 0;
    display: block;
}
</style>