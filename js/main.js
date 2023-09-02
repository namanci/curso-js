const app = document.getElementById("aplicacion")
const topLeft = document.getElementById("top-left")
const topRight = document.getElementById("top-right")
const mensaje = document.createElement("div")
mensaje.className = "alert alert-primary"
const mostrarDolar = document.createElement("div")
mostrarDolar.className = "m-3"
let nombreUsuario
const mostrarNombre = document.createElement("div")
mostrarNombre.className = "m-3"
const salirBoton = document.createElement("button")
salirBoton.innerText = "Salir"
salirBoton.className = "btn btn-primary mt-2 mb-2"
const contenedorProductos = document.createElement("div")
contenedorProductos.id = "contenedor-productos"
let valorDolar
let precioPesos
let paso
let marcaElegida

salirBoton.addEventListener("click", function () {
    Swal.fire({
        title: '¿Está seguro que desea salir?',
        text: 'Todos sus datos serán borrados.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#0d6efd',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Salir',
        cancelButtonText: 'Cancelar',
    }).then((result) => {
        if (result.isConfirmed) {
            terminarApp()
        }
    })
})

//Función constructora para crear los arrays que contendrán los componentes como objetos.
function Componente(marca, modelo, precio) {
    this.Marca = marca
    this.Modelo = modelo
    this.Precio = precio
}
//Creamos arrays vacíos de cada tipo de componente y "pusheamos" los objetos correspondientes para listar nuestros componentes disponibles (Stock).
const motherboardsIntel = []
motherboardsIntel.push(new Componente("ASUS", "B460m", 126.10))
motherboardsIntel.push(new Componente("MSI", "H510m", 156.80))

const motherboardsAMD = []
motherboardsAMD.push(new Componente("AsRock", "A320m", 119.00))
motherboardsAMD.push(new Componente("Gigabyte", "B450m", 145.90))

const procesadoresIntel = []
procesadoresIntel.push(new Componente("Intel", "i3 10100f", 84.00))
procesadoresIntel.push(new Componente("Intel", "i5 10400f", 124.70))
procesadoresIntel.push(new Componente("Intel", "i7 10700k", 196.10))

const procesadoresAMD = []
procesadoresAMD.push(new Componente("AMD", "Ryzen 3 3200g", 77.00))
procesadoresAMD.push(new Componente("AMD", "Ryzen 5 3600", 119.70))
procesadoresAMD.push(new Componente("AMD", "Ryzen 7 3800g", 191.20))

const memoriasRAM = []
memoriasRAM.push(new Componente("Kingston", "8gb (2x4)", 39.90))
memoriasRAM.push(new Componente("Corsair", "16gb (2x8)", 78.80))
memoriasRAM.push(new Componente("HyperX", "32gb (2x16)", 150.30))

//PASO 0: Mostramos formulario para ingresar el nombre del usuario.
function nombrarUsuario() {
    mensaje.innerText = "Por favor, ingresa tu nombre:"

    const nombreInput = document.createElement("input")
    nombreInput.type = "text"
    nombreInput.className = "form-control mb-2"

    const comenzarBoton = document.createElement("button")
    comenzarBoton.innerText = "Comenzar"
    comenzarBoton.className = "btn btn-primary"

    comenzarBoton.addEventListener("click", function () {
        nombreUsuario = nombreInput.value
        if (nombreUsuario.trim() !== "") {
            app.removeChild(mensaje)
            app.removeChild(nombreInput)
            app.removeChild(comenzarBoton)
            mostrarDolar.innerText = `Dólar: $${valorDolar}`
            mostrarNombre.innerText = `Usuario: ${nombreUsuario}`
            topLeft.appendChild(mostrarDolar)
            topRight.appendChild(mostrarNombre)
            topRight.appendChild(salirBoton)
            localStorage.setItem("nombreUsuario", JSON.stringify(nombreUsuario))
            localStorage.setItem("paso", JSON.stringify(paso + 1))
            paso = JSON.parse(localStorage.getItem("paso"))
            armarPC()
        }
    })
    app.appendChild(mensaje)
    app.appendChild(nombreInput)
    app.appendChild(comenzarBoton)
}
//PASO 1: Damos a elegir la marca de la PC (intel o AMD).
function seleccionarMarca() {
    const imagen = document.createElement("div")
    imagen.className = "row"
    imagen.innerHTML = `
        <div class="col-md-6">
            <img src="./image/intel_logo.jpg" alt="Intel" class="img-thumbnail" id="intel">
        </div>
        <div class="col-md-6">
            <img src="./image/amd_logo.jpg" alt="AMD" class="img-thumbnail" id="amd">
        </div>`
    mensaje.innerText = "Por favor, elige la Marca que deseas:"
    app.appendChild(mensaje)
    app.appendChild(imagen)
    document.getElementById("intel").addEventListener("click", function() {
        app.removeChild(mensaje)
        app.removeChild(imagen)
        marcaElegida = "intel"
        localStorage.setItem("marcaElegida", JSON.stringify(marcaElegida))
        localStorage.setItem("paso", JSON.stringify(paso + 1))
        paso = JSON.parse(localStorage.getItem("paso"))
        armarPC()
    })
    document.getElementById("amd").addEventListener("click", function() {
        app.removeChild(mensaje)
        app.removeChild(imagen)
        marcaElegida = "amd"
        localStorage.setItem("marcaElegida", JSON.stringify(marcaElegida))
        localStorage.setItem("paso", JSON.stringify(paso + 1))
        paso = JSON.parse(localStorage.getItem("paso"))
        armarPC()
    })
}
//Agregamos al carrito los productos seleccionados.
function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}
//Creamos las tarjetas de cada producto.
function crearTarjeta(producto) {
    const tarjeta = document.createElement("div")
    tarjeta.classList.add("card", "m-3")
    const precioPesos = convertirDolar(producto.Precio)
    const contenido = `
        <div class="card-body">
        <h5 class="card-title">${producto.Marca} ${producto.Modelo}</h5>
        <p class="card-text">Precio: u$${producto.Precio.toFixed(2)}<br>Precio (ARS): $${precioPesos.toFixed(2)}</p>
        </div>`
    tarjeta.innerHTML = contenido
    tarjeta.onclick = () => {
        agregarAlCarrito(producto)
        const contenedor = document.getElementById("contenedor-productos")
        while (contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild)
        }
        localStorage.setItem("paso", JSON.stringify(paso + 1))
        paso = JSON.parse(localStorage.getItem("paso"))
        armarPC()
    }
    return tarjeta
}
//Mostramos las tarjetas de productos.
function mostrarProductos(productos) {
    app.appendChild(mensaje)
    app.appendChild(contenedorProductos)   
    productos.forEach(producto => {
        const tarjeta = crearTarjeta(producto)
        contenedorProductos.appendChild(tarjeta)
    })
}
//Calculamos el impuesto (IVA del 21%).
const calcularImpuesto = (precio) => precio * 0.21
//Convertimos el precio en dólares a pesos argentinos.
const convertirDolar = (precio) => precio * valorDolar
//Función para terminar la app, limpiamos Storage y DOM.
function terminarApp() {
    localStorage.clear()
    const contenedor = document.getElementById("aplicacion")
    while (contenedor.firstChild) {
        contenedor.removeChild(contenedor.firstChild)
    }
    const topLeft = document.getElementById("top-left")
    while (topLeft.firstChild) {
        topLeft.removeChild(topLeft.firstChild)
    }
    const topRight = document.getElementById("top-right")
    while (topRight.firstChild) {
        topRight.removeChild(topRight.firstChild)
    }
    paso = 0
    armarPC()
}
//Mostramos el resumen de los productos seleccionados, sus costos e impuestos y el total a pagar.
function mostrarResumen() {
    carrito = JSON.parse(localStorage.getItem("carrito"))
    let subTotal = 0
    let subTotalpesos = 0
    let impuestoTotal = 0
    carrito.forEach(producto => {
        const tarjetaResumen = document.createElement("div")
        tarjetaResumen.classList.add("card", "m-3")
        const precioPesos = convertirDolar(producto.Precio)
        const impuestoProducto = calcularImpuesto(precioPesos)
        const contenido = `
            <div style="cursor: default;" class="card-body">
                <h5 class="card-title">${producto.Marca} ${producto.Modelo}</h5>
                <p class="card-text">Precio: u$${producto.Precio.toFixed(2)}<br>Precio (ARS): $${precioPesos.toFixed(2)}</p>
            </div>`
        tarjetaResumen.innerHTML = contenido
        subTotal += producto.Precio
        subTotalpesos += precioPesos
        impuestoTotal += impuestoProducto
        app.appendChild(tarjetaResumen)
    })
    let total = subTotalpesos + impuestoTotal
    const mostrarSub = document.createElement("div")
    mostrarSub.innerText = `Subtotal: u$${subTotal.toFixed(2)}`
    mostrarSub.className = "left"
    const mostrarSubpesos = document.createElement("div")
    mostrarSubpesos.innerText = `Subtotal (ARS): $${subTotalpesos.toFixed(2)}`
    mostrarSubpesos.className = "left"
    const mostrarIT = document.createElement("div")
    mostrarIT.innerText = `IVA: $${impuestoTotal.toFixed(2)}`
    mostrarIT.className = "left"
    const mostrarTotal = document.createElement("div")
    mostrarTotal.innerText = `Total a pagar: $${total.toFixed(2)}`
    mostrarTotal.className = "left"
    const pagarBoton = document.createElement("button")
    pagarBoton.innerText = "Pagar"
    pagarBoton.className = "btn btn-success m-3"
    //Mostamos el pop-up con una simulación del pago realizado con éxito y finalizamos.
    pagarBoton.addEventListener("click", function () {
        Swal.fire({
            title: '¡Pago Exitoso!',
            html: `Su pago de $${total.toFixed(2)} fue realizado con éxito.<br><b>¡Gracias por elegirnos!</b>`,
            icon: 'success',
            confirmButtonColor: '#0d6efd',
            confirmButtonText: 'Terminar',
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                terminarApp()
            }
        })
    })
    app.appendChild(mostrarSub)
    app.appendChild(mostrarSubpesos)
    app.appendChild(mostrarIT)
    app.appendChild(mostrarTotal)
    app.appendChild(pagarBoton)
}
//Función de armado de la PC por pasos.
function armarPC() {
    switch(paso){
        case 0:
            nombrarUsuario()
        break
        case 1:
            seleccionarMarca()
        break
        case 2:
            mensaje.innerText = "Elige el Motherboard que deseas:"
            marcaElegida = JSON.parse(localStorage.getItem("marcaElegida"))
            if(marcaElegida === "intel") {
                mostrarProductos(motherboardsIntel)
            } else {
                mostrarProductos(motherboardsAMD)
            }
            
        break
        case 3:
            mensaje.innerText = "Elige el Microprocesador que deseas:"
            marcaElegida = JSON.parse(localStorage.getItem("marcaElegida"))
            if(marcaElegida === "intel") {
                mostrarProductos(procesadoresIntel)
            } else {
                mostrarProductos(procesadoresAMD)
            }
        break
        case 4:
            mensaje.innerText = "Elige la Memoria RAM que deseas:"
            mostrarProductos(memoriasRAM)
        break
        case 5:
            mensaje.innerText = "Este es tu resumen:"
            mostrarResumen()
        break
    }
}
//Cargamos el dato del dólar desde API.
fetch("https://api.bluelytics.com.ar/v2/latest")
    .then((respuesta) => respuesta.json())
    .then((data) => {
        dolarValue = data.blue;
        valorDolar = dolarValue.value_avg
    })
.catch((error) => console.log(error))
//Esperamos 500 milisegundos e iniciamos la app.
setTimeout (() => {
    paso = JSON.parse(localStorage.getItem("paso")) || 0
    if(paso > 0) {
        nombreUsuario = JSON.parse(localStorage.getItem("nombreUsuario"))
        mostrarDolar.innerText = `Dólar: $${valorDolar}`
        mostrarNombre.innerText = `Usuario: ${nombreUsuario}`
        topLeft.appendChild(mostrarDolar)
        topRight.appendChild(mostrarNombre)
        topRight.appendChild(salirBoton)
    }
    armarPC()
}, 500)