<script setup>
import bookApi from "@/api/modules/bookApi.js";
import { computed, ref } from "vue";
import BaseModal from "@/components/BaseModal.vue";
import InputText from "@/components/forms/InputText.vue";
import { notEmpty } from "@/tools/validators.js";

const books = ref([]);
const state = ref({
  error: null,
  loading: false,
});

(async () => {
  try {
    state.value.loading = true;
    const res = await bookApi.getBookList("/books");
    books.value = res.data.filter((item) => item.title && item.author);
  } catch (error) {
    state.value.error = error.message;
  } finally {
    state.value.loading = false;
  }
})();

const isOpen = ref(false);
function toggleModal(open) {
  if (!open) form.value.reset();
  isOpen.value = open;
}

const form = ref({
  title: {
    value: "",
    errors: [],
    validation: [
      {
        regex: notEmpty,
        msg: "required field",
      },
    ],
  },
  author: {
    value: "",
    errors: [],
    validation: [
      {
        regex: notEmpty,
        msg: "required field",
      },
    ],
  },
  description: {
    value: "",
    errors: [],
    validation: [],
  },
  reset() {
    for (const field in this) {
      if (this.hasOwnProperty(field) && typeof this[field] !== "function") {
        this[field].value = "";
        this[field].errors.length = 0;
      }
    }
  },
  validate() {
    const validState = Object.entries(this).reduce((obj, [field, item]) => {
      const { value, errors, validation } = item;
      if (typeof item === "function") return obj;

      const isAllValid = validation.every((condition) => {
        const { regex, msg } = condition;

        if (value.match(regex)) {
          const index = errors.indexOf(msg);
          this[field].errors.splice(index, 1);
        } else if (!errors.includes(msg)) {
          this[field].errors.push(msg);
        }

        return value.match(regex);
      });

      obj[field] = isAllValid;
      return obj;
    }, {});

    return validState;
  },
});

async function addBook() {
  const validState = form.value.validate();
  const isAllValid = Object.values(validState).every((isValid) => isValid);
  if (!isAllValid) return;

  try {
    state.value.loading = true;
    const { author, title, description } = form.value;
    const url = `/books?author=${author.value}&title=${title.value}&description=${description.value}`;
    const res = await bookApi.postSingleBook(url);
    // console.log("addBook", res);
    toggleModal(false);
  } catch (error) {
    console.log("error", error);
    state.value.error = error.message;
  } finally {
    state.value.loading = false;
  }
}
</script>

<template>
  <Teleport to="body">
    <div v-show="isOpen">
      <BaseModal>
        <template #header>
          <header class="relative bg-white p-3 text-xl">
            <button
              class="absolute left-3 top-1/2 -translate-y-1/2 font-bold"
              @click="toggleModal(false)"
            >
              <i class="fa-solid fa-arrow-left fa-xl"></i>
            </button>
            <h2 class="text-center">新增書本</h2>
          </header>
        </template>

        <template #body>
          <form
            class="flex flex-col gap-y-6 p-3 h-full text-xs"
            @submit.prevent="addBook"
          >
            <InputText
              class="mt-auto"
              v-model="form.title.value"
              placeholder="名稱"
              :errors="form.title.errors"
            />
            <InputText
              v-model="form.author.value"
              placeholder="作者"
              :errors="form.author.errors"
            />
            <textarea
              class="px-4 py-2"
              cols="30"
              rows="10"
              v-model="form.description.value"
              placeholder="備註"
            ></textarea>

            <div class="flex gap-x-8 text-white">
              <button
                class="rounded-full bg-slate-300 w-1/2 p-3"
                @click="toggleModal(false)"
              >
                取消
              </button>
              <button type="submit" class="rounded-full bg-blue-500 w-1/2 p-3">
                新增
              </button>
            </div>
          </form>
        </template>
      </BaseModal>
    </div>
  </Teleport>

  <div class="bg-slate-200">
    <header class="relative bg-white p-3 text-xl">
      <h2 class="text-center">書本列表</h2>
      <button
        class="absolute right-3 top-1/2 -translate-y-1/2 font-bold text-blue-500"
        @click="toggleModal(true)"
      >
        <i class="fa-solid fa-plus fa-xl"></i>
      </button>
    </header>

    <div class="grid place-items-center" v-if="state.loading">loading...</div>
    <div v-else-if="state.error">{{ state.error }}</div>

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
            <h2 class="font-medium break-words line-clamp-2">
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