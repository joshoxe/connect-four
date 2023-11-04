<template>
    <div>
    <div id="board">
        <img v-show="isHovered" ref="marker" class="marker animate__animated animate__bounce animate__infinite" :src="redMarker" alt="red counter" />

        <div ref=board class="board-container d-none d-md-block" @mouseover="startCounterCheck" @mouseleave="stopCounterCheck">
            <img class="back" :src="backBoardLarge" alt="back board" />
            <img class="front" :src="frontBoardLarge" alt="front board" />
        </div>
        <div class="board-container d-block d-md-none">
            <img class="back" :src="backBoardSmall" alt="back board" />
            <img class="front" :src="frontBoardSmall" alt="front board" />
        </div>
    </div>
</div>
</template>
<script>
import { ref, onMounted } from 'vue';
import backBoardLarge from '../assets/images/board-layer-black-large.svg';
import backBoardSmall from '../assets/images/board-layer-black-small.svg';
import frontBoardLarge from '../assets/images/board-layer-white-large.svg';
import frontBoardSmall from '../assets/images/board-layer-white-small.svg';
import redMarker from '../assets/images/marker-red.svg';

export default {
    setup() {
        const board = ref(null);
        const isHovered = ref(false);
        const marker = ref(null);
        const columns = 7;
        // const rows = 6;
        let columnPositions = [];
        // const rowPositions = [];

        onMounted(() => {
            window.addEventListener("resize", getColumnPositions);
            getColumnPositions(); 
        });

        const getColumnPositions = () => {
            columnPositions = [];
            for (let i = 0; i < columns; i++) {
                columnPositions.push(board.value.offsetLeft + (i * (board.value.offsetWidth / columns)) + (marker.value.width) - i*4);
            }

            console.log(columnPositions)
        }

        const updateMarkerPosition = (event) => {
            const x = event.clientX;
            const y = event.clientY;
            console.log(x, y);
            const validPositions = columnPositions.filter((c) => c < x);
            console.log(`c: ${columnPositions}, x: ${x}`)
            console.log(validPositions);
            const validPositionIndex = columnPositions.indexOf(validPositions[validPositions.length - 1]);
            marker.value.style.left = `${columnPositions[validPositionIndex]}px`;
            console.log('in column', validPositionIndex);
        }

        const startCounterCheck = () => {
            marker.value.style.top = `${board.value.offsetTop - marker.value.height - 2}px`;
            isHovered.value = true;

            window.addEventListener('mousemove', updateMarkerPosition);
        }

        const stopCounterCheck = () => {
            isHovered.value = false;
            window.removeEventListener('mousemove', updateMarkerPosition);
        }

        return {
            // images
            backBoardLarge,
            backBoardSmall,
            frontBoardLarge,
            frontBoardSmall,
            redMarker,

            // refs
            board,
            isHovered,
            marker,

            // methods
            startCounterCheck,
            stopCounterCheck,
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
                z-index: 2;
            }
        }
        
        .marker {
            position: absolute;
            top: 0;
            left: 0;
            transform-origin: top left;
        }
    }
</style>