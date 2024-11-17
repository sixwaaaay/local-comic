<template>
    <div class="container">
        <div class="comic-view">
            <div v-for="comic in comics" :key="comic.name">
                <div>
                    <router-link :to="{ path: `/comic/chapters`, query: { name: comic.name } }">
                        <div class="comic-cover">
                            <img loading="lazy" :src="comic.thumbnail" alt="Comic Cover"
                                style="height: 100%; width: auto;" />
                        </div>
                        <p class="comic-name comic-name-ellipsis">{{ comic.name }}</p>
                        <span class="comic-date">{{ covertDate(comic.createdAt) }}</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useUrlMapperStore } from '@/stores/mapper';
import '../assets/user.css'
import { ref, onMounted } from 'vue';
import { covertDate } from '@/lib/format';

interface Comic { name: string; thumbnail: string; createdAt: string; }
const urlMapping = useUrlMapperStore();
const covUrl = (url: string) => `${urlMapping.baseUrl}/img/${url}`;

/* comics */
const comics = ref<Comic[]>([]);


onMounted(async () => {
    try {
        const url = `${urlMapping.baseUrl}/comics`;
        const response = await fetch(url, { headers: { 'Accept': 'application/json', }, });
        let data: Comic[] = await response.json();
        comics.value = data.map(it => ({ ...it, thumbnail: covUrl(it.thumbnail), }));
    } catch (error) {
        console.error('Failed to fetch comics:', error);
    }
});

</script>