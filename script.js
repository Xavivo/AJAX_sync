// Variable global para guardar los datos que nos dé la API
let usuariosGlobal = [];
// Función para hacer la petición a la API y guardar los datos en la variable global
const fetchJSON = async () => {
  fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => {
      // Si la respuesta no es ok, error
      if (!response.ok) throw Error("No se pudo obtener la información");
      // Al contrario, devuelve JSON
      return response.json();
      })
      .then(json => {
        console.log("json cargado: ", json);
      })
}