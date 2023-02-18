const contenedor = document.querySelector('#contenedor')
const contenedorCarrito = document.getElementById('carrito-contenedor')
const botonVaciar = document.getElementById('vaciar-carrito')
const contadorCarrito = document.getElementById('contadorCarrito')
const precioTotal = document.querySelector('#precioTotal')
const cardsContainer = document.querySelector(".cards-container")
const activarFuncion = document.querySelector('#activarFuncion')
const continuarCompra = document.querySelector('#procesarCompra')
const formulario = document.querySelector('#procesar-pago')
const finalizarCompra = document.querySelector('#buttonFinalizar')



if (activarFuncion) {
    activarFuncion.addEventListener("click", procesarPedido);
}

if(formulario){
    formulario.addEventListener('submit', enviarCompra)
}
document.addEventListener('DOMContentLoaded', () =>{
    carrito = JSON.parse(localStorage.getItem('carrito')) || []
    
    actualizarCarrito()
    document.querySelector('#activarFuncion').click(procesarPedido)


    
})   

let carrito = []


continuarCompra.addEventListener('click', () =>{

    if(carrito.length == 0){
        Swal.fire({
            icon: 'error',
            title: 'Nothing yet to buy! ',
            text: 'Make sure you have something on the cart to continue.',
        })
    }else{
        location.href = 'compra.html'

        procesarPedido()
    }
})



botonVaciar.addEventListener('click', ()=>{
    carrito.length = 0;
    actualizarCarrito()
})



    stockProductos.forEach((prod) => {
        const { id, nombre, precio, desc, img, cantidad } = prod;
        if (contenedor) {

        contenedor.innerHTML += `
        <div class="card mt-5" style="width: 18rem;">
        <img class="card-img-top mt-2" src="${img}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${nombre}</h5>
            <p class="card-text">Precio: ${precio}</p>
            <p class="card-text">Descripcion: ${desc}</p>
            <p class="card-text">Cantidad: ${cantidad}</p>
            <button class="btn btn-primary" onclick="agregarAlCarrito(${id})">Comprar Producto</button>
        </div>
        </div>
        `;
        }
        
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
        

    })

    guardarStorage()
    contadorCarrito.innerHTML = carrito.length;
    precioTotal.innerHTML = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}

function guardarStorage(){
    localStorage.setItem("carrito", JSON.stringify(carrito))
}

function procesarPedido() {
    carrito.forEach((prod) => {
      const listaCompra = document.querySelector("#lista-compra tbody");
      const { id, nombre, precio, img, cantidad } = prod;
      if (listaCompra) {
        const row = document.createElement("tr");
        row.innerHTML += `
                <td>
                <img class="img-fluid img-carrito" src="${img}"/>
                </td>
                <td>${nombre}</td>
              <td>${precio}</td>
              <td>${cantidad}</td>
              <td>${precio * cantidad}</td>
              `;
        listaCompra.appendChild(row);
      }
    });
    totalProceso.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }


    function enviarCompra(e){
        e.preventDefault()
        console.log('enviando...')



        localStorage.clear()
    }
    

    finalizarCompra.addEventListener("click", () => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'your purchase has been successful'
          })
    })

//
//fetch con ruta relativa
const getDatos = async () => {
    const resp = await fetch("../js/data.json")
        .then((res) => res.json())
        .then((data) => {
            return data
        })
        return resp
}
const prodFoto = getDatos()
console.log(prodFoto)