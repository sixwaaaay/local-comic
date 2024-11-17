<template>
    <img v-for="item in images" :key="item.name" :data-src="item.url" :alt="item.name" class="lazyload" />
</template>


<script setup lang="ts">
import 'lazysizes';
// import a plugin
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { useUrlMapperStore } from '@/stores/mapper';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { buildQueryString } from '@/lib/query';


interface Image { name: string; url: string; }

const route = useRoute();

const comicName = route.query.name;
const chapterName = route.query.chapter;

const urlMapping = useUrlMapperStore();

const covertUrl = (url: string) => `${urlMapping.baseUrl}/img/${url}`;
const images = ref<Image[]>([]);
onMounted(async () => {
    try {
        const url = buildQueryString(`${urlMapping.baseUrl}/comics/chapters`,
            { "comicName": comicName as string, "chapterName": chapterName as string }
        )
        const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
        const data: Image[] = await response.json();
        images.value = data.map(ch => ({ ...ch, url: covertUrl(ch.url), }));
    } catch (error) {
        console.error('Failed to fetch comics:', error);
    }
});
</script>

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