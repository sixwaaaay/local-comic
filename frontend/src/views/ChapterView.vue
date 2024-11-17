<template>
    <div class="comic-view">
        <div v-for="ch in chapters" :key="ch.name" class="comic-item">
            <router-link :to="{ path: '/comic/comic-chapter', query: { name: comicName, chapter: ch.name } }">
                <img loading="lazy" :src="ch.thumbnail" alt="Comic Cover" class="comic-cover" />
                <p :class="['comic-name', { 'comic-name-ellipsis': ellipsis }]">{{ ch.name }}</p>
                <span class="comic-date">{{ covertDate(ch.createdAt) }}</span>
            </router-link>
        </div>

        <button class="primary-button" role="button" type="button" @click="ellipsisSwitch">
            {{ ellipsis ? '显示' : '隐藏' }}漫画名称
        </button>
    </div>
</template>

<script setup lang="ts">
import { useUrlMapperStore } from '@/stores/mapper';
import '../assets/user.css'
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { covertDate } from '@/lib/format'
import { buildQueryString } from '@/lib/query';

interface Chapter { name: string; thumbnail: string; createdAt: string; }

/* parameters in router */
const route = useRoute();
// const comicName = route.params.name;
const comicName = route.query.name as string;

/* load url */
const urlMapping = useUrlMapperStore();


const covertUrl = (url: string) => `${urlMapping.baseUrl}/img/${url}`;


const chapters = ref<Chapter[]>([]);

/* load data */
onMounted(async () => {
    try {
        const url = buildQueryString(`${urlMapping.baseUrl}/comics/comics`, { comicName })
        const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
        let data: Chapter[] = await response.json();
        chapters.value = data.map(ch => ({ ...ch, thumbnail: covertUrl(ch.thumbnail) }));
    } catch (error) {
        console.error('Failed to fetch comics:', error);
    }
});

/* enable comic name ellipsis */
const ellipsis = ref<boolean>(true);
const ellipsisSwitch: () => boolean = (): boolean => ellipsis.value = !ellipsis.value;

</script>