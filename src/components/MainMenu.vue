<template>
  <div id="main-menu" class="blunt-shadow">
    <img :src="logo" class="logo-img" alt="Connect four logo" />

    <button
      class="button main blunt-shadow mb-4 play-button"
      @click="$emit('start-new-game')"
    >
      PLAY ONLINE
      <img :src="playerVsPlayer" class="button-img" alt="Player vs player" />
    </button>
    <button class="button secondary blunt-shadow mb-4">GAME RULES</button>
  </div>
</template>
<script>
import logo from '@/assets/images/logo.svg'
import playerVsPlayer from '@/assets/images/player-vs-player.svg'

export default {
  emits: ['start-new-game'],
  setup() {
    return {
      logo,
      playerVsPlayer,
    }
  }
}
</script>
<style lang="scss">
@import '../assets/variables.scss';
@import 'node_modules/bootstrap/scss/mixins';

#main-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 480px;
  background-color: $primary-bg;
  padding: 5%;
  border: 2px solid $dark;
  border-radius: 30px;

  .logo-img {
    margin: 15% 0;
  }

  .play-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}


@include media-breakpoint-down(sm) {
  #main-menu {
    min-width: 280px;
  }
}
  
</style>