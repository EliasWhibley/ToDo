var listaTareas = new Array();

$('#enviarDatos').on('click', recolectarDatos);

function recolectarDatos(event) {
    event.preventDefault();
    let nombreTarea = document.querySelector('#tareaNueva').value;
    let descripcionTarea = document.querySelector('#descriptarea').value;

    let nuevaTarea = {
        nombre: nombreTarea,
        descripcion: descripcionTarea,
        importancia: 0
    }

    noAsignadas.push(nuevaTarea);
}