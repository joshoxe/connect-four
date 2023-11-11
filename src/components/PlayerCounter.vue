<template>
  <div id="player-counter" class="blunt-shadow">
    <img :src="player === 1 ? playerOne : playerTwo" alt="player counter" />
    <div class="score-container text-center">
      <span v-if="playerConnected">PLAYER {{ player }}</span>
      <span v-else>WAITING FOR PLAYER</span>
      <span class="score">{{ score }}</span>
    </div>
  </div>
</template>
<script>
import playerOne from '../assets/images/player-one.svg'
import playerTwo from '../assets/images/player-two.svg'

export default {
  props: {
    player: {
      type: Number,
      default: 0
    },
    score: {
      type: Number,
      required: true
    },
    playerConnected: {
      type: Boolean,
      required: true
    }
  },
  setup() {
    return {
      playerOne,
      playerTwo
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../assets/variables.scss';

#player-counter {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 160px;
  min-width: 160px;
  height: 180px;
  background-color: $white;
  color: $dark;
  border: 3px solid $dark;
  border-radius: 30px;
  margin: 0 1rem;
  font-size: 1.2rem;
  font-weight: 700;

  .score-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    height: 100%;
    width: 100%;
  }

  .score {
    font-size: 2rem;
    font-weight: 700;
    padding-top: 1.5rem;
    flex: 1;
  }

  img {
    flex: 1;
    width: 40%;
    margin-top: -3.5rem;
  }
}
</style>