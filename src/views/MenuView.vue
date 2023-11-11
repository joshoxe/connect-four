<template>
  <div>
    <main-menu @start-new-game="startNewGame" />
  </div>
</template>
<script>
import { useRouter } from 'vue-router';
import { useServerStore } from '../stores/server';
import MainMenu from '../components/MainMenu.vue';

export default {
  components: {
    MainMenu
  },
  setup() {
    const server = useServerStore();
    const router = useRouter();

    const startNewGame = () => {
      server.startNewGame();

      server.socket.on('room-created', (data) => {
      router.push({ name: 'play', params: { roomId: data } });
     });
    }

    return {
      startNewGame
    }
  }
}
</script>
<style lang="">
  
</style>