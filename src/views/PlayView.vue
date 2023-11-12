<template>
    <div id="play-view">
        <div id="board-view">
            <player-counter :player="1" :score="0" :playerConnected="playerNumber === 1 ? true : opponentConnected" />
            <connect-four-board :player-number=playerNumber />
            <player-counter :player="2" :score="0" :playerConnected="playerNumber === 2 ? true : opponentConnected" />
        </div>

        <bottom-turn-display />
    </div>
</template>
<script>
import { useRoute } from 'vue-router'
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import ConnectFourBoard from '@/components/ConnectFourBoard.vue'
import { useServerStore } from '@/stores/server'
import { storeToRefs } from 'pinia'
import PlayerCounter from '../components/PlayerCounter.vue'
import BottomTurnDisplay from '../components/BottomTurnDisplay.vue'

export default {
    components: {
        ConnectFourBoard,
        BottomTurnDisplay,
        PlayerCounter,
    },
    setup() {
        const server = useServerStore();
        const route = useRoute();
        const roomId = ref(null);

        const { playerColour, opponentConnected } = storeToRefs(server);

        const playerNumber = computed(() => {
            return playerColour.value === 'red' ? 1 : 2;
        });

        onMounted(() => {
            roomId.value = route.params.roomId;
        });

        onBeforeUnmount(() => {
          server.disconnect(roomId.value);
          server.clearState();  
        });

        return {
            playerNumber,
            opponentConnected,
        }
    }
    
}
</script>
<style lang="scss">
#play-view {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: $primary-bg;
}

#board-view {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    flex: 1;
}
</style>