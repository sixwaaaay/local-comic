<template>
    <div class="comic-view">
        <div v-for="comic in comics" :key="comic.name" class="comic-item">
            <img loading="lazy" :src="comic.thumbnail" alt="Comic Cover" class="comic-cover" />
            <p class="comic-name">{{ comic.name }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

interface Comic {
    name: string;
    thumbnail: string;
}

const covertUrl = (url: string) => `/img/${url}`;

export default defineComponent({
    name: 'ComicView',
    setup() {
        const comics = ref<Comic[]>([]);
        onMounted(async () => {
            try {
                const response = await fetch('/comics', {
                    headers: {
                        'Accept': 'application/json',
                    },
                });
                let data = await response.json();
                data = data.map((comic: Comic) => ({
                    ...comic,
                    Thumbnail: covertUrl(comic.thumbnail),
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

<style scoped>
.comic-view {
    display: flex;
    flex-wrap: wrap;
}

.comic-item {
    width: 200px;
    margin: 10px;
}

.comic-cover {
    width: 100%;
    height: auto;
}

.comic-name {
    text-align: center;
}
</style>
