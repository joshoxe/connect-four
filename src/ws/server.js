import { Server } from "socket.io";
import { createBoard, getAvailableRow, checkForWin } from "./game.js";
import getRoomName from "./lib/room-names.js";

const io = new Server({
  cors: {
    origin: "*",
  },
});

// structure:
//
// {
//   roomName: {
//     board: [],
//     currentPlayer: 'red',
//     playerWins: {
//       red: 0,
//       yellow: 0,
//     }
//    players: {
//      red: socketId,
//      yellow: socketId,
//    }
//   }
// }
const games = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on('make-move', (data) => {
    const { column } = data;
    console.log('move made', socket.rooms);
    
    // get room from socket
    const room = [...socket.rooms][1];
    
    if (column == null || column < 0 || column > 7) {
      socket.emit('error', 'Invalid column');
      return;
    }

    const game = games[room];
  
    const row = getAvailableRow(game.board, column);
  
    if (row == null) {
      socket.emit('error', 'Column is full');
      return;
    }
  
    game.board[row][column] = game.currentPlayer;
  
    io.to(room).emit('move-made', { column, row, color: game.currentPlayer });

    const winner = checkForWin(game.board);

    if (winner) {
      io.to(room).emit('game-over', winner);
      game.playerWins[winner]++;
    }

    game.currentPlayer = game.currentPlayer === 'red' ? 'yellow' : 'red';

    io.to(room).emit('next-turn', game.currentPlayer);
  });

  socket.on('create-room', () => {
    const board = createBoard(7, 6);
    const roomName = getRoomName();
    socket.join(roomName);
    games[roomName] = {
      board: board,
      currentPlayer: 'red',
      playerWins: {
        red: 0,
        yellow: 0,
      },
      players: {}
    };

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
    const game = games[roomName];

    if (game == null) {
      socket.emit('error', 'Invalid room');
      return;
    }
  });

  socket.on('room-joined', (roomName) => {
    const game = games[roomName]
    console.log('room joined', roomName);

    if (game == null) {
      socket.emit('error', 'Invalid room');
      return;
    }

    if (game.players?.red && game.players?.yellow) {
      socket.emit('error', 'Room is full');
      return;
    }


    const player = game.players?.red ? 'yellow' : 'red';
    game.players[player] = socket.id;

    socket.emit('colour', player);
    io.to(roomName).emit('player-joined', player);

    if (game.players.red && game.players.yellow) {
      io.to(roomName).emit('start-game');
      io.to(roomName).emit('next-turn', game.currentPlayer);
    }

    socket.emit('loading-finished');
  });

  socket.on('get-wins', (roomName) => {
    const game = games[roomName];

    if (game == null) {
      socket.emit('error', 'Invalid room');
      return;
    }

    socket.emit('wins', game.playerWins);
  });

  socket.on('leave-game', () => {
    console.log('user disconnected', socket.id);


    // find all rooms that the user is in
    const rooms = [...socket.rooms];

    console.log('rooms', rooms);

    for (let i = 1; i < rooms.length; i++) {
      const roomName = rooms[i];
      const game = games[roomName];
      console.log('room', roomName)
      console.log('game', game)

      if (game == null) {
        return;
      }

      console.log('finding player to remove')
      if (game.players.red === socket.id) {
        game.players.red = null;
      } else if (game.players.yellow === socket.id) {
        game.players.yellow = null;
      }

      console.log('player removed', game.players)

      if (game.players.red != null || game.players.yellow != null) {
        console.log('opponent disconnected', socket.id)
        io.to(roomName).emit('opponent-disconnected');
        return;
      }

      console.log('deleting room', roomName);

      delete games[roomName];

      console.log('room deleted', roomName);

      socket.leave(roomName);
    }
  });
});

io.listen(3000);
console.log("listening on port 3000");
