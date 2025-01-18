<script setup lang="ts">
import { useUrlStore } from '@/stores/mapper';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const url = useUrlStore();

const baseUrl = ref(url.baseUrl)


const router = useRouter()

const setBaseUrl = () => {
    url.setBaseUrl(baseUrl.value)
    router.push("comic")
}

const resetBaseUrl = () => {
    url.setBaseUrl("")
    router.push("comic")
}

</script>
<template>
    <div class="flex flex-col w-96 mx-auto">
        <div class="w-full">
            <label for="baseurl">Base URL:</label>
        </div>
        <input class="mt-2 px-3 py-2  bg-gray-100 rounded-xl focus:outline focus:outline-blue-500" type="text"
            id="baseurl" v-model="baseUrl" />
        <div class="flex w-full justify-between py-4">
            <button
                class="bg-blue-200 hover:bg-blue-300 text-blue-600 py-2 px-6 rounded-xl transition duration-500 ease-out active:scale-90"
                @click="setBaseUrl">set base url</button>
            <button
                class="bg-purple-200 hover:bg-purple-300 text-purple-600 py-2 px-6 rounded-xl transition duration-500 ease-out active:scale-90"
                @click="resetBaseUrl">reset base url</button>
        </div>
    </div>
</template>