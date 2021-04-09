express = require('express');
const cors = require('cors');
const { socketController } = require('../sockets/controller');

//clase para levantar el server
class Server {
    //levantando el servidor
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //socketio con express
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        //http de las rutas
        this.paths = {}


        //Middlewares
        this.middlewares();

        //Llamado a rutas de mi app
        this.routes();

        //Eventos por socket
        this.sockets()
        //this.eventosSsockets()
    }

    middlewares() {
        //CORS
        this.app.use(cors());

        //Directorio publico
        this.app.use(express.static('public'));

    }

    routes() {
        //   this.app.use(this.paths.auth, require('../routes/auth'));
    }

    sockets() {
        this.io.on("connection", socketController );
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor arriba, puerto: ${this.port}`);
        })
    }
}

module.exports = Server;