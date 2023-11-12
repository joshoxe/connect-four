<template>
  <div id="bottom-turn" :class="{ red: winner === 'red', yellow: winner === 'yellow' }">
  </div>
</template>
<script>
import { storeToRefs } from 'pinia';
import { useServerStore } from '../stores/server';

export default {
  setup() {
    const server = useServerStore();

    const { currentTurn, gameOver, winner } = storeToRefs(server);

    return {
      currentTurn,
      gameOver,
      winner,
    };
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/variables.scss';

  #bottom-turn {
    position: absolute;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 100vw;
    height: 30%;
    border-radius: 50px;
    margin-bottom: -35px;
    background-color: $secondary-bg;
  }

  .red {
    background-color: $red;
  }

  .yellow {
    background-color: $yellow;
  }
</style>