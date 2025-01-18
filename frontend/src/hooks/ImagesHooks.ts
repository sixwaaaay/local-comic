
import { useUrlStore } from '@/stores/mapper';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { buildQueryString } from '@/lib/query';

interface Image { name: string; url: string; }

const useImages = () => {
    const route = useRoute();

    const comicName = route.query.name as string;
    const chapterName = route.query.chapter as string;

    const { imagesUrl, covertUrl } = useUrlStore();

    const images = ref<Image[]>([]);
    onMounted(async () => {
        try {
            const url = buildQueryString(imagesUrl, { comicName, chapterName })
            const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
            const data: Image[] = await response.json();
            images.value = data.map(ch => ({ ...ch, url: covertUrl(ch.url), }));
        } catch (error) {
            console.error('Failed to fetch comics:', error);
        }
    });
    const val = ref(0);
    return {
        images,
        val,
        length: computed(() => images.value.length + 1),
        updateVal: (e: Event) => {
            window.location.hash = `#${val.value}`;
        }
    }
}

export default useImages;