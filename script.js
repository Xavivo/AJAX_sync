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
        console.log("json cargado: ", json);
        resultados(datosJSON);
      })
}

function resultados(datos) {
  const resultadosDiv = document.getElementById("resultado");
  resultadosDiv.innerHTML = "";
  datos.forEach(usuario => {
    const usuarioDiv = document.createElement("div");
    usuarioDiv.innerHTML = `
      <h3>${usuario.username}</h3>
      <p>ID: ${usuario.id}</p>
      <p>Email: ${usuario.email}</p>
      <p>Ciudad: ${usuario.address.city}</p>
      <p>Calle: ${usuario.address.street}</p>
      <p>Suite: ${usuario.address.suite}</p>
      <p>Zip Code: ${usuario.address.zipcode}</p>
      <p>geo: lat ${usuario.address.geo.lat}</p>
      <p>geo: lng ${usuario.address.geo.lng}</p>
    `;
    resultadosDiv.appendChild(usuarioDiv);
  });
}

fetchJSON();