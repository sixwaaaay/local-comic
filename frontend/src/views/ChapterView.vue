<script setup lang="ts">

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
    <div class="grid grid-cols-[1fr,auto,1fr]">
        <div class="col-[2/3]">
            <button @click="$router.back()">
                <svg width="24" height="24" viewBox="0 0 48 48" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M31 36L19 24L31 12" stroke="#333" stroke-width="4" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </button>
        </div>
        <div class="col-[2/3] sm:w-[99vw] grid grid-cols-[repeat(auto-fill,minmax(245px,1fr))] auto-rows-auto">
            <div v-for="ch in chapters" :key="ch.name" class="p-1">
                <div>
                    <router-link :to="{ path: '/comic/comic-chapter', query: { name: comicName, chapter: ch.name } }">
                        <img loading="lazy" :src="ch.thumbnail"
                            class="aspect-video h-full w-auto object-contain bg-black rounded-lg" />
                        <p :class="{
                            'line-clamp-1': ellipsis,
                            'line-clamp-none': !ellipsis
                        }">{{ ch.name }}</p>
                        <span class="text-sm text-gray-400">{{ covertDate(ch.createdAt) }}</span>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="col-[2/3]">
            <button
                class="w-full bg-purple-200 hover:bg-purple-300 text-purple-600 py-2 px-6 rounded-xl transition duration-500 ease-out active:scale-90"
                role="button" type="button" @click="ellipsisSwitch">
                {{ ellipsis ? '显示' : '隐藏' }}漫画名称
            </button>
        </div>
    </div>
</template>