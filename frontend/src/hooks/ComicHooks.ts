import { useUrlStore } from '@/stores/mapper';
import { ref, onMounted } from 'vue';

type Comic = { name: string; thumbnail: string; createdAt: string; }

function useComic() {
    const { covertUrl: covUrl, comicsUrl: url } = useUrlStore();
    /* comics */
    const comics = ref<Comic[]>([]);


    onMounted(async () => {
        try {
            const response = await fetch(url, { headers: { 'Accept': 'application/json', }, });
            let data: Comic[] = await response.json();
            comics.value = data.map(it => ({ ...it, thumbnail: covUrl(it.thumbnail), }));
        } catch (error) {
            console.error('Failed to fetch comics:', error);
        }
    });
    return { comics };
}

export default useComic;