const socketController = socket => {
  console.log(`Cliente conectado ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Cliente desconectado ${socket.id}`);
  });

  socket.on('send-message', (payload) => {
    console.log(payload)
    //socket.emit('server-response')
    socket.broadcast.emit('server-response', payload)
  });
};

export {socketController};
