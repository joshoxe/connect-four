<template>
  <div>
    <button class="btn btn-primary" @click="startNewGame">Play</button>
  </div>
</template>
<script>
import { useRouter } from 'vue-router';
import { useServerStore } from '../stores/server';

export default {
  setup() {
    const server = useServerStore();
    const router = useRouter();

    const startNewGame = () => {
      server.startNewGame();

      server.socket.on('room-created', (data) => {
      console.log('room created', data);
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