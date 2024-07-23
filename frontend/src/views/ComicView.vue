<template>
    <div class="comic-view">
        <div v-for="comic in comics" :key="comic.name" class="comic-item">
            <div>
                <router-link :to="`/comic/${comic.name}`">
                    <img loading="lazy" :src="comic.thumbnail" alt="Comic Cover" class="comic-cover" />
                    <p class="comic-name">{{ comic.name }}</p>
                    <span class="comic-date">{{ covertDate(comic.createdAt) }}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useUrlMapperStore } from '@/stores/mapper';
import '../assets/user.css'
import { ref, onMounted } from 'vue';

interface Comic { name: string; thumbnail: string; createdAt: string; }
const urlMapping = useUrlMapperStore();
const covertUrl = (url: string) => `${urlMapping.baseUrl}/img/${url}`;
const covertDate = (date: string) => new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', hour12: false,
});
/* comics */
const comics = ref<Comic[]>([]);


onMounted(async () => {
    try {
        const response = await fetch(`${urlMapping.baseUrl}/comics`, {
            headers: { 'Accept': 'application/json', },
        });
        let data = await response.json();
        data = data.map((comic: Comic) => ({
            ...comic,
            thumbnail: covertUrl(comic.thumbnail),
        }));
        comics.value = data;
    } catch (error) {
        console.error('Failed to fetch comics:', error);
    }
});



</script>
