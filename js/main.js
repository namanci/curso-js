//Declaración de Variables globales
//Items
let marca
let mother
let micro
let memoria
//Datos
let precioItem
let valorIva
let impuestoItem = 0
let impuestos = 0
let subtotal = 0

//Función para calcular los impuestos y el subtotal
const calcularSubtotal = (precioItem, valorIva) => {
    impuestoItem = precioItem * valorIva
    impuestos = impuestos + impuestoItem
    subtotal = subtotal + precioItem + impuestoItem
}

//Se pide un nombre, si no se indica se lo nombra como "Invitado"
let nombre = prompt("Por favor ingrese su nombre y apellido.")

if(nombre !== ""){
    alert("Bienvenido " + nombre + "\n\nA continuación seleccionará uno a uno los componentes para su PC.\n\nSe calculará el precio total a pagar y se detallará el valor total de los impuestos.")
}else {
    alert("No ingresaste tu nombre, serás identificado como Invitado.\n\nA continuación seleccionará uno a uno los componentes para su PC.\n\nSe calculará el precio total a pagar y se detallará el valor total de los impuestos.")
    nombre = "Invitado"
}

console.log(nombre)

//Se pide una Marca y según la misma se ofrecen los Motherboards y Microprocesadores correspondientes
while((marca !== 1) && (marca !== 2)){ //Se verifica que el usuario ingrese un valor correcto, si no lo hace se vuelve a pedir
    marca = parseInt(prompt("Por favor ingrese el número de la Marca que desea:\n\n1 - INTEL\n2 - AMD\n\n"))
}

if(marca == 1){
    marca = "INTEL"
    valorIva = 0.15
    while((mother !== 1) && (mother !== 2)){
        mother = parseInt(prompt("Ingrese el número del Motherboard que desea:\n\n1 - ASUS B460m $45000\n2 - MSI H510m $56000"))
    }
    switch(mother){
        case 1:
            precioItem = 45000;
            mother = "ASUS B460m";
            break
        case 2:
            precioItem = 56000;
            mother = "MSI H510m";
            break
    }
    calcularSubtotal(precioItem, valorIva)

    while((micro !== 1) && (micro !== 2) && (micro !== 3)){
        micro = parseInt(prompt("Ingrese el número del Microprocesador que desea:\n\n1 - i3 10100f $30000\n2 - i5 10400f $45000\n3 - i7 10700k $70000\n\nImpuestos: " + impuestos + "\nSubtotal: " + subtotal))
    }
    switch(micro){
        case 1:
            precioItem = 30000;
            micro = "i3 10ma Gen. 10100f";
            break
        case 2:
            precioItem = 45000;
            micro = "i5 10ma Gen. 10400f";
            break
        case 3:
            precioItem = 70000;
            micro = "i7 10ma Gen. 10700k";
            break
    }
    calcularSubtotal(precioItem, valorIva)
}else {
    marca = "AMD"
    valorIva = 0.15
    while((mother !== 1) && (mother !== 2)){
        mother = parseInt(prompt("Ingrese el número del Motherboard que desea:\n\n1 - AsRock A320m $42500\n2 - Gigabyte B450m $52100"))
    }
    switch(mother){
        case 1:
            precioItem = 42500;
            mother = "AsRock A320m";
            break
        case 2:
            precioItem = 52100;
            mother = "Gigabyte B450m";
            break
    }
    calcularSubtotal(precioItem, valorIva)

    while((micro !== 1) && (micro !== 2) && (micro !== 3)){
        micro = parseInt(prompt("Ingrese el número del Microprocesador que desea:\n\n1 - Ryzen 3 3200g $28000\n2 - Ryzen 5 3600 $42500\n3 - Ryzen 7 3800g $68250\n\nImpuestos: " + impuestos + "\nSubtotal: " + subtotal))
    }
    switch(micro){
        case 1:
            precioItem = 28000;
            micro = "Ryzen 3 3200g AM4";
            break
        case 2:
            precioItem = 42500;
            micro = "Ryzen 5 3600 AM4";
            break
        case 3:
            precioItem = 68250;
            micro = "Ryzen 7 3800g AM4";
            break
    }
    calcularSubtotal(precioItem, valorIva)
}
//Se dan a elegir el resto de componentes ya fuera del "if" debido a que son compatibles con ambas Marcas
while((memoria !== 1) && (memoria !== 2) && (memoria !== 3)){
    memoria = parseInt(prompt("Seleccione el número de la Memoria RAM que desea:\n\n1 - 8GB Combo 2x4 Kingston $15000\n2 - 16GB Combo 2x8 Corsair $28000\n3 - 32GB Combo 2x16 HyperX $54000\n\nImpuestos: " + impuestos + "\nSubtotal: " + subtotal))
}
valorIva = 0.21
switch(memoria){
    case 1:
        precioItem = 15000;
        memoria = "8GB Kingston";
        break
    case 2:
        precioItem = 28000;
        memoria = "16GB Corsair";
        break
    case 3:
        precioItem = 54000;
        memoria = "32GB HyperX";
        break
}
calcularSubtotal(precioItem, valorIva)

//"alert" con resúmen de la compra, valor de impuestos y total a pagar
alert("Aquí tienes el resúmen de tu compra " + nombre + ":\n\nMarca: " + marca + "\nMotherboard: " + mother + "\nMicroprocesador: " + micro + "\nMemoria RAM: " + memoria + "\n\nImpuestos: $" + impuestos + "\nTotal a pagar: $" + subtotal)