const http = require("http");

const server = http.createServer((request, response) => {
  if (request.url === "/" && request.method === "GET") {
    const data = {
      nombre: "Eduardo Hernández",
      carrera: "Computer Science",
      hobbies: ["Videojuegos", "Gym", "Ver películas", "Programación"],
    };

    response.writeHead(200, { "Content-Type": "application/json" });
    response.end(JSON.stringify(data));
  } else {
    response.writeHead(404, { "Content-Type": "text/plain" });
    response.end("No encontrado");
  }
});

server.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
