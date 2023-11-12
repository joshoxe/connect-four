<template lang="">
  <main>
    <router-view />
  </main>
</template>
<script>
import { onMounted, onBeforeUnmount } from 'vue';
import { useServerStore } from './stores/server';

export default {
  setup() {
    const server = useServerStore();

    onMounted(() => {
      window.addEventListener('beforeunload', handleCleanup);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('beforeunload', handleCleanup);
    });

  function handleCleanup() {
      server.disconnect();
      server.clearState();
  }
}

}
</script>
<style lang="scss" scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: $secondary-bg;
}
</style>