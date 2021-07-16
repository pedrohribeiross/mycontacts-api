const express = require("express");
require("express-async-errors"); // Como o Error Handler não funciona com funções async, precisa instalar esse pacote.

const routes = require("./routes");

const app = express();

/*
// Passamos este código para o Routes.

app.use((request, response) => {
  // Middleware 01
  request.appId = "MeuAppID";

  // Para travar o middleware e não ir para o próximo, fazemos um response.send('').
  response.send("Interceptado pelo Middleware");
});
*/

// app.use é um Middleware

app.use(express.json());

app.use(routes);

// Error Handler (Middleware express) -> Manipulador de erros. Quando o middleware possui os 4 parametros, ele se torna um Error Handler e ele tem que vir depois das middleware de rotas.
app.use((error, request, response, next) => {
  console.log("######### ERROR HANDLER #########");
  console.log(error);
  response.sendStatus(500);
});

app.listen(3000, () =>
  console.log("🔥 Server started at http://localhost:3000")
);
