<template>
    <img v-for="item in images" :key="item.name" :data-src="item.url" :alt="item.name"  class="lazyload"
         />
</template>


<script setup lang="ts">
import 'lazysizes';
// import a plugin
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import { useUrlMapperStore } from '@/stores/mapper';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';


interface Chapter {
    name: string;
    url: string;
}

const route = useRoute();
const comicName = route.params.name;
const chapterName = route.params.chapter;
const urlMapping = useUrlMapperStore();



const covertUrl = (url: string) => `${urlMapping.baseUrl}/img/${url}`;
const images = ref<Chapter[]>([]);
onMounted(async () => {
    try {
        const response = await fetch(`${urlMapping.baseUrl}/comics/${comicName}/${chapterName}`, {
            headers: {
                'Accept': 'application/json',
            },
        });
        let data = await response.json();
        data = data.map((ch: Chapter) => ({
            ...ch,
            url: covertUrl(ch.url),
        }));
        images.value = data;
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