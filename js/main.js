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
//Función simple para calcular impuestos.
function calcularImpuesto(precio, impuesto) {
    return precio * impuesto
}
//Obtenemos el tipo de componente para categorizarlos en el resumen.
function obtenerTipoComponente(componente) {
    if (motherboardsIntel.includes(componente) || motherboardsAMD.includes(componente)) {
        return "Motherboard"
    } else if (procesadoresIntel.includes(componente) || procesadoresAMD.includes(componente)) {
        return "Procesador"
    } else if (memoriasRAM.includes(componente)) {
        return "Memoria RAM"
    } else {
        return "Componente"
    }
}
//Función para mostrar en el resumen los detalles de cada componente seleccionado.
function mostrarResumen(componente, impuesto, subtotal) {
    const tipoComponente = obtenerTipoComponente(componente)
    return `${tipoComponente}: ${componente.Marca} ${componente.Modelo}\nP/lista: $${componente.Precio.toFixed(2)} - Imp.: $${impuesto.toFixed(2)} - P/final: $${subtotal.toFixed(2)}\n`
}

function armarPC() {
    const nombreUsuario = prompt("Por favor ingrese su nombre y apellido.")
    alert(`¡Bienvenid@, ${nombreUsuario}!\nA continuación seleccionará uno a uno los componentes para su PC.\n\nSe calculará el precio total a pagar y se detallará el valor total de los impuestos.`)

    const marcaElegida = parseInt(prompt("Por favor ingrese el número de la Marca que desea:\n1. Intel\n2. AMD"))

    let motherboardsDisponibles
    let procesadoresDisponibles

    if (marcaElegida === 1) {
        motherboardsDisponibles = motherboardsIntel
        procesadoresDisponibles = procesadoresIntel
    } else if (marcaElegida === 2) {
        motherboardsDisponibles = motherboardsAMD
        procesadoresDisponibles = procesadoresAMD
    } else {
        alert("Opción no válida. Recargue la página y vuelva a intentarlo.")
        return
    }
    //Funciones de Orden Superior. Utilizamos "map" para transformar los objetos y crear como string las opciones de componentes a elegir. Se utiliza "join" para agregar un salto de línea "\n" y mostrar las opciones de forma legible.
    let opcionMotherboard = parseInt(prompt("Ingrese el número del Motherboard que desea:\n" + motherboardsDisponibles.map((m, i) => `${i + 1}. ${m.Modelo}`).join('\n')))
    if (isNaN(opcionMotherboard) || opcionMotherboard < 1 || opcionMotherboard > motherboardsDisponibles.length) {
        alert("Opción de Motherboard no válida. Recargue la página y vuelva a intentarlo.")
        return
    }

    let opcionProcesador = parseInt(prompt("Ingrese el número del Procesador que desea:\n" + procesadoresDisponibles.map((p, i) => `${i + 1}. ${p.Modelo}`).join('\n')))
    if (isNaN(opcionProcesador) || opcionProcesador < 1 || opcionProcesador > procesadoresDisponibles.length) {
        alert("Opción de Procesador no válida. Recargue la página y vuelva a intentarlo.")
        return
    }

    const opcionMemoriaRAM = parseInt(prompt("Seleccione el número de la Memoria RAM que desea:\n" + memoriasRAM.map((m, i) => `${i + 1}. ${m.Modelo}`).join('\n')))
    if (isNaN(opcionMemoriaRAM) || opcionMemoriaRAM < 1 || opcionMemoriaRAM > memoriasRAM.length) {
        alert("Opción de Memoria RAM no válida. Recargue la página y vuelva a intentarlo.")
        return
    }

    const motherboardElegida = motherboardsDisponibles[opcionMotherboard - 1]
    const procesadorElegido = procesadoresDisponibles[opcionProcesador - 1]
    const memoriaRAMElegida = memoriasRAM[opcionMemoriaRAM - 1]
    //Calculamos los impuestos de los componentes.
    const impuestoMotherboard = calcularImpuesto(motherboardElegida.Precio, 0.105)
    const impuestoProcesador = calcularImpuesto(procesadorElegido.Precio, 0.105)
    const impuestoMemoriaRAM = calcularImpuesto(memoriaRAMElegida.Precio, 0.21)
    //Calculamos el Total a pagar.
    const subtotal = motherboardElegida.Precio + procesadorElegido.Precio + memoriaRAMElegida.Precio
    const totalImpuestos = impuestoMotherboard + impuestoProcesador + impuestoMemoriaRAM
    const totalAPagar = subtotal + totalImpuestos
    //Obtenemos la fecha de emisión del resumen utilizando "Date".
    const fechaEmision = new Date().toLocaleDateString()
    //Mostramos el resumen.
    const resumen = "Aquí tienes el resúmen de tu compra:\n\n" + mostrarResumen(motherboardElegida, impuestoMotherboard, motherboardElegida.Precio + impuestoMotherboard) + "\n" + mostrarResumen(procesadorElegido, impuestoProcesador, procesadorElegido.Precio + impuestoProcesador) + "\n" + mostrarResumen(memoriaRAMElegida, impuestoMemoriaRAM, memoriaRAMElegida.Precio + impuestoMemoriaRAM) + `\n\nImpuestos totales: $${totalImpuestos.toFixed(2)}\nTotal a pagar: $${totalAPagar.toFixed(2)}` + `\n\nFecha de emisión: ${fechaEmision}`
    alert(resumen)
}
//Ejecutamos el armador de PC llamando a la función "armarPC".
armarPC()