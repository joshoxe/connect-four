import { ref } from 'vue';
import { defineStore } from 'pinia';
import { io } from 'socket.io-client';

export const useServerStore = defineStore('server', () => {
  const socket = ref(null);
  const isConnected = ref(false);

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
  }

  function disconnect() {
    if (socket.value) {
      socket.value.disconnect();
    }
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

  // Export the socket connection and the connection state
  return { socket, isConnected, disconnect, makeMove, startNewGame, joinRoom };
});
