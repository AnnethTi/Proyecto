//  -- LO DEL CARRITO -- //
//variables
const carrito = document.querySelector('#carrito')
const listaProductos = document.querySelector('.contenedor-novedades')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
let articulosCarrito = []

//Funciones para agregar,eliminar, etc del carrito

cargarEventListeners();

function cargarEventListeners() {
    listaProductos.addEventListener('click', agregarProducto);

    carrito.addEventListener('click', eliminarProducto);

    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []
        vaciarCarrito()
    });

}

//anadir producto al carrito
function agregarProducto(e) {
    e.preventDefault();
    
    if(e.target.classList.contains('agregar-carrito')) {
         const producto = e.target.parentElement.parentElement;
         console.log(producto);
         leerDatosProducto(producto);

    }
}

function leerDatosProducto(producto) {
    const infoProducto = {
         titulo: producto.querySelector('h3').textContent,
         precio: producto.querySelector('.precio').textContent,
         id: producto.querySelector('a').getAttribute('data-id'), 
         cantidad: 1
    }

    if( articulosCarrito.some( producto => producto.id === infoProducto.id ) ) { 
         const productos = articulosCarrito.map( producto => {
              if( producto.id === infoProducto.id ) {
                   producto.cantidad++;
                    return producto;
               } else {
                    return producto;
            }
         })
         articulosCarrito = [...productos];
    }  else {
         articulosCarrito = [...articulosCarrito, infoProducto];
    }

    // console.log(articulosCarrito)
    // console.log(articulosCarrito)
    carritoHTML();
}

// Elimina el producto 
function eliminarProducto(e) {
    e.preventDefault();
    if(e.target.classList.contains('borrar-producto') ) {
         const productoId = e.target.getAttribute('data-id')
         
         // Eliminar del arreglo del carrito
         articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);

         carritoHTML();
    }
}

// agregar producto al carrito
function carritoHTML() {

    vaciarCarrito();

    articulosCarrito.forEach(producto => {
         const row = document.createElement('tr');
         row.innerHTML = `
              
              <td>${producto.titulo}</td>
              <td>${producto.precio}</td>
              <td>${producto.cantidad} </td>
              <td>
                   <a href="#" class="borrar-producto" data-id="${producto.id}">X</a>
              </td>
         `;
         contenedorCarrito.appendChild(row);

    });

}

// Eliminar los productos
function vaciarCarrito() {
    
    while(contenedorCarrito.firstChild) {
         contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}

// -- VALIDAR FORMULARIO DEL FOOTER -- //
function validarEmail(email){
     let expresionRegular =  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
     let esValido =  expresionRegular.test(email)
     console.log(email);
     if (!esValido){
          alert('El correo electronico es invalido')
     }
}