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