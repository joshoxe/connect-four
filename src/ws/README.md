# connect-four-ws

This is a socket.io implementation of a game server to enable online multiplayer.

## Protocol

The 'protocol' - I guess. A quick outline on how the server/client communicates.

### Server In

`connection`

This is the default socket.io connection event

`create-room`

Fired when the user chooses to start a new game.

``` js
{
  status: 200
  roomName: 'BigRedDonkey'
}
```

`join-room`

Fired when the user chooses to join an existing room (via route). Should come with a room key

``` js
{
  status: 200
}
```

`make-move`

Fired when a user attempts to place a piece in a column. Server side validation will reject incorrect moves, but the frontend will also block this as a first-line defence.

received:
``` js
{
  column: 4,
}
```
returned:
``` js
{
  status: 200
  column: 4
  row: 2
}
```