const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Eduardo Hernández — Lab 5</title>
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
      crossorigin="anonymous"
    />
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
      rel="stylesheet"
    />
  </head>
  <body class="bg-light">
    <nav class="navbar navbar-dark bg-dark sticky-top shadow-sm">
      <div class="container">
        <span class="navbar-brand fw-semibold">EHA</span>
        <div class="d-flex gap-3">
          <a class="nav-link text-white-50 p-0" href="#sobre-mi">Sobre mí</a>
          <a class="nav-link text-white-50 p-0" href="#proyectos">Proyectos</a>
          <a class="nav-link text-white-50 p-0" href="#hobbies">Hobbies</a>
        </div>
      </div>
    </nav>

    <section class="bg-primary text-white text-center py-5">
      <div class="container">
        <div
          class="d-inline-flex align-items-center justify-content-center rounded-circle bg-white bg-opacity-25 border border-3 border-white mb-4 p-4"
        >
          <span class="fs-2 fw-bold">EH</span>
        </div>
        <h1 class="fw-bold mb-1">Eduardo Hernández Alonso</h1>
        <p class="mb-4 opacity-75">
          Ingeniería en Tecnologías Computacionales · 4to Semestre
        </p>
        <div class="d-flex justify-content-center gap-3 flex-wrap">
          <a
            href="mailto:A01707225@tec.mx"
            class="btn btn-outline-light btn-sm"
          >
            <i class="bi bi-envelope me-1"></i>A01707225@tec.mx
          </a>
          <a
            href="https://github.com/eduardo-hdez"
            target="_blank"
            class="btn btn-outline-light btn-sm"
          >
            <i class="bi bi-github me-1"></i>GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/eduardo-hdeza/"
            target="_blank"
            class="btn btn-light btn-sm text-primary fw-semibold"
          >
            <i class="bi bi-linkedin me-1"></i>LinkedIn
          </a>
        </div>
      </div>
    </section>

    <main class="container py-5">
      <div class="row g-4 justify-content-center">
        <div class="col-12 col-lg-10" id="sobre-mi">
          <div class="card border-0 shadow-sm rounded-3 p-4">
            <p class="text-primary text-uppercase fw-bold small mb-2">
              <i class="bi bi-person me-1"></i>Sobre mí
            </p>
            <p class="mb-0 text-secondary">
              Hola, soy Eduardo, estudiante de 4to semestre en la carrera de
              Ingeniería en Tecnologías Computacionales. Estoy muy apasionado
              por esta materia ya que desde que entré a la carrera esperaba
              hacer aplicaciones fullstack, lo cual es lo que quisiera trabajar
              una vez egresado. Tengo experiencia en aplicaciones fullstack
              mediante el autoestudio y en los hackathones que he atendido.
            </p>
          </div>
        </div>

        <div class="col-12 col-lg-10" id="proyectos">
          <div class="card border-0 shadow-sm rounded-3 p-4">
            <p class="text-primary text-uppercase fw-bold small mb-3">
              <i class="bi bi-code-slash me-1"></i>Proyectos
            </p>
            <div class="accordion accordion-flush" id="accordionFlush">
              <div class="accordion-item border rounded-2 mb-2 overflow-hidden">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed fw-semibold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    <i class="bi bi-rocket-takeoff me-2 text-primary"></i>
                    Monvi — ActInSpace 2026
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionFlush"
                >
                  <div class="accordion-body text-secondary">
                    Sistema de monitoreo ambiental para proyectos de
                    construcción usando imágenes satelitales e IA. Proyecto
                    desarrollado durante el ActInSpace 2026 Hackathon.
                  </div>
                </div>
              </div>

              <div class="accordion-item border rounded-2 mb-2 overflow-hidden">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed fw-semibold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="false"
                    aria-controls="flush-collapseTwo"
                  >
                    <i class="bi bi-controller me-2 text-primary"></i>
                    Hotline Miami Weapon Manager
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionFlush"
                >
                  <div class="accordion-body text-secondary">
                    Sistema de gestión de armas inspirado en Hotline Miami.
                    Implementado en C++ con manejo de archivos, algoritmos de
                    ordenamiento optimizados y estructuras de datos eficientes.
                  </div>
                </div>
              </div>

              <div class="accordion-item border rounded-2 overflow-hidden">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed fw-semibold"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseThree"
                    aria-expanded="false"
                    aria-controls="flush-collapseThree"
                  >
                    <i class="bi bi-car-front me-2 text-primary"></i>
                    IoT Parking Lot Manager
                  </button>
                </h2>
                <div
                  id="flush-collapseThree"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionFlush"
                >
                  <div class="accordion-body text-secondary">
                    Sistema de gestión de estacionamiento IoT con inteligencia
                    artificial que utiliza ESP32-CAM, detección de objetos
                    YOLOv8 y un panel de análisis en tiempo real. Monitorea 8
                    plazas de aparcamiento con detección automática de vehículos
                    y registro MySQL.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 col-lg-10" id="hobbies">
          <div class="card border-0 shadow-sm rounded-3 p-4">
            <p class="text-primary text-uppercase fw-bold small mb-3">
              <i class="bi bi-stars me-1"></i>Hobbies
            </p>
            <div class="d-flex flex-wrap gap-2">
              <span class="badge rounded-pill bg-primary fs-6 px-3 py-2">
                <i class="bi bi-joystick me-1"></i>Jugar videojuegos
              </span>
              <span class="badge rounded-pill bg-primary fs-6 px-3 py-2">
                <i class="bi bi-camera-reels me-1"></i>Ver películas
              </span>
              <span class="badge rounded-pill bg-primary fs-6 px-3 py-2">
                <i class="bi bi-lightning-charge me-1"></i>Ir al gimnasio
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>

    <footer class="bg-dark text-secondary py-4 mt-2">
      <div
        class="container d-flex flex-column flex-sm-row justify-content-between align-items-center gap-2"
      >
        <span class="small">
          <i class="bi bi-code-square me-1"></i>Editor usado:
          <a
            href="https://code.visualstudio.com/"
            target="_blank"
            class="ms-1 link-light"
          >
            Visual Studio Code
          </a>
        </span>
        <span class="small opacity-50">© 2026 Eduardo Hernández Alonso</span>
      </div>
    </footer>

    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
`;

const http = require("http");

const server = http.createServer((request, response) => {
  console.log(request.url);
  response.setHeader("Content-Type", "text/html");
  response.write(html);
  response.end();
});

server.listen(3000);
