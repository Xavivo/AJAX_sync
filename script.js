// Variables globales
let datosJSON = [];
let paginaActual = 1; 
const resultadosPorPagina = 5;
let modoBusqueda = 'name'; 

const input = document.getElementById("busqueda");
const dropdownLabel = document.getElementById('buttonBuscador');

// Fetch a la API
const fetchJSON = async () => {
    const carga = document.getElementById("loader");
    carga.classList.remove("d-none"); // Mostrar loader

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => {
            if (!response.ok) throw Error("No se pudo obtener la información");
            return response.json();
        })
        .then(json => {
            datosJSON = json;
            actualizarTabla();
            carga.classList.add("d-none"); // Escondemos la carga al recibir datos
        })
        .catch(err => {
            carga.textContent = "Error al cargar";
            console.error(err);
        });
}

function actualizarTabla() {
    // Filtramos
    const textoUsuario = input.value.toLowerCase();
    let datosProcesados = datosJSON.filter(usuario => {
        if (modoBusqueda === 'name') {
            return usuario.name.toLowerCase().includes(textoUsuario);
        } else {
            return usuario.address.city.toLowerCase().includes(textoUsuario);
        }
    });

    // Ordenamos
    const valorOrden = document.getElementById("orden").value;
    datosProcesados.sort((a, b) => {
        if (valorOrden === 'asc') return a.name.localeCompare(b.name);
        return b.name.localeCompare(a.name);
    });

    // Calcular Paginación
    const totalPaginas = Math.ceil(datosProcesados.length / resultadosPorPagina) || 1;
    
    // Si al filtrar la página actual queda fuera de rango, volvemos a la 1
    if (paginaActual > totalPaginas) paginaActual = 1;

    const inicio = (paginaActual - 1) * resultadosPorPagina;
    const fin = inicio + resultadosPorPagina;
    const datosPagina = datosProcesados.slice(inicio, fin);

    const infoPaginacion = document.querySelector(".mt-4 p");
    if(infoPaginacion) {
        infoPaginacion.textContent = `Mostrando página ${paginaActual} de ${totalPaginas} (Total: ${datosProcesados.length} usuarios)`;
    }

    resultados(datosPagina);
    gestionarBotones(totalPaginas);
}

function resultados(datos) {
    const resultadosDiv = document.getElementById("body");
    resultadosDiv.innerHTML = "";
    datos.forEach(usuario => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
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
        resultadosDiv.appendChild(fila);
    });
}

// Botones
function gestionarBotones(total) {
    const botonesPrev = document.querySelectorAll("#prev");
    const botonesNext = document.querySelectorAll("#next");

    botonesPrev[0].onclick = () => { paginaActual = 1; actualizarTabla(); }; // Ir primera
    botonesPrev[1].onclick = () => { if(paginaActual > 1) { paginaActual--; actualizarTabla(); } }; // Anterior
    botonesNext[0].onclick = () => { if(paginaActual < total) { paginaActual++; actualizarTabla(); } }; // Siguiente
    botonesNext[1].onclick = () => { paginaActual = total; actualizarTabla(); }; // Ir última

    // Deshabilitar si no hay más páginas
    botonesPrev[0].disabled = (paginaActual === 1);
    botonesPrev[1].disabled = (paginaActual === 1);
    botonesNext[0].disabled = (paginaActual === total);
    botonesNext[1].disabled = (paginaActual === total);
}

// Cambio de modo de búsqueda
document.getElementById('searchByName').addEventListener('click', e => {
    e.preventDefault();
    modoBusqueda = 'name';
    dropdownLabel.textContent = 'Buscar por nombre';
    input.placeholder = 'Buscar por nombre';
    actualizarTabla();
});

document.getElementById('searchByCity').addEventListener('click', e => {
    e.preventDefault();
    modoBusqueda = 'city';
    dropdownLabel.textContent = 'Buscar por ciudad';
    input.placeholder = 'Buscar por ciudad';
    actualizarTabla();
});

// Input
input.addEventListener("input", () => {
    paginaActual = 1;
    actualizarTabla();
});

// Selector de orden
document.getElementById("orden").addEventListener("change", () => {
    actualizarTabla();
});

// LLamamos a la función para cargar los datos
fetchJSON();