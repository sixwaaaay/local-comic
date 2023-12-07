<template>
    <div class="comic-view">
        <div v-for="comic in comics" :key="comic.name" class="comic-item">
            <router-link :to="`/comic/${comic.name}`">
                <img loading="lazy" :src="comic.thumbnail" alt="Comic Cover" class="comic-cover" />
                <p class="comic-name">{{ comic.name }}</p>
            </router-link>
        </div>
    </div>
</template>

<script lang="ts">
import { useUrlMapperStore } from '@/stores/mapper';
import '../assets/user.css'
import { defineComponent, ref, onMounted } from 'vue';

interface Comic {
    name: string;
    thumbnail: string;
}

const urlMapping = useUrlMapperStore();
// urlMapping.setBaseUrl("http://localhost:5058/")


const covertUrl = (url: string) => `${urlMapping.baseUrl}/img/${url}`;

export default defineComponent({
    name: 'ComicView',
    setup() {
        const comics = ref<Comic[]>([]);
        onMounted(async () => {
            try {
                const response = await fetch(`${urlMapping.baseUrl}/comics`, {
                    headers: {
                        'Accept': 'application/json',
                    },
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

        return {
            comics,
        };
    },
});
</script>
