<script setup lang="ts">
import 'lazysizes';
// import a plugin
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import useImages from '@/hooks/ImagesHooks';

const images = useImages();

</script>
<template>
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