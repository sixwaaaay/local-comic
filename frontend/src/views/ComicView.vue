<script lang="ts" setup>
import useComic from '@/hooks/ComicHooks';
import { covertDate } from '@/lib/format';
import '../assets/user.css'

const { comics } = useComic()


</script>
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