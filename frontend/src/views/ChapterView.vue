<script setup lang="ts">
import '../assets/user.css'
import { useChapter } from '@/hooks/ChapterHooks';
import { covertDate } from '@/lib/format'
const {
    ellipsis,
    ellipsisSwitch,
    chapters,
    comicName
} = useChapter()

</script>

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