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

            let nuevoItem = $(`<div id="Tarea${item.id}" data-id=${item.id}>
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
/* let btnBorrar = document.getElementsByClassName('btnBorrar');
btnBorrar.on('click', borrarItem); */

$(document).on('click', '.btnBorrar', borrarItem);

function borrarItem(event) {
    let numeroTarea = (event.target).parentNode.dataset.id;
    let indice = listaTareas.findIndex(function (tarea) {
        console.log(numeroTarea);
        return tarea.id == numeroTarea;

    })

    listaTareas.splice(indice, 1);

    let tareaBorrada = document.getElementById('Tarea' + numeroTarea);
    tareaBorrada.remove();
}

/* BUSCAR ITEM */

$('#busqueda').on('keyup', buscarItems);


function buscarItems(event) {
    console.log(event.target.value.toLowerCase());
    let nombreBuscado = (event.target.value.toLowerCase());
    for (tarea of listaTareas) {
        let tareaBuscada = (tarea.nombre).toLowerCase();
        let tareaEmergente = document.getElementById('Tarea' + tarea.id)
        if (tareaBuscada.includes(nombreBuscado) || nombreBuscado == '') {

            tareaEmergente.style.display = 'block';
        } else {
            tareaEmergente.style.display = 'none';
        }
    }
}