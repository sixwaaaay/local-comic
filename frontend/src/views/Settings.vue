<template>
    <div class="settings">
        <label for="baseurl">Base URL:</label>
        <input type="text" id="baseurl" v-model="baseUrl" />
        <button @click="setBaseUrl">set base url</button>
        <button @click="resetBaseUrl">reset base url</button>
    </div>
</template>

<script setup lang="ts">
import { useUrlMapperStore } from '@/stores/mapper';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const url = useUrlMapperStore();

const baseUrl = ref("")


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

<style scoped>

.settings{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

button {
    margin-top: 10px;
    border-radius: 4px;
    /* blue */
    background-color: #2196F3;
    padding: 0.5rem 1rem;
}

button:hover {
    cursor: pointer;
    /* dark blue */
    background-color: #1457ba;
}

input{
    margin-top: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 0.5rem 1rem;
    width: 100%;
}

</style>