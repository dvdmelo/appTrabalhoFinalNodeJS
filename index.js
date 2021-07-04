const express =  require("express");
const http = require("http");
const calculadoraService = require("./calculadoraService");

const WebSocket = require("ws");

const app = express();

app.use("/", express.static("./site"));

//Inicializa um servidor HTTP orquestrado pelo express
const server = http.createServer(app);

//Inicializa um instancia de servidor websocket a partir do servidor http
const wss = new WebSocket.Server({ server });

  const conections = [];

// Função responsável por manusear a conexão websocket
wss.on("connection", (ws) => {

  if(!conections.includes(ws)){
    conections.push(ws);
  }

  // Função que trata as mensagens recebidas pelo servidor
  ws.on("message", (message) => {
    console.log("Mensagem recebida: ", message);
    var resultado = calculadoraService.calcular(message.toString());
    var messageResult = {
      type: 1,
      result: resultado
    }

    var messageHistoricResult = {
      type: 2,
      result: message +" = " + resultado
    }

    console.log("Mensagem enviada: ",resultado);   
    ws.send(JSON.stringify(messageResult));    

    conections.map((w) => {
      w.send(JSON.stringify(messageHistoricResult));    
    });

  });
});

//Inicia o servidor
server.listen(process.env.PORT || 8080, () => {
  console.log("Servidor conectado na porta:", server.address().port);
});
