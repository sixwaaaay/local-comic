import { useUrlMapperStore } from '@/stores/mapper';
import { ref, onMounted } from 'vue';



export default function useComic() {
    interface Comic { name: string; thumbnail: string; createdAt: string; }
    const urlMapping = useUrlMapperStore();
    const covUrl = (url: string) => `${urlMapping.baseUrl}/img/${url}`;

    /* comics */
    const comics = ref<Comic[]>([]);


    onMounted(async () => {
        try {
            const url = `${urlMapping.baseUrl}/comics`;
            const response = await fetch(url, { headers: { 'Accept': 'application/json', }, });
            let data: Comic[] = await response.json();
            comics.value = data.map(it => ({ ...it, thumbnail: covUrl(it.thumbnail), }));
        } catch (error) {
            console.error('Failed to fetch comics:', error);
        }
    });
    return { comics };
}