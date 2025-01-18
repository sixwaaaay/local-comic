<script lang="ts" setup>
import useComic from '@/hooks/ComicHooks';
import { covertDate } from '@/lib/format';

const { comics } = useComic()

</script>
<template>
    <div class="grid grid-cols-[1fr,auto,1fr]">
        <div class="col-[2/3] grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] auto-rows-auto">
            <div v-for="comic in comics" :key="comic.name" class="mx-1 my-1">
                <div>
                    <router-link :to="{ path: `/comic/chapters`, query: { name: comic.name } }">
                        <img class="aspect-video h-full w-auto object-contain bg-black rounded-lg" loading="lazy"
                            :src="comic.thumbnail" />

                        <p class="line-clamp-1">{{ comic.name }}</p>
                        <span class="text-sm text-gray-400">{{ covertDate(comic.createdAt) }}</span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>