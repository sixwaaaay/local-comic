import { useUrlStore } from '@/stores/mapper';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

import { buildQueryString } from '@/lib/query';

type Chapter = { name: string; thumbnail: string; createdAt: string; }


export function useChapter() {
    /* parameters in router */
    const route = useRoute();
    // const comicName = route.params.name;
    const comicName = route.query.name as string;

    /* load url */
    const { covertUrl, chaptersUrl } = useUrlStore();

    const chapters = ref<Chapter[]>([]);

    /* load data */
    onMounted(async () => {
        try {
            const url = buildQueryString(chaptersUrl, { comicName })
            const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
            const data: Chapter[] = await response.json();
            chapters.value = data.map(ch => ({ ...ch, thumbnail: covertUrl(ch.thumbnail) }));
        } catch (error) {
            console.error('Failed to fetch comics:', error);
        }
    });

    /* enable comic name ellipsis */
    const ellipsis = ref<boolean>(true);
    const ellipsisSwitch: () => boolean = (): boolean => ellipsis.value = !ellipsis.value;
    return { chapters, ellipsis, ellipsisSwitch, comicName }
}