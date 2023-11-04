<template>
    <div id="board">
        <div class="board-container d-none d-md-block">
            <img class="back" :src="backBoardLarge" alt="back board" />
            <img class="front" :src="frontBoardLarge" alt="front board" />
        </div>
        <div class="board-container d-block d-md-none">
            <img class="back" :src="backBoardSmall" alt="back board" />
            <img class="front" :src="frontBoardSmall" alt="front board" />
        </div>
    </div>
</template>
<script>
import backBoardLarge from '../assets/images/board-layer-black-large.svg';
import backBoardSmall from '../assets/images/board-layer-black-small.svg';
import frontBoardLarge from '../assets/images/board-layer-white-large.svg';
import frontBoardSmall from '../assets/images/board-layer-white-small.svg';

export default {
    setup() {
        return {
            backBoardLarge,
            backBoardSmall,
            frontBoardLarge,
            frontBoardSmall,
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
    }
</style>