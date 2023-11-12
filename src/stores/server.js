import { ref } from 'vue';
import { defineStore } from 'pinia';
import { io } from 'socket.io-client';

export const useServerStore = defineStore('server', () => {
  const socket = ref(null);
  const isConnected = ref(false);

  const playerColour = ref(null);
  const opponentConnected = ref(false);
  const gameOver = ref(false);
  const winner = ref(null);
  const connectFourBoard = ref(Array.from({ length: 7 }, () => Array(6).fill(null)));
  const currentTurn = ref(null);
  const loading = ref(true);

  function initializeConnection() {
    if (socket.value && isConnected.value) return;
    console.log('Initializing socket connection');

    socket.value = io('127.0.0.1:3000');

    socket.value.on('connect', () => {
      isConnected.value = true;
      console.log('Socket connected');
    });

    socket.value.on('disconnect', () => {
      isConnected.value = false;
      console.log('Socket disconnected');
    });

    socket.value.on('colour', (colour) => {
      playerColour.value = colour;
    });

    socket.value.on('game-over', (winner) => {
      gameOver.value = true;
      winner.value = winner;
    });

    socket.value.on('next-turn', (colour) => {
      currentTurn.value = colour;
    });

    socket.value.on('start-game', () => {
      console.log('Game started');
      opponentConnected.value = true;
    });

    socket.value.on('player-joined', (colour) => {
      if (colour !== playerColour.value) {
        console.log('Opponent connected');
        opponentConnected.value = true;
      }
    });

    socket.value.on('opponent-disconnected', () => {
      console.log('Opponent disconnected');
      opponentConnected.value = false;
    });

    socket.value.on('loading-finished', () => {
      loading.value = false;
      console.log('Loading finished');
    });
  }

  function disconnect() {
    if (socket.value) {
      socket.value.emit('leave-game');
    }
  }

  function clearState() {
    gameOver.value = false;
    winner.value = null;
    connectFourBoard.value = Array.from({ length: 7 }, () => Array(6).fill(null));
    currentTurn.value = null;
    opponentConnected.value = false;
    loading.value = true;
  }

  function makeMove(column) {
    socket.value.emit('make-move', { column });
  }

  function startNewGame() {
    initializeConnection();
    socket.value.emit('create-room');
  }

  function joinRoom(room) {
    initializeConnection();
    socket.value.emit('join-room', room);
  }

  return {
    socket,
    isConnected,
    disconnect,
    makeMove,
    startNewGame,
    joinRoom,
    clearState,
    playerColour,
    gameOver,
    winner,
    connectFourBoard,
    currentTurn,
    opponentConnected,
  }
});
