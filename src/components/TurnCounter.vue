<template>
  <div id="turn-counter">
    <img :src="currentTurn === 'red' ? turnBgRed : turnBgYellow" alt="Turn background" id="turn-bg" />
    <div id="turn-counter-container">
      <div id="turn-counter-text">
        <span v-if="!currentTurn"></span>
        <span v-else-if="currentTurn === playerColour">YOUR TURN</span>
        <span v-else-if="currentTurn !== playerColour">OPPONENT'S TURN</span>

        <span v-if="currentTurn" class="timer">{{ turnTimer }}s</span>
      </div>
    </div>
  </div>
</template>
<script>
import { storeToRefs } from 'pinia';
import { useServerStore } from '../stores/server';
import turnBgRed from '../assets/images/turn-background-red.svg';
import turnBgYellow from '../assets/images/turn-background-yellow.svg';

export default {
  setup() {
    const server = useServerStore();

    const { currentTurn, gameOver, winner, playerColour, turnTimer } = storeToRefs(server);

    // timer for turn background

    return {
      currentTurn,
      gameOver,
      winner,
      playerColour,
      turnTimer,
      
      turnBgRed,
      turnBgYellow,
    }
  }
}
</script>

<style lang="scss" scoped>
#turn-counter-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 35%;
  font-weight: 700;

  #turn-counter-text {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .timer {
    font-size: 3rem;
    font-weight: bold;
    margin-top: 1rem;
  }
}
</style>