
let productos = [
    {
        nombre: "Figma Marin",
        precio: 120000,
        imagen: "img/figma_marin_my dress up darling.jpg",
        stock:2
    },
    {
        nombre: "Manga DAN DA DAN",
        precio: 50000,
        imagen: "img/dandandan_manga.jpg",
        stock:5
    },
    {
        nombre: "Combo Ramen Japonés",
        precio: 55000,
        imagen: "img/set_comida.jpg",
        stock:10
    },
    {
        nombre: "Tomos One Piece",
        precio: 45000,
        imagen: "img/One_piece.jpg",
        stock:5
    },
    {
        nombre: "Figura Anime Coleccionable",
        precio: 200000,
        imagen: "img/figma_nezukoKamado.jpg",
        stock:1
    },
    {
        nombre: "Snacks Japoneses",
        precio: 16000,
        imagen: "img/snack_box.jpg",
        stock:15
    },
    {
        nombre: "Manga Jujutso Kaisen",
        precio: 60000,
        imagen: "img/jjk_manga.jpg",
        stock:5
    },
    {
        nombre: "Figma Jujutso Kaisen N°557 Satoru",
        precio: 150000,
        imagen: "img/Jujutsu Kaisen figma No.557 Satoru Gojo.jpg",
        stock:3
    }

];

let carrito = [];
const CLAVE_NIPON = "carritoNipon";
const LIMITE_PRODUCTOS = 5;
const ENVIO = 50000;


function guardarCarrito(){
    localStorage.setItem(
        CLAVE_NIPON,
        JSON.stringify(carrito)
    );

}

function cargarCarrito(){
    let guardado = localStorage.getItem(CLAVE_NIPON);

    if(guardado){
        carrito = JSON.parse(guardado);
    }
}



function agregarProducto(producto){
    let cantidadTotal = 0;

    for(let item of carrito){
        cantidadTotal += item.cantidad;
    }

    if(cantidadTotal >= LIMITE_PRODUCTOS){
        alert("Esta permitido la compra de solo 5 productos, Regimen ARCA /EX AFIP");
        return;
    }
    let encontrado = carrito.find(function(item){
        return item.nombre === producto.nombre;
    });

    if(encontrado){
        if(encontrado.cantidad < producto.stock){
            encontrado.cantidad++;
        }else{
            alert("No hay más stock disponible");
        }
    }else{
        let nuevoProducto = {
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            stock: producto.stock,
            cantidad: 1
        };
        carrito.push(nuevoProducto);
    }

    actualizarCarrito();
}



function calcularSubtotal(){

    let subtotal = 0;
    for(let producto of carrito){
        subtotal += producto.precio * producto.cantidad;
    }
    return subtotal;

}

function calcularTotal(){
    let subtotal = calcularSubtotal();
    if(carrito.length > 0){
        return subtotal + ENVIO;
    }
    return 0;

}




function mostrarProductos(){

    let lista = document.getElementById("lista-productos");
    lista.innerHTML = "";
    for(let i = 0; i < productos.length; i++){
        let producto = productos[i];
        let item = document.createElement("li");
        item.className = "producto-item";

        item.innerHTML =
        "<img src= '" + producto.imagen + "'>" +
        "<h3>" + producto.nombre + "</h3>" +
        "<p>$" + producto.precio + "</p>" +
        "<button class='btn-agregar' data-indice='" + i + "'>Agregar</button>";
        lista.appendChild(item);

    }

    let botones = document.querySelectorAll(".btn-agregar");
    for(let boton of botones){
        boton.addEventListener("click", function(){
            let indice = boton.getAttribute("data-indice");
            agregarProducto(productos[indice]);
        });
    }
}


function actualizarCarrito(){

    let listaCarrito = document.getElementById("items-carrito");
    let totalTexto = document.getElementById("total-carrito");
    let cantidadTexto = document.getElementById("cantidad-carrito");

    listaCarrito.innerHTML = "";

    if(carrito.length === 0){

        listaCarrito.innerHTML =
        "<li class='carrito-vacio'>Tu carrito está vacío.</li>";

    }
    else{
        for(let i = 0; i < carrito.length; i++){
            let producto = carrito[i];
            let item = document.createElement("li");
            item.className = "carrito-item";
            item.innerHTML =

            "<img src='" + producto.imagen + "'>" +

            "<span>" +
            producto.nombre + " x" +
            producto.cantidad +
            "</span>" +

            "<span>$" +
            (producto.precio * producto.cantidad) +
            "</span>" +
            "<button class='btn-quitar' data-indice='" +
            i +
            "'>✕</button>";
            listaCarrito.appendChild(item);
        }

        let botonesQuitar = document.querySelectorAll(".btn-quitar");
        for(let boton of botonesQuitar){
            boton.addEventListener("click", function(){
                let indice = boton.getAttribute("data-indice");
                quitarProducto(indice);
            });
        }
    }

    let subtotalTexto = document.getElementById("subtotal-carrito");
    subtotalTexto.textContent = "$" + calcularSubtotal();
    totalTexto.textContent = "$" + calcularTotal();
    cantidadTexto.textContent =
    carrito.length;

    guardarCarrito();
}




function quitarProducto(indice){
    let producto = carrito[indice];
    carrito.splice(indice,1);
    console.log(producto.nombre + " quitado del carrito");
    actualizarCarrito();
}



function vaciarCarrito(){
    carrito = [];
    console.log("Carrito vacío");
    actualizarCarrito();
}




function finalizarCompra(){
    if(carrito.length === 0){
        alert("Tu carrito está vacío");
        return;
    }


    alert(
        "Gracias por tu compra. Te contactaremos para finalizar el proceso de pago.. Total: $" 
        + calcularTotal()
    );

    carrito = [];
    actualizarCarrito();
}




document.addEventListener("DOMContentLoaded", function(){
    cargarCarrito();
    mostrarProductos();
    actualizarCarrito();

    let botonVaciar =
    document.getElementById("btn-vaciar");

    botonVaciar.addEventListener(
        "click",
        vaciarCarrito
    );

    let botonComprar =
    document.getElementById("btn-pagar");

    botonComprar.addEventListener(
        "click",
        finalizarCompra
    );

});