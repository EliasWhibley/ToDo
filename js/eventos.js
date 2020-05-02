var listaTareas = new Array();

$('#enviarDatos').on('click', recolectarDatos);

var contador = 0;

function recolectarDatos(event) {
    event.preventDefault();
    let nombreTarea = document.querySelector('#tareaNueva').value;
    let descripcionTarea = document.querySelector('#descriptarea').value;

    if (descripcionTarea != "" && nombreTarea != "") {
        contador++;
        $('#error').css('display', 'none')
        let nuevaTarea = {
            id: contador,
            nombre: nombreTarea,
            descripcion: descripcionTarea,
            importancia: 'no asignada'
        }

        listaTareas.push(nuevaTarea);

        pintarLista(listaTareas, nuevaTarea.importancia);

        document.querySelector('#tareaNueva').value = "";
        document.querySelector('#descriptarea').value = "";
    } else {
        $('#error').css('display', 'block')
    }

}



function pintarLista(pLista, pImportancia) {
    let contenedor = $('#noAsignadas .contenedor');
    contenedor.html('');
    for (item of pLista) {
        if (item.importancia == pImportancia) {

            let nuevoItem = $(`<div data-id=${item.id}>
           <h4>${item.nombre}</h4>
           <p>${item.descripcion}</p>
           <i class="fas fa-trash-alt"></i>
       </div>`);
            nuevoItem.addClass('item');

            contenedor.append(nuevoItem);

            nuevoItem.draggable();
        }
    }
};
$('.item').draggable();


$('.contenedor').droppable({
    drop: function (event, ui) {
        ui.draggable.detach();
        $(this).append(ui.draggable);
    }
});