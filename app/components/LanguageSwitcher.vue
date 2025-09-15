<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useLanguage } from "~/composables/useLanguage";

const { locale, switchLanguage } = useLanguage();

const languages = [
  { code: "ar", label: "العربية", flag: "https://flagcdn.com/sa.svg" },
  { code: "en", label: "English", flag: "https://flagcdn.com/us.svg" },
];

const open = ref(false);
const dropdownRef = ref<HTMLDivElement | null>(null);

const current: Ref = computed(() => {
  return languages.find((l) => l.code === locale.value) ?? languages[0];
});

function toggle() {
  open.value = !open.value;
}

function select(langCode: string) {
  switchLanguage(langCode);
  open.value = false;
}

function onDocClick(e: MouseEvent) {
  if (!dropdownRef.value) return;
  const target = e.target as Node;
  if (open.value && !dropdownRef.value.contains(target)) open.value = false;
}

onMounted(() => document.addEventListener("click", onDocClick));
onBeforeUnmount(() => document.removeEventListener("click", onDocClick));
</script>

<template>
  <div
    :class="locale === 'ar' ? 'right-10' : 'left-10'"
    class="absolute top-4 z-10">
    <div ref="dropdownRef" class="relative inline-block bg-white rounded-lg text-left">

      <UButton
        size="sm"
        variant="ghost"
        class="flex items-center gap-2 text-[#000000]"
        @click.stop="toggle">
        <img
          :src="current.flag"
          alt=""
          class="w-5 h-5 rounded-full object-cover" />
        <span class="sm:inline">{{ current.label }}</span>
      </UButton>

      <!-- list -->
      <transition name="fade">
        <div
          v-if="open"
          :class="locale === 'ar' ? 'right-0' : 'left-0'"
          class="absolute mt-2 w-40 bg-white border rounded-md shadow-lg overflow-hidden z-50">
          <button
            v-for="lang in languages"
            :key="lang.code"
            class="w-full flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
            @click="select(lang.code)">
            <img
              :src="lang.flag"
              alt=""
              class="w-5 h-5 rounded-full object-cover" />
            <span class="text-sm">{{ lang.label }}</span>
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>
