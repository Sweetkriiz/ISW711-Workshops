const API_TEACHER = "http://localhost:3001/api/teacher";
const API_COURSE = "http://localhost:3001/api/course";

let profesorEditando = null;
let cursoEditando = null;

window.onload = () => {
  cargarProfesores();
  cargarCursos();
};


// PROFESORES
function guardarProfesor() {

  const data = {
    name: document.getElementById("t_name").value,
    lastName: document.getElementById("t_lastName").value,
    cedula: document.getElementById("t_cedula").value,
    age: document.getElementById("t_age").value
  };

  const metodo = profesorEditando ? "PUT" : "POST";
  const url = profesorEditando
    ? API_TEACHER + "/" + profesorEditando
    : API_TEACHER;

  fetch(url, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(() => {
    limpiarProfesor();
    cargarProfesores();
  });
}

function cargarProfesores() {

  fetch(API_TEACHER)
    .then(res => res.json())
    .then(data => {

      const lista = document.getElementById("listaProfesores");
      lista.innerHTML = "";

      data.forEach(p => {

        const li = document.createElement("li");

        li.innerHTML = `
          ${p.name} ${p.lastName} - ${p.cedula}
          <button onclick="editarProfesor('${p._id}','${p.name}','${p.lastName}','${p.cedula}','${p.age}')">Editar</button>
          <button onclick="eliminarProfesor('${p._id}')">Eliminar</button>
        `;

        lista.appendChild(li);
      });
    });
}

function eliminarProfesor(id) {

  fetch(API_TEACHER + "/" + id, { method: "DELETE" })
    .then(() => cargarProfesores());
}

function editarProfesor(id, name, lastName, cedula, age) {

  profesorEditando = id;

  document.getElementById("t_name").value = name;
  document.getElementById("t_lastName").value = lastName;
  document.getElementById("t_cedula").value = cedula;
  document.getElementById("t_age").value = age;
}

function limpiarProfesor() {
  profesorEditando = null;
  document.getElementById("t_name").value = "";
  document.getElementById("t_lastName").value = "";
  document.getElementById("t_cedula").value = "";
  document.getElementById("t_age").value = "";
}

// CURSOS
function guardarCurso() {

  const data = {
    name: document.getElementById("c_name").value,
    code: document.getElementById("c_code").value,
    description: document.getElementById("c_description").value,
    teacherId: document.getElementById("c_teacherId").value
  };

  const metodo = cursoEditando ? "PUT" : "POST";
  const url = cursoEditando
    ? API_COURSE + "/" + cursoEditando
    : API_COURSE;

  fetch(url, {
    method: metodo,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(() => {
    limpiarCurso();
    cargarCursos();
  });
}

function cargarCursos() {

  fetch(API_COURSE)
    .then(res => res.json())
    .then(data => {

      const lista = document.getElementById("listaCursos");
      lista.innerHTML = "";

      data.forEach(c => {

        const li = document.createElement("li");

        li.innerHTML = `
          ${c.name} - ${c.code}
          <button onclick="editarCurso('${c._id}','${c.name}','${c.code}','${c.description}','${c.teacherId}')">Editar</button>
          <button onclick="eliminarCurso('${c._id}')">Eliminar</button>
        `;

        lista.appendChild(li);
      });
    });
}

function eliminarCurso(id) {

  fetch(API_COURSE + "/" + id, { method: "DELETE" })
    .then(() => cargarCursos());
}

function editarCurso(id, name, code, description, teacherId) {

  cursoEditando = id;

  document.getElementById("c_name").value = name;
  document.getElementById("c_code").value = code;
  document.getElementById("c_description").value = description;
  document.getElementById("c_teacherId").value = teacherId;
}

function limpiarCurso() {
  cursoEditando = null;
  document.getElementById("c_name").value = "";
  document.getElementById("c_code").value = "";
  document.getElementById("c_description").value = "";
  document.getElementById("c_teacherId").value = "";
}
