const app = document.getElementById("aplicacion")
const mensaje = document.createElement("div")
mensaje.className = "alert alert-primary"
let nombreUsuario
const mostrarNombre = document.createElement("div")
mostrarNombre.className = "left"
const contenedorProductos = document.createElement("div")
contenedorProductos.id = "contenedor-productos"
let paso
let marcaElegida

//Función constructora para crear los arrays que contendrán los componentes como objetos.
function Componente(marca, modelo, precio) {
    this.Marca = marca
    this.Modelo = modelo
    this.Precio = precio
}
//Creamos arrays vacíos de cada tipo de componente y "pusheamos" los objetos correspondientes para listar nuestros componentes disponibles (Stock).
const motherboardsIntel = []
motherboardsIntel.push(new Componente("ASUS", "B460m", 45000.40))
motherboardsIntel.push(new Componente("MSI", "H510m", 56000.50))

const motherboardsAMD = []
motherboardsAMD.push(new Componente("AsRock", "A320m", 42500.00))
motherboardsAMD.push(new Componente("Gigabyte", "B450m", 52100.60))

const procesadoresIntel = []
procesadoresIntel.push(new Componente("Intel", "i3 10100f", 30000.00))
procesadoresIntel.push(new Componente("Intel", "i5 10400f", 44525.25))
procesadoresIntel.push(new Componente("Intel", "i7 10700k", 69985.50))

const procesadoresAMD = []
procesadoresAMD.push(new Componente("AMD", "Ryzen 3 3200g", 27500.00))
procesadoresAMD.push(new Componente("AMD", "Ryzen 5 3600", 42750.40))
procesadoresAMD.push(new Componente("AMD", "Ryzen 7 3800g", 68250.00))

const memoriasRAM = []
memoriasRAM.push(new Componente("Kingston", "8gb (2x4)", 14275.45))
memoriasRAM.push(new Componente("Corsair", "16gb (2x8)", 28150.25))
memoriasRAM.push(new Componente("HyperX", "32gb (2x16)", 53650.50))


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
            mostrarNombre.innerText = `Usuario: ${nombreUsuario}`
            app.appendChild(mostrarNombre)
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
        console.log("Intel seleccionado")
        app.removeChild(mensaje)
        app.removeChild(imagen)
        marcaElegida = "intel"
        localStorage.setItem("marcaElegida", JSON.stringify(marcaElegida))
        localStorage.setItem("paso", JSON.stringify(paso + 1))
        paso = JSON.parse(localStorage.getItem("paso"))
        console.log(paso)
        armarPC()
    })

    document.getElementById("amd").addEventListener("click", function() {
        console.log("AMD seleccionado")
        app.removeChild(mensaje)
        app.removeChild(imagen)
        marcaElegida = "amd"
        localStorage.setItem("marcaElegida", JSON.stringify(marcaElegida))
        localStorage.setItem("paso", JSON.stringify(paso + 1))
        paso = JSON.parse(localStorage.getItem("paso"))
        console.log(paso)
        armarPC()
    })
}

function agregarAlCarrito(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function crearTarjeta(producto) {
    const tarjeta = document.createElement("div")
    tarjeta.classList.add("card", "m-3")

    const contenido = `
        <div class="card-body">
        <h5 class="card-title">${producto.Marca} ${producto.Modelo}</h5>
        <p class="card-text">Precio: $${producto.Precio.toFixed(2)}</p>
        </div>`

    tarjeta.innerHTML = contenido

    tarjeta.onclick = () => {
        console.log(`Seleccionaste el producto: ${producto.Marca} ${producto.Modelo}`)
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

function mostrarProductos(productos) {
    app.appendChild(mensaje)
    app.appendChild(contenedorProductos)   
    productos.forEach(producto => {
        const tarjeta = crearTarjeta(producto)
        contenedorProductos.appendChild(tarjeta)
    })
}

const calcularImpuesto = (precio) => precio * 0.21

function mostrarResumen() {
    carrito = JSON.parse(localStorage.getItem("carrito"))
    let subTotal = 0
    let impuestoTotal = 0
    carrito.forEach(producto => {
        const tarjetaResumen = document.createElement("div")
        tarjetaResumen.classList.add("card", "m-3")
        const impuestoProducto = calcularImpuesto(producto.Precio)

        const contenido = `
            <div style="cursor: default;" class="card-body">
                <h5 class="card-title">${producto.Marca} ${producto.Modelo}</h5>
                <p class="card-text">Precio: $${producto.Precio.toFixed(2)}</p>
                <p class="card-text">Impuestos: $${impuestoProducto.toFixed(2)}</p>
            </div>`
        tarjetaResumen.innerHTML = contenido
        
        subTotal += producto.Precio
        impuestoTotal += impuestoProducto
        app.appendChild(tarjetaResumen)
    })
    let total = subTotal + impuestoTotal
    const mostrarSub = document.createElement("div")
    mostrarSub.innerText = `Subtotal: $${subTotal.toFixed(2)}`
    mostrarSub.className = "left"
    const mostrarIT = document.createElement("div")
    mostrarIT.innerText = `Impuestos: $${impuestoTotal.toFixed(2)}`
    mostrarIT.className = "left"
    const mostrarTotal = document.createElement("div")
    mostrarTotal.innerText = `Total a pagar: $${total.toFixed(2)}`
    mostrarTotal.className = "left"
    const terminarBoton = document.createElement("button")
    terminarBoton.innerText = "Terminar"
    terminarBoton.className = "btn btn-primary"
    terminarBoton.addEventListener("click", function () {
        localStorage.clear()
        const contenedor = document.getElementById("aplicacion")
        while (contenedor.firstChild) {
            contenedor.removeChild(contenedor.firstChild)
        }
        paso = 0
        armarPC()
    })
    app.appendChild(mostrarSub)
    app.appendChild(mostrarIT)
    app.appendChild(mostrarTotal)
    app.appendChild(terminarBoton)
}

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

paso = JSON.parse(localStorage.getItem("paso")) || 0
if(paso > 0) {
    nombreUsuario = JSON.parse(localStorage.getItem("nombreUsuario"))
    mostrarNombre.innerText = `Usuario: ${nombreUsuario}`
    app.appendChild(mostrarNombre)
}
armarPC()