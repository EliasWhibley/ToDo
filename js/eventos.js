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
    let contenedor = $('#nuevos #noAsignadas');
    contenedor.html('');
    for (item of pLista) {
        if (item.importancia == pImportancia) {

            let nuevoItem = $(`<div data-id=${item.id}>
           <h4>${item.nombre}</h4>
           <p>${item.descripcion}</p>
           <div data-id=${item.id} class="btnBorrar">
           <i class="fas fa-trash-alt"></i>
           </div>
       </div>`);
            nuevoItem.addClass('item');

            contenedor.append(nuevoItem);

            nuevoItem.draggable({
                cancel: ".btnBorrar",
                helper: "clone",
                cursor: "move"
            });
        }
    }
};
$('.item').draggable({
    helper: "clone",
    cursor: "move",
    cancel: ".btnBorrar"
});


$('.contenedor').droppable({
    drop: function (event, ui) {
        ui.draggable.detach();
        $(this).append(ui.draggable);
        console.log(ui.draggable);
        let tareaBuscada = listaTareas.find(function (tarea) {
            return tarea.id == (ui.draggable).data('id');
        });
        console.log($(this).attr('id'))
        tareaBuscada.importancia = $(this).attr('id');

    }
});

/* BORRAR ITEMS */
$('.btnBorrar').on('click', borrarItem);

function borrarItem(event) {
    let indice = listaTareas.findIndex(function (tarea) {
        console.log((event.target).dataset.id);
        return tarea.id == (event.target).dataset.id;

    })
    listaTareas.splice(indice, 1);
}