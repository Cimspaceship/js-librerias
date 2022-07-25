const Productos = []

class Producto {
    constructor (nombre,id,precio,imagen) {
        this.nombre = nombre
        this.id = id
        this.precio = precio
        this.imagen = imagen
    }
}

Productos.push(new Producto("RX 6600XT", 148, 85000, "6600xt.png"))
Productos.push(new Producto("GTX 1050TI", 149, 50000, "1050ti.jpg" ))
Productos.push(new Producto("RTX 2060", 150, 99000, "2060.jpg"))
Productos.push(new Producto("i3 10100", 151, 25000, "i3.webp"))
Productos.push(new Producto("Ryzen 5 3600", 152, 35000, "3600.jpg"))
Productos.push(new Producto("Ryzen 7 5800X", 153, 65000, "5800x.jpg"))

class Carrito {
    constructor(id) {
    this.id = id
    this.productos = []
 }
    calcularTotal() {
        let total = 0
        for ( let i = 0; i < this.productos.length; i++) {
            total = total + this.productos[i].precio
        }
        return total
    }

}

function limpiarCarrito() {
    let divCarrito = document.querySelector("#carrito")
    divCarrito.innerHTML=""
}

function actualizarCarrito() {
    let divCarrito = document.querySelector("#carrito")
    carrito.productos.forEach(producto => {
        divCarrito.innerHTML += `<h3>${producto.nombre} $${producto.precio} \n</h3>`
    })
    divCarrito.innerHTML += `<h1>El total de tu compra es $${carrito.calcularTotal()}</h1>`
}

// manda el carrito al local storage
function renovarStorage() {
    localStorage.removeItem("carrito")
    localStorage.setItem("carrito",JSON.stringify(carrito))
}

//parse y carga carrito del local storage 
window.addEventListener("DOMContentLoaded", (e) => {
    let storage = JSON.parse(localStorage.getItem("carrito"))
    console.log(storage)

})

let productosJavascript = document.getElementById("productosJavascript")

for (const producto of Productos) {
    let columna = document.createElement("div")
    columna.className = "col-md-4 mt-3"
    columna.innerHTML = `
        <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="./assets/${producto.imagen}" alt="Card image cap">
        
            <div class="card-body">
                <h5 class="card-title">${producto.nombre}</h5>
                <p class="card-text">$${producto.precio}.</p>
                <a href="#" class="btn btn-primary botonDeCompra" id="${producto.id}">agregar al carrito</a>
            </div>
        </div>
        `
        productosJavascript.appendChild(columna)
}


let carrito = new Carrito(1)
let botones = document.querySelectorAll(".botonDeCompra")
let arrayDeBotones = Array.from(botones)
arrayDeBotones.forEach(boton => {
    boton.addEventListener("click", (e) =>{
        let ProductoSeleccionado = Productos.find(producto => producto.id == e.target.id)
        carrito.productos.push(ProductoSeleccionado)
        console.log(carrito)
        console.log(carrito.calcularTotal())
        limpiarCarrito()
        actualizarCarrito()
        renovarStorage()
        Toastify({
            text: `se ha agregado al carrito ${ProductoSeleccionado.nombre}`,
            duration: 2000
        }).showToast();
    })
})



    
    
    

        
    




