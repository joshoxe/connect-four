import { Server } from "socket.io";
import { createBoard, getAvailableRow, checkForWin } from "./game.js";
import getRoomName from "./lib/room-names.js";

const io = new Server({
  cors: {
    origin: "*",
  },
});
const board = createBoard(7, 6);
let currentPlayer = 'red';

const playerWins = {
  red: 0,
  yellow: 0,
};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on('make-move', (data) => {
    const { column } = data;
    console.log('move made', socket.rooms);
    
    // get second room name
    const room = [...socket.rooms][1];
    console.log('room', room)
    
    if (column == null || column < 0 || column > 7) {
      socket.emit('error', 'Invalid column');
      return;
    }
  
    const row = getAvailableRow(board, column);
    console.log('row', row)
  
    if (row == null) {
      socket.emit('error', 'Column is full');
      return;
    }
  
    board[row][column] = currentPlayer;
  
    console.log(room, 'room')
    io.to(room).emit('move-made', { column, row, color: currentPlayer });

    const winner = checkForWin(board);

    if (winner) {
      io.to(room).emit('game-over', winner);
      playerWins[winner]++;
    }

    currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';

    io.to(room).emit('next-turn', currentPlayer);
  });

  socket.on('create-room', () => {
    const roomName = getRoomName();
    socket.join(roomName);

    socket.emit('room-created', roomName);
  });

  socket.on('join-room', (roomName) => {
    const room = io.sockets.adapter.rooms.get(roomName);

    if (room == null) {
      socket.emit('error', 'Invalid room');
      return;
    }

    if (room.size > 2) {
      socket.emit('error', 'Room is full');
      return;
    }

    socket.join(roomName);
  });

  socket.on('room-joined', (roomName) => {
    const room = io.sockets.adapter.rooms.get(roomName);
    console.log('room joined', roomName);

    if (room == null) {
      socket.emit('error', 'Invalid room');
      return;
    }

    if (room.size > 2) {
      socket.emit('error', 'Room is full');
      return;
    }

    if (room.size === 2) {
      socket.emit('colour', 'yellow');
      console.log('color', 'yellow')
      // 2 players, start the game
      io.to(roomName).emit('next-turn', currentPlayer);
      return;
    }

    socket.emit('colour', 'red');
    console.log('color', 'red')
  });

  socket.on('get-wins', () => {
    socket.emit('wins', playerWins);
  });
});

io.listen(3000);
console.log("listening on port 3000");
