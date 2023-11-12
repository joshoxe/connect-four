import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useStateStore = defineStore('state', () => {
  const isHovered = ref(false);

  function toggleHover() {
    isHovered.value = !isHovered.value;
  }

  return {
    isHovered,
    toggleHover,
  };
});