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

// Filtrar según lo que se escriba en el input, por nombre o por ciudad
const input = document.getElementById("busqueda");

input.addEventListener("input", () => {
  // Pasamos a minúsculas
  const textoUsuario = inputBusqueda.value.toLowerCase();

  // Filtramos
  const usuariosFiltrados = datosJSON.filter(usuario => {
  const nombre = usuario.name.toLowerCase();
  const ciudad = usuario.address.city.toLowerCase();

  // Comprobamos si el texto está en el nombre O en la ciudad
  return nombre.includes(textoUsuario) || ciudad.includes(textoUsuario);
  });
  // Volvemos a llamar a la función, pero ahora está el array filtrado
  resultados(usuariosFiltrados);

});