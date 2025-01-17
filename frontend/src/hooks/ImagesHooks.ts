
import { useUrlStore } from '@/stores/mapper';
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { buildQueryString } from '@/lib/query';

interface Image { name: string; url: string; }

const useImages = () => {
    const route = useRoute();

    const comicName = route.query.name;
    const chapterName = route.query.chapter;

    const urlMapping = useUrlStore();

    const covertUrl = (url: string) => `${urlMapping.baseUrl}/img/${url}`;
    const images = ref<Image[]>([]);
    onMounted(async () => {
        try {
            const url = buildQueryString(`${urlMapping.baseUrl}/comics/chapters`,
                { "comicName": comicName as string, "chapterName": chapterName as string }
            )
            const response = await fetch(url, { headers: { 'Accept': 'application/json' } });
            const data: Image[] = await response.json();
            images.value = data.map(ch => ({ ...ch, url: covertUrl(ch.url), }));
        } catch (error) {
            console.error('Failed to fetch comics:', error);
        }
    });
    const length = computed(() => images.value.length + 1);
    const val = ref(0);
    const updateVal = (e: Event) => {
        window.location.hash = `#${val.value}`;
    }
    return { images, length, val, updateVal }
}

export default useImages;