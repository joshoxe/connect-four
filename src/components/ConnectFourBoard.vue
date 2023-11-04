<template>
    <div>
    <div id="board">
        <div ref=board class="board-container d-none d-md-block">
            <img class="back" :src="backBoardLarge" alt="back board" />
            <div class="grid-container">
                <div class="column" v-for="col in 7" :key="col" @mouseover="setMarkerPosition(col)" @mouseleave="removeMarkerPosition">
                    <img v-if="markerColumn === col" class="marker animate__animated animate__bounce animate__infinite" :src="redMarker" alt="red marker" />
                </div>
                <div v-for="counter in playerCounters" :key="counter">
                    <img ref="counter" class="red-counter" :src="largeRedCounter" alt="red counter">
                </div>
            </div>
            <img class="front" :src="frontBoardLarge" alt="front board" />
        </div>
        <div class="board-container d-block d-md-none">
            <img class="back" :src="backBoardSmall" alt="back board" />
            <div class="grid-container">
                <div v-for="counter in playerCounters" :key="counter">
                    <img ref="counter" class="red-counter" :src="largeRedCounter" alt="red counter">
                </div>
                <img v-show="isHovered" ref="marker" class="marker animate__animated animate__bounce animate__infinite" :src="redMarker" alt="red marker" />
            </div>
            <img class="front" :src="frontBoardSmall" alt="front board" />
        </div>
    </div>
</div>
</template>
<script>
import { ref, computed } from 'vue';
import backBoardLarge from '../assets/images/board-layer-black-large.svg';
import backBoardSmall from '../assets/images/board-layer-black-small.svg';
import frontBoardLarge from '../assets/images/board-layer-white-large.svg';
import frontBoardSmall from '../assets/images/board-layer-white-small.svg';
import redMarker from '../assets/images/marker-red.svg';
import largeRedCounter from '../assets/images/counter-red-large.svg';
import smallRedCounter from '../assets/images/counter-red-small.svg';

export default {
    setup() {
        const board = ref(null);
        const isHovered = ref(false);
        const marker = ref(null);
        const counter = ref(null);
        const playerCounters = [];
        const markerColumn = ref(null);


        function setMarkerPosition(col) {
            markerColumn.value = col;
        }

        function removeMarkerPosition() {
            markerColumn.value = null;
        }

        const markerStyle = computed(() => {
            if (markerColumn.value !== null) {
                return {
                    'grid-column': `${markerColumn.value}`,
                    'grid-row': '0',
                };
            }
            return {};
        });

        return {
            // images
            backBoardLarge,
            backBoardSmall,
            frontBoardLarge,
            frontBoardSmall,
            redMarker,
            largeRedCounter,
            smallRedCounter,

            // refs
            board,
            isHovered,
            marker,
            playerCounters,
            counter,
            markerColumn,

            // methods
            setMarkerPosition,
            removeMarkerPosition,
            markerStyle,
        }
    }
}
</script>
<style lang="scss" scoped>
    #board {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;

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
            }

            .grid-container {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                grid-template-rows: repeat(6, 1fr);
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
            }
            .column {
                display: flex;
                align-items: start;
                justify-content: center;
                grid-column: span 1;
                grid-row: 1 / -1;
                z-index: 10;
            }
        }

        .marker {
            grid-row: 1;
            z-index: 2;
            margin: -2.5rem auto 0 auto;
        }

        .red-counter {
            grid-column: span 1;
            z-index: 2;
        }
    }
</style>