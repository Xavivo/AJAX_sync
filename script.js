// Variable global para guardar los datos que nos dé la API
let datosJSON = [];
// Función para hacer la petición a la API y guardar los datos en la variable global
const fetchJSON = async () => {
  fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
      // Si la respuesta no es ok, error
      if (!response.ok) throw Error("No se pudo obtener la información");
      // Al contrario, devuelve JSON
      return response.json();
      })
      .then(json => {
        datosJSON = json;
        resultados(datosJSON);
      })
}

function resultados(datos) {
  const resultadosDiv = document.getElementById("body");
  resultadosDiv.innerHTML = "";
  datos.forEach(usuario => {
    const usuarioDiv = document.createElement("tr");
    usuarioDiv.innerHTML = `
      <td>${usuario.name}</td>
      <td>${usuario.username}</td>
      <td>${usuario.id}</td>
      <td>${usuario.email}</td>
      <td>${usuario.address.city}</td>
      <td>${usuario.address.street}</td>
      <td>${usuario.address.suite}</td>
      <td>${usuario.address.zipcode}</td>
      <td>${usuario.address.geo.lat}</td>
      <td>${usuario.address.geo.lng}</td>
    `;
    resultadosDiv.appendChild(usuarioDiv);
  });
}

fetchJSON();

// búsqueda: por defecto nombre, pero se puede cambiar con el dropdown
let modoBusqueda = 'name'; // 'name' ó 'city'

const input = document.getElementById("busqueda");
const dropdownLabel = document.getElementById('buttonBuscador');

// manejar selección del dropdown
const buscarNombre = document.getElementById('searchByName');
const buscarCiudad = document.getElementById('searchByCity');

buscarNombre.addEventListener('click', e => {
  e.preventDefault();
  modoBusqueda = 'name';
  dropdownLabel.textContent = 'Buscar por nombre';
  input.placeholder = 'Buscar por nombre';
  input.value = '';
  resultados(datosJSON);
});

buscarCiudad.addEventListener('click', e => {
  e.preventDefault();
  modoBusqueda = 'city';
  dropdownLabel.textContent = 'Buscar por ciudad';
  input.placeholder = 'Buscar por ciudad';
  input.value = '';
  resultados(datosJSON);
});

// filtrar cuando el usuario escriba
input.addEventListener("input", () => {
  const textoUsuario = input.value.toLowerCase();

  const usuariosFiltrados = datosJSON.filter(usuario => {
    if (modoBusqueda === 'name') {
      return usuario.name.toLowerCase().includes(textoUsuario);
    } else {
      return usuario.address.city.toLowerCase().includes(textoUsuario);
    }
  });

  resultados(usuariosFiltrados);
});