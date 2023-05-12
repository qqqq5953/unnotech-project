<script setup>
import bookApi from "@/api/modules/bookApi.js";
import { computed, ref, watch } from "vue";
const { data, error, loading } = bookApi.getBookList("/books");

const books = computed(() => {
  if (!data.value) return;
  return data.value.filter((item) => item.title && item.author);
});
</script>

<template>
  <div class="bg-slate-200">
    <header class="relative bg-white p-3 text-xl">
      <h2 class="text-center">書本列表</h2>
      <button class="absolute right-3 top-1/2 -translate-y-1/2">+</button>
    </header>
    <div class="grid place-items-center" v-if="loading">loading...</div>
    <div v-else-if="error">{{ error }}</div>

    <main class="py-3 md:py-6 lg:py-12" v-else>
      <ul class="flex flex-wrap gap-y-3 md:gap-y-6 lg:gap-y-12">
        <li class="w-1/2 group" v-for="book in books" :key="book.id">
          <div
            class="flex flex-col items-center gap-y-4 rounded bg-white hover:shadow-lg hover:cursor-pointer hover:border h-full text-xs p-3 group-odd:ml-3 group-odd:mr-1.5 group-even:mr-3 group-even:ml-1.5 group-odd:md:ml-6 group-odd:md:mr-3 group-even:md:ml-3 group-even:md:mr-6 md:p-6 group-odd:lg:ml-12 group-odd:lg:mr-6 group-even:lg:mr-12 group-even:lg:ml-6"
          >
            <div class="h-36 md:h-60 lg:h-80" v-if="book.image">
              <img
                class="block w-full h-full object-contain"
                :src="book.image"
                :alt="book.title"
              />
            </div>
            <div
              class="grid place-items-center bg-slate-100 p-2 w-2/3 max-w-[170px] h-36 md:h-60 lg:h-80 lg:max-w-[250px]"
              v-else
            >
              image lost...
            </div>
            <h2 class="font-medium break-words line-clamp">
              {{ book.title }}
            </h2>
            <p
              class="mt-auto text-slate-600 text-right w-1/2 truncate self-end"
            >
              - {{ book.author }}
            </p>
          </div>
        </li>
      </ul>
    </main>
  </div>
</template>



<style>
.line-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>