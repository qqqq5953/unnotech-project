<script setup>
import { computed, nextTick, onMounted, ref, watch, watchEffect } from "vue";
import bookApi from "@/api/modules/bookApi.js";
import BaseHeader from "@/components/global/BaseHeader.vue";
import BaseContainer from "@/components/global/BaseContainer.vue";
import InputText from "@/components/forms/InputText.vue";
import TextArea from "@/components/forms/TextArea.vue";
import { notEmpty } from "@/tools/validators.js";
import { useRouter } from "vue-router";

const props = defineProps({
  bookId: String,
});
const router = useRouter();

onMounted(async () => {
  const bookData = await getBookData();
  book.value = bookData;
  form.value.setFormData(bookData);
});

// state
const state = ref({
  error: "",
  loading: false,
  msg: "",
});
function setState({ error, loading, msg }) {
  Object.entries({ error, loading, msg }).forEach(([key, value]) => {
    if (value != null) {
      state.value[key] = value;
    }
  });
}

// book
const book = ref(null);
async function getBookData() {
  try {
    state.value.loading = true;
    const res = await bookApi.getSingleBook(`/books/${props.bookId}`);
    return res.data;
  } catch (error) {
    state.value.error = error.message;
  } finally {
    state.value.loading = false;
  }
}
function setBookData(data) {
  book.value = data;
}

// form
const form = ref({
  title: {
    inputValue: "",
    errors: [],
    validation: [
      {
        regex: notEmpty,
        msg: "required field",
      },
    ],
  },
  author: {
    inputValue: "",
    errors: [],
    validation: [
      {
        regex: notEmpty,
        msg: "required field",
      },
    ],
  },
  description: {
    inputValue: "",
    errors: [],
    validation: [],
  },
  reset() {
    Object.entries(this).forEach(([field, fieldObj]) => {
      if (typeof fieldObj !== "function") {
        fieldObj.inputValue = book.value[field];
        fieldObj.errors.length = 0;
      }
    });
  },
  checkNewContent() {
    return Object.entries(this).some(([field, fieldObj]) => {
      if (typeof fieldObj !== "function") {
        return fieldObj.inputValue !== book.value[field];
      }
    });
  },
  setFormData(data) {
    Object.entries(data).forEach(([field, value]) => {
      if (this[field]) {
        this[field].inputValue = value;
      }
    });
  },
});

// edit
const titleRef = ref(null);
const isEdit = ref(false);
const isNewContent = ref(false);

function toggleEdit(edit) {
  isEdit.value = edit;

  if (!edit) {
    form.value.reset();
    setState({ msg: "" });
  } else {
    nextTick().then(() => {
      titleRef.value.inputTextRef.focus();
    });
  }
}
async function confirmEdit() {
  isNewContent.value = form.value.checkNewContent();
  if (!isNewContent.value) return;

  try {
    const { author, title, description } = form.value;
    const url = `/books/${props.bookId}`;
    const res = await bookApi.patchBookDetail(url, {
      author: author.inputValue,
      title: title.inputValue,
      description: description.inputValue,
    });

    if (res.status === 200) {
      isNewContent.value = false;
      setState({ msg: "修改成功!" });
      setBookData(res.data);
    } else {
      setState({ msg: "修改失敗!" });
    }
  } catch (error) {
    setState({ error: error.message });
    setState({ msg: "修改失敗!" });
  }
}

watch(
  [
    () => form.value.title.inputValue,
    () => form.value.author.inputValue,
    () => form.value.description.inputValue,
  ],
  ([newTitle, newAuthor, newDescription]) => {
    setState({ msg: "" });
    isNewContent.value =
      newTitle !== book.value.title ||
      newAuthor !== book.value.author ||
      newDescription !== book.value.description;
  }
);
</script>

<template>
  <BaseContainer :headerTitle="book?.title">
    <template #header-left-btn>
      <button
        class="absolute left-3 top-1/2 -translate-y-1/2 font-bold"
        @click="router.go(-1)"
      >
        <i class="fa-solid fa-arrow-left fa-xl"></i>
      </button>
    </template>
    <template #header-right-btn>
      <button
        class="absolute right-3 top-1/2 -translate-y-1/2 font-bold hover:text-blue-500"
        v-if="!isEdit"
        @click="toggleEdit(true)"
      >
        <i class="fa-regular fa-pen-to-square fa-lg"></i>
      </button>
    </template>
    <template #main>
      <form
        class="flex flex-col mt-auto gap-y-6 p-3 h-full text-xs"
        :class="isEdit ? 'mb-0' : 'mb-16'"
      >
        <div class="text-center" v-if="state.msg">{{ state.msg }}</div>
        <div class="text-center" v-if="state.error">{{ state.error }}</div>
        <InputText
          v-model="form.title.inputValue"
          placeholder="名稱"
          :errors="form.title.errors"
          :isDisabled="!isEdit"
          ref="titleRef"
        />
        <InputText
          v-model="form.author.inputValue"
          placeholder="作者"
          :errors="form.author.errors"
          :isDisabled="!isEdit"
        />
        <TextArea
          class="px-4 py-2 bg-white"
          cols="30"
          rows="10"
          v-model="form.description.inputValue"
          placeholder="備註"
          :isDisabled="!isEdit"
        />
        <div class="flex gap-x-8 text-white" v-if="isEdit">
          <button
            class="rounded-full bg-slate-300 w-1/2 p-3"
            @click="toggleEdit(false)"
          >
            取消
          </button>
          <button
            type="button"
            class="rounded-full bg-blue-500 w-1/2 p-3 disabled:bg-blue-200"
            @click="confirmEdit"
            :disabled="!isNewContent"
          >
            修改
          </button>
        </div>
      </form>
    </template>
  </BaseContainer>
</template>