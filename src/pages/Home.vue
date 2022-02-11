<template>
<section>
    <div class="container mx-auto space-y-6">
        <div class="px-4 lg:px-0 flex items-center justify-between">
            <h1 class="text-2xl font-semibold text-gray-800">API Data</h1>
            <BaseButton label="Random" icon="heroicons-outline:refresh" regular @click="getRandomEntry" />
        </div>
        <div class="px-4 lg:px-0 flex lg:flex-row flex-col items-end lg:space-x-4 lg:space-y-0 gap-4">
            <BaseSelect label="Category" :options="categories" class="lg:w-3/12 w-full lg:order-1 order-2" v-model="category" @change="filterByCategory"></BaseSelect>
            <BaseInput placeholder="Search title..." v-model="title" class="lg:grow grow-0 w-full lg:w-auto lg:order-2 order-1" label="Title" icon="feather:search" iconPosition="left" />
            <BaseButton label="Search" regular class="order-3 w-full lg:w-auto" @click="filterByTitle" />
        </div>
        <div v-if="category" class="px-4 lg:px-0 flex items-center">
            <BaseChip :label="category" @click="filterByCategory('')"></BaseChip>
        </div>
        <div class="lg:w-full lg:left-auto lg:relative lg:right-auto left-0 right-0 lg:overflow-x-hidden overflow-x-scroll border border-[#EAECF0] lg:rounded-lg rounded-none lg:shadow-none shadow-md">
            <table v-if="tableData.length > 0 && !loading" class="table-auto w-full text-left">
                <thead>
                    <tr>
                        <th class="px-6 py-3">Title</th>
                        <th class="px-6 py-3">Category</th>
                        <th class="px-6 py-3">Description</th>
                        <th class="px-6 py-3">Link</th>
                        <th class="px-6 py-3"></th>
                    </tr>
                </thead>
                <tbody class="border-y">
                    <tr v-for="(item, i) in tableData" :key="i" class="even:bg-transparent odd:bg-gray-50">
                        <td class="px-6 py-3">{{ item.API }}</td>
                        <td class="px-6 py-3">{{ item.Category }}</td>
                        <td class="px-6 py-3 break-words">{{ item.Description }}</td>
                        <td class="px-6 py-3 break-all">{{ item.Link }}</td>
                        <td class="px-6 py-3 flex justify-end">
                            <BaseButton icon="feather:eye" :to="item.Link" text />
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if="tableData.length > 0 && !loading && title.trim() == ''" class="lg:flex hidden items-center justify-between px-6 pb-4 pt-2.5">
                <div class="flex items-center space-x-3">
                    <BaseButton label="Previous" outlined @click="prev" :disabled="page === 1" />
                    <BaseButton label="Next" outlined @click="next" :disabled="page === paginatedEntries.length" />
                </div>
                <span class="text-gray-700 font-medium text-sm">Page {{page}} of {{paginatedEntries.length}}</span>
            </div>
            <div class="flex w-full" v-if="loading">
                <lottie-player src="https://assets3.lottiefiles.com/private_files/lf30_pidikbny.json"  background="transparent"  speed="1"  style="width: 100%; height: 300px;"  loop autoplay></lottie-player>
            </div>
        </div>
        <div v-if="tableData.length > 0 && !loading && title.trim() == ''" class="px-4 lg:px-0 lg:hidden flex flex-col space-y-2">
            <hr class="bg-gray-200">
            <div class="flex items-center justify-between">
                <BaseButton icon="feather:arrow-left" text @click="prev" :disabled="page === 1"/>
                <span class="text-gray-700 font-medium text-sm">Page {{page}} of {{paginatedEntries.length}}</span>
                <BaseButton icon="feather:arrow-right" text @click="next" :disabled="page === paginatedEntries?.length"/>
            </div>
        </div>
    </div>
</section>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

export default defineComponent({
    name: "Home",
    setup() {
        // data to be displayed in table
        const tableData = ref([]);
        const entries = ref();
        const categories = ref([]);
        const category = ref('')
        const title = ref('')
        // complete data gotten from /entries endpoint
        const paginatedEntries = ref();
        // used to check current index of paginated data
        const page = ref(1);
        const loading = ref(false);
        // fetch random entry from endpoint
        async function getRandomEntry() {
            loading.value = true;
            let url = import.meta.env.VITE_BASE_URL + "/random";
            try {
                let res = await fetch(url);
                let data = await res.json();
                tableData.value = data.entries;
                loading.value = false;
            }
            catch (error) {
                console.log(error);
                loading.value = false;
            }
        };
        // fetch all categories from endpoint
        async function getCategories() {
            loading.value = true;
            let url = import.meta.env.VITE_BASE_URL + "/categories";
            try {
                let res = await fetch(url);
                let data = await res.json();
                categories.value = data.categories;
            }
            catch (error) {
                console.log(error);
                loading.value = false;
            }
        };
        const filterByCategory = function(item? : string) {
            if (item == '') {
                category.value = item
                getAllEntries();
            } else {
                getAllEntries();
            }
        }
        const filterByTitle = function() {
            if (title.value !== '') {
                getAllEntries();
            }
        }
        // fetch all entries from endpoint
        async function getAllEntries() {
            await getCategories();
            let url = import.meta.env.VITE_BASE_URL + `/entries?category=${category.value}&title=${title.value}`;
            try {
                let res = await fetch(url);
                let data = await res.json();
                entries.value = data.entries;
                paginatedEntries.value = paginate(data.entries, 100);
                generateEntries();
                loading.value = false;
            }
            catch (error) {
                console.log(error);
                loading.value = false;
            }
        };
        // used to display a page in the paginated data
        const generateEntries = function () {
            tableData.value = paginatedEntries.value[page.value - 1];
        };
        //paginate the data
        const paginate = (array: Object[], n: number) => {
            const pageSize = Math.ceil(array.length / n);
            return Array.from({ length: pageSize }, (_, index) => {
                const start = index * n;
                return array.slice(start, start + n);
            });
        };
        // go to previous page
        const prev = function () {
            if (page.value > 1) {
                page.value--;
                generateEntries();
            }
        };
        //go to next page
        const next = function () {
            if (page.value != paginatedEntries.value.length) {
                page.value++;
                generateEntries();
            }
        };
        onMounted(() => {
            getAllEntries();
        });
        return {
            categories,
            category,
            title,
            filterByTitle,
            tableData,
            getRandomEntry,
            paginatedEntries,
            page,
            prev,
            next,
            loading,
            filterByCategory
        };
    }
})
</script>