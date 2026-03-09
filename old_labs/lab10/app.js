const http = require("http");

const programmingLanguages = [
  {
    name: "Python",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
  },
  {
    name: "JavaScript",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
  },
  {
    name: "C++",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
  },
  {
    name: "Java",
    image:
      "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
  },
];

const htmlHeader = `
<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<title>Lab 11</title>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"/>

<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" rel="stylesheet"/>
</head>
<body class="bg-light">

<nav class="navbar navbar-dark bg-dark sticky-top shadow-sm">
<div class="container">
<span class="navbar-brand fw-semibold">Laboratorio 11 - Rutas y formas</span>
<a href="/new" class="btn btn-outline-light btn-sm">Nuevo lenguaje</a>
</div>
</nav>
`;

const htmlFooter = `
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
`;

const htmlForm = `
<div class="container py-5">
<h2 class="mb-4">Agregar Lenguaje</h2>

<form action="/new" method="POST">
<div class="mb-3">
<label for="nameInput" class="form-label">Nombre</label>
<input type="text" class="form-control" id="nameInput" name="name" required>
</div>

<div class="mb-3">
<label for="imageInput" class="form-label">Imagen (URL)</label>
<input type="text" class="form-control" id="imageInput" name="image" required>
</div>

<button type="submit" class="btn btn-primary">Guardar</button>
</form>
</div>
`;

const server = http.createServer((request, response) => {
  if (request.url === "/" && request.method === "GET") {
    response.setHeader("Content-Type", "text/html");

    let htmlContent = `
    <main class="container py-5">
      <h1 class="mb-4">Lenguajes de Programación</h1>
      <div class="row g-4">
    `;

    for (let lang of programmingLanguages) {
      htmlContent += `
        <div class="col-12 col-md-6 col-lg-3">
          <div class="card shadow-sm h-100">
            <img src="${lang.image}" class="card-img-top p-3" style="height:150px; object-fit:contain;">
            <div class="card-body text-center">
              <h5 class="card-title">${lang.name}</h5>
            </div>
          </div>
        </div>
      `;
    }

    htmlContent += `
      </div>
    </main>
    `;

    response.write(htmlHeader + htmlContent + htmlFooter);
    response.end();
  } else if (request.url === "/new" && request.method === "GET") {
    response.setHeader("Content-Type", "text/html");
    response.write(htmlHeader + htmlForm + htmlFooter);
    response.end();
  } else if (request.url === "/new" && request.method === "POST") {
    const body = [];

    request.on("data", (data) => {
      body.push(data);
    });

    request.on("end", () => {
      const parsed = Buffer.concat(body).toString();
      const params = new URLSearchParams(parsed);

      const name = params.get("name");
      const image = params.get("image");

      if (name && image) {
        programmingLanguages.push({ name, image });
      }

      response.statusCode = 302;
      response.setHeader("Location", "/");
      response.end();
    });
  } else {
    response.setHeader("Content-Type", "text/html");
    response.write(
      htmlHeader +
        "<div class='container py-5'><h1>404</h1></div>" +
        htmlFooter,
    );
    response.end();
  }
});

server.listen(3000);
