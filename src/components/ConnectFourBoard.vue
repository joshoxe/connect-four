<template>
    <div v-if="loading">
        <h1>Loading...</h1>
    </div>
    <div v-if="!loading" id="game">
        <player-counter :player="1" :score="0" :playerConnected="playerNumber === 1 ? true : opponentConnected" />
        <div id="board">
            <div ref=board class="board-container d-none d-md-block">
                <img class="back" :src="backBoardLarge" alt="back board" />
                <div ref="grid" class="grid-container">
                    <div class="column" v-for="col in 7" :key="col" @mouseover="setMarkerPosition(col)" @mouseleave="removeMarkerPosition" @click="makeMove(col)">
                        <img v-if="markerColumn === col && playerTurn" class="marker animate__animated animate__bounce animate__infinite" :src="playerColour === 'red' ? redMarker : yellowMarker" alt="red marker" />
                        <div :id="`col-${col}-cell-${row}`" class="cell" v-for="row in 6" :key="`cell-${row}`">
                            <img
                                class="red-counter animate__animated animate__bounceInDown d-none d-md-block"
                                v-if="connectFourBoard[col - 1][row - 1]"
                                :src="connectFourBoard[col - 1][row - 1] === 'red' ? largeRedCounter : largeYellowCounter"
                                alt="counter"
                            >
                        </div>
                    </div>
                </div>
                <img class="front" :src="frontBoardLarge" alt="front board" />
            </div>
            <div class="board-container d-block d-md-none">
                <img class="back" :src="backBoardSmall" alt="back board" />
                <div class="grid-container">
                    <!-- <div v-for="counter in playerCounters" :key="counter">
                        <img ref="counter" class="red-counter" :src="largeRedCounter" alt="red counter">
                    </div> -->
                    <img v-show="isHovered" ref="marker" class="marker animate__animated animate__bounce animate__infinite" :src="redMarker" alt="red marker" />
                </div>
                <img class="front" :src="frontBoardSmall" alt="front board" />
            </div>
        </div>
        <player-counter :player="2" :score="0" :playerConnected="playerNumber === 2 ? true : opponentConnected" />
</div>
</template>
<script>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import backBoardLarge from '../assets/images/board-layer-black-large.svg';
import backBoardSmall from '../assets/images/board-layer-black-small.svg';
import frontBoardLarge from '../assets/images/board-layer-white-large.svg';
import frontBoardSmall from '../assets/images/board-layer-white-small.svg';
import redMarker from '../assets/images/marker-red.svg';
import yellowMarker from '../assets/images/marker-yellow.svg';
import largeRedCounter from '../assets/images/counter-red-large.svg';
import smallRedCounter from '../assets/images/counter-red-small.svg';
import largeYellowCounter from '../assets/images/counter-yellow-large.svg';
import smallYellowCounter from '../assets/images/counter-yellow-small.svg';

import PlayerCounter from '../components/PlayerCounter.vue';

import { useServerStore } from '../stores/server';
import { storeToRefs } from 'pinia';

export default {
    components: {
        PlayerCounter
    },
    setup() {
        const board = ref(null);
        const grid = ref(null);
        const isHovered = ref(false);
        const marker = ref(null);
        const counter = ref(null);
        const markerColumn = ref(null);
        const server = useServerStore();
        const route = useRoute();

        const { connectFourBoard, currentTurn, playerColour, opponentConnected, loading } = storeToRefs(server);

        function setMarkerPosition(col) {
            markerColumn.value = col;
        }

        function removeMarkerPosition() {
            markerColumn.value = null;
        }
 
        const makeMove = (col) => {
            if (!playerTurn.value) return;

            server.makeMove(col);
        };
        
        const isCounterPresent = (column, row) => {
            return connectFourBoard[column - 1][row - 1] !== null;
        }

        const playerTurn = computed(() => {
            return currentTurn.value === playerColour.value;
        });

        const playerNumber = computed(() => {
            return playerColour.value === 'red' ? 1 : 2;
        });

        const opponentNumber = computed(() => {
            return playerColour.value === 'red' ? 2 : 1;
        });

        onMounted(() => {
            if (route.params.roomId && !server.isConnected) {
                server.joinRoom(route.params.roomId);
            }

            server.socket.emit('room-joined', route.params.roomId);

           server.socket.on('move-made', (data) => {
            connectFourBoard.value[data.column - 1][data.row - 1] = data.color;
           });

           server.socket.on('next-turn', (data) => {
               currentTurn.value = data;
           });

           server.socket.on('playerColour', (data) => {
               playerColour.value = data;
           });
        });

        return {
            // images
            backBoardLarge,
            backBoardSmall,
            frontBoardLarge,
            frontBoardSmall,
            redMarker,
            yellowMarker,
            largeRedCounter,
            smallRedCounter,
            largeYellowCounter,
            smallYellowCounter,

            // refs
            board,
            grid,
            isHovered,
            marker, 
            counter,
            markerColumn,
            connectFourBoard,
            playerTurn,
            playerColour,
            playerNumber,
            opponentNumber,
            opponentConnected,
            loading,

            // methods
            setMarkerPosition,
            removeMarkerPosition,
            makeMove,
            isCounterPresent,
        }
    }
}
</script>
<style lang="scss" scoped>
#game {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100vw;
    height: 100vh;
}

    #board {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .board-container {
            position: relative;

            .back {
                position: relative;
                top: 0;
                left: 0;
                z-index: 1;
            }

            .front {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 3;
                pointer-events: none;
            }

            .grid-container {
                display: grid;
                grid-template-columns: repeat(7, 89px);
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            .column {
                display: grid;
                grid-template-rows: repeat(6, 89px);
                z-index: 2;
            }

            .cell {
                z-index: 10;
            }
        }

        .marker {
            position: absolute;
            grid-row: 1;
            z-index: -2;
            margin: -2.5rem 0 0 2rem;
        }

        .red-counter {
            position: relative;
            margin: 1.1rem auto 0 1rem;
            grid-column: span 1;
            z-index: 2;
        }
    }
</style>