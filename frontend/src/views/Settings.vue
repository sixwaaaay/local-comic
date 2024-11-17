<template>
    <div class="settings">
        <label for="baseurl">Base URL:</label>
        <input type="text" id="baseurl" v-model="baseUrl" />
        <div class="flex">
            <button @click="setBaseUrl">set base url</button>
            <button @click="resetBaseUrl">reset base url</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUrlMapperStore } from '@/stores/mapper';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

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
.settings {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}


/* CSS */
button {
    background-color: rgba(51, 51, 51, 0.05);
    border-radius: 8px;
    border-width: 0;
    color: #333333;
    cursor: pointer;
    display: inline-block;
    font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    list-style: none;
    margin: 0;
    padding: 10px 12px;
    text-align: center;
    transition: all 200ms;
    vertical-align: baseline;
    white-space: nowrap;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
}

input {
    margin-top: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    padding: 0.5rem 1rem;
    width: 100%;
}

.flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>