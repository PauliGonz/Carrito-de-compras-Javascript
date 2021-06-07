//variables
const carrito = document.querySelector('#carrito');
const abrirCarrito = document.querySelector('#img-carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
const buscar = document.querySelector('.submit-buscador');
const buscadorInput = document.querySelector('#buscador');
const body = document.querySelector('body');
const cerrarCarrito = document.querySelector('.abrir');

let articulosCarritos = [];

cargarEvenListener();

function cargarEvenListener() {

    listaCursos.addEventListener('click', agregarCurso);
    carrito.addEventListener('click',eliminarCurso);
    vaciarCarrito.addEventListener('click',()=>{
        articulosCarritos = [],
        limpiarHTML();
    });
    buscar.addEventListener('click',(e)=>{
        e.preventDefault();
        alert(buscadorInput.value);
        buscadorInput.value='';
    });
 /*    if(carrito.classList.contains('abrir') && e.target.id !== 'carrito' ){
        carrito.classList.remove('abrir');
    } */
    abrirCarrito.addEventListener('click',(e)=>{
        
        if(carrito.classList.contains('abrir') ){
            carrito.classList.remove('abrir');
        }else{
            carrito.classList.add('abrir');

        }});
        cerrarCarrito.addEventListener('mouseleave',() => carrito.classList.remove('abrir'));
    

    //muestra los cursos de localStorage
    document.addEventListener('DOMContentLoaded',() =>{

    articulosCarritos = JSON.parse(localStorage.getItem('carrito')) || [];

    carritoHTML();
});
    
}


//funciones
function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) { // devuelve un true o false
        const CursoSelecionado = e.target.parentElement.parentElement;
        leerDatoCurso(CursoSelecionado);
    }
}
function leerDatoCurso(curso) {
    //crear objeto con el contenido del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    //revisa si un elemento ya existe en el carrito, devuelve un true
    const existe = articulosCarritos.some(curso => curso.id === infoCurso.id);
    //console.log(curso.id);
    if (existe) {
        //actualiza la cantidad
        const cursos = articulosCarritos.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;//retorna el objeto actualizado
            } else {
                return curso;//retorna los objetos que no estan duplicados
            }
        })
        articulosCarritos = [...cursos];// los "..." son como un push para el objeto
    } else {
        //agregamos el curso al carrito
        articulosCarritos = [...articulosCarritos, infoCurso];
    }
    //console.log(articulosCarritos);
    carritoHTML();
}

function carritoHTML() {
    //limpiar el HTML
    //console.log(contenedorCarrito)
    limpiarHTML(); //si no se usa, al agregar un item, aparece el nuevo y el anterior por separado, no se suma solo el nuevo.

    //recorre el carrito y genera el HTML
    articulosCarritos.forEach(curso => {
        const row = document.createElement('tr');//crea la etiqueta con cierre incluido
        const { imagen, titulo, precio, cantidad, id } = curso;
        row.innerHTML = `
        <td><img src="${imagen}" width="100"></td>
        <td>${titulo}</d>
        <td>${precio}</td>
        <td class="cantidad" type="number">${cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${id}"> x </td>
        `;
        //agrega HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    });
    sincronizarLocalStorage();
}

function sincronizarLocalStorage(){
    localStorage.setItem('carrito',JSON.stringify(articulosCarritos));
}

function eliminarCurso(e){
    const cursoId = e.target.getAttribute('data-id') ;
    //console.log(cursoId);
     if(/* carrito.children[0].children[1].children[0] &&  */cursoId){ //solo actua si encuentra un data-id al hacer click

        // const contador =carrito.children[0].children[1].children[0].children[3].textContent;
        const contador =e.target.parentElement.parentElement.children[3].textContent;
        console.log(e.target.parentElement.parentElement.children[3].textContent);
   //para eliminar de uno a uno
    if( contador > 1){ 
        //e.target.parentElement.parentElement.children[3].textContent--; //asi solo lo elimina de la vista;
        //console.log(articulosCarritos);//array definido arriba que guarda los objetos en el carrito;
        console.log(idCarrito(e));
         const cursoss = articulosCarritos.map(curso => { //map permite guardr el arreglo en una variable
            if (curso.id === idCarrito(e)) {
                curso.cantidad--;
                return curso;
            }else {
                return curso;
            }
        })
        articulosCarritos = [...cursoss];
        carritoHTML(); 
        //elimina del arreglo articulos por el data id
    }else if(contador <= 1){
    articulosCarritos = articulosCarritos.filter(curso => curso.id !== idCarrito(e) );
    carritoHTML();
    }   
}
    
}

function idCarrito(e){
    const id = e.target.getAttribute('data-id');
    return id;
}
//leer el cotenido del html  y extrae la info del curso 


//muestra el carrito de compras en el HTML


//eliimina los cursos del tbdy
function limpiarHTML() {
    //manera lenta
    //contenedorCarrito.innerHTML = '';
     while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    } 
    sincronizarLocalStorage();
}

function clickBoton(){
    $(".u-full-width").click(function () {
        $(`#accionBoton`).html(`<p>Producto Agregado</p>`)
        $(`#accionBoton`).css(`background`, `green`)
        $(`#accionBoton`).fadeOut(3500, function(){
            $(`#accionBoton`).html(`<p>Agregar Al Carrito</p>`)
            $(`#accionBoton`).fadeIn(2000) 
            $(`#accionBoton`).css(`background`, `#33C3F0`)
        })    
})
}

