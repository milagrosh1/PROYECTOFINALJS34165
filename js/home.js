const contenedorProductos = document.getElementById('contenedor-productos')

const contenedorCarrito = document.getElementById('carrito-contenedor')

const botonVaciar = document.getElementById('vaciar-carrito')

const contadorCarrito = document.getElementById('contadorCarrito')

const precioTotal = document.getElementById('precioTotal')

const cardsContainer = document.querySelector(".cards-container");


document.addEventListener('DOMContentLoaded', () =>{
    if(localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})

let carrito = []



botonVaciar.addEventListener('click', ()=>{
    carrito.length = 0;
    actualizarCarrito()
})
stockProductos.forEach((producto) => {

    const div = document.createElement('div')

    div.classList.add('allCards'); 
    div.innerHTML += `
    <div class="card" style="width: 20rem;">
        <img src=${producto.img}>
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.desc}</p>
            <p class="precioProducto">Precio: $ ${producto.precio}</p>
            <button id="agregar${producto.id}" class="boton-agregar">Add  <i class="fa-solid fa-heart"></i></button>
        </div>
    </div>
    `    
    cardsContainer.appendChild(div);


    const boton = document.getElementById(`agregar${producto.id}`)
    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id)
    })

})


const agregarAlCarrito = (prodId) => {

    const existe = carrito.some (prod => prod.id === prodId)
    if(existe){
        const prod = carrito.map (prod =>{
            if (prod.id === prodId){
                prod.cantidad++
            }
        })
    }else {
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
        console.log(carrito)    
    }
    actualizarCarrito()
}


const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId);
    const indice = carrito.indexOf(item)
    carrito.splice(indice, 1)

    actualizarCarrito()
}


const actualizarCarrito = () => {
    contenedorCarrito.innerHTML = "";

    carrito.forEach((prod) =>{
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p class="editarItems">${prod.nombre}</p>
        <p class="editarItems">Precio: $ ${prod.precio}</p>
        <p class="editarItems">Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick = "eliminarDelCarrito(${prod.id})" class="botonEliminar"><i class="fa-solid fa-trash"></i></button>
        `
        contenedorCarrito.appendChild(div)

        localStorage.setItem('carrito', JSON.stringify(carrito))
    })
    contadorCarrito.innerHTML = carrito.length;
    precioTotal.innerHTML = carrito.reduce((acc, prod) => acc + prod.precio, 0)
}