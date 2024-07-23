<template>
    <div class="comic-view">
        <div v-for="ch in chapters" :key="ch.name" class="comic-item">
            <router-link :to="`/comic/${comicName}/${ch.name}`">
                <img loading="lazy" :src="ch.thumbnail" alt="Comic Cover" class="comic-cover" />
                <p class="comic-name">{{ ch.name }}</p>
                <span class="comic-date">{{ covertDate(ch.createdAt) }}</span>
            </router-link>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUrlMapperStore } from '@/stores/mapper';
import '../assets/user.css'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
const covertDate = (date: string) => new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', hour12: false,
});

interface Chapter {
    name: string;
    thumbnail: string;
    createdAt: string;
}

const route = useRoute();
const comicName = route.params.name;

const urlMapping = useUrlMapperStore();


const covertUrl = (url: string) => `${urlMapping.baseUrl}/img/${url}`;
const chapters = ref<Chapter[]>([]);
onMounted(async () => {
    try {
        const response = await fetch(`${urlMapping.baseUrl}/comics/${comicName}`, {
            headers: {
                'Accept': 'application/json',
            },
        });
        let data = await response.json();
        data = data.map((ch: Chapter) => ({
            ...ch,
            thumbnail: covertUrl(ch.thumbnail),
        }));
        chapters.value = data;
    } catch (error) {
        console.error('Failed to fetch comics:', error);
    }
});
</script>