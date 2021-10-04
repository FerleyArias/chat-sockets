// Importamos express para crear el servidor
import express from "express";
// Importamos cors para una seguridad básica del server
import cors from "cors";
// Importamos socket.io
import * as io from "socket.io"
// Importamos los sockets
import { socketController } from "../sockets/controller.js"
// Importamos http
import http from 'http'

class Server {
  constructor() {
    //Instanciamos express
    this.app = express();
    //Definimos el puerto en una variable de entorno
    this.port = process.env.PORT;
    //Creamos el server usando express como plantilla 
    this.server = http.createServer(this.app)
    // Insertamos sockets en el "nuevo server"
    this.io = new io.Server(this.server)
    //Llamar middlewares
    this.middlewares();
    // Llamamos sockets
    this.sockets();
  }

  sockets(){
    this.io.on('connection', socketController)
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.static("public"));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Servidor iniciado en el puerto ${this.port}`);
    });
  }
}

export { Server };
