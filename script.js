
// SISTEMA DE REGISTRO BOOKSPACE

// Obtener elementos del formulario

const formulario = document.getElementById("formulario");
const enviar = document.getElementById("enviar");
const limpiar = document.getElementById("limpiar");
const terminos = document.getElementById("terminos");
const mensaje = document.getElementById("mensaje");

// Elementos de la tarjeta

const tarjeta = document.getElementById("tarjeta");
const tarjetaNombre = document.getElementById("tarjetaNombre");
const tarjetaClave = document.getElementById("tarjetaClave");
const tarjetaUsuario = document.getElementById("tarjetaUsuario");
const tarjetaGenero = document.getElementById("tarjetaGenero");
const tarjetaTurno = document.getElementById("tarjetaTurno");
const tarjetaFecha = document.getElementById("tarjetaFecha");
const codigoQR = document.getElementById("codigoQR");

// 1. HABILITAR O DESHABILITAR EL BOTON

terminos.addEventListener("change", function() {
    enviar.disabled = !terminos.checked;
});

// 2. CONFIRMAR ANTES DE BORRAR

limpiar.addEventListener("click", function(event) {

    let confirmar = confirm(
        "¿Estás seguro de que deseas borrar todos los datos?"
    );

    if (!confirmar) {
        event.preventDefault();
    } else {
        mensaje.textContent = "";
        tarjeta.hidden = true;
    }

});

// 3. GENERAR CLAVE UNICA

function generarClave() {

    let numero = Math.random().toString(36)
        .substring(2, 8).toUpperCase();

    let anio = new Date().getFullYear();

    return "BS-" + anio + "-" + numero;
}

// 4. REGISTRAR LECTOR

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Obtener información

    let nombre = document.getElementById("nombre").value;
    let usuario = document.getElementById("usuario").value;
    let genero = document.getElementById("genero").value;

    let turno = document.querySelector(
        'input[name="turno"]:checked'
    ).value;

    // Crear clave única

    let clave = generarClave();

    // Obtener fecha

    let fecha = new Date().toLocaleDateString("es-MX");

    // Mostrar mensaje

    mensaje.textContent =
        "¡Registro exitoso! Bienvenido/a " + nombre +
        ". Tu clave de lector es " + clave + ".";

    // Llenar tarjeta

    tarjetaNombre.textContent = nombre;
    tarjetaClave.textContent = clave;
    tarjetaUsuario.textContent = usuario;
    tarjetaGenero.textContent = genero;
    tarjetaTurno.textContent = turno;
    tarjetaFecha.textContent = fecha;

    // Mostrar tarjeta

    tarjeta.hidden = false;

    // Generar codigo QR

   
// GENERAR CODIGO QR CON RECOMENDACIONES

codigoQR.innerHTML = "";

let direccion = new URL(
    "recomendaciones.html",
    window.location.href
);

// Enviar la clave y el genero favorito

direccion.searchParams.set("clave", clave);
direccion.searchParams.set("genero", genero);

if (typeof QRCode !== "undefined") {

    new QRCode(codigoQR, {
        text: direccion.href,
        width: 150,
        height: 150
    });

} else {

    codigoQR.textContent =
        "No se pudo cargar el generador QR.";

}


    // Limpiar formulario

    formulario.reset();

    // Deshabilitar boton

    enviar.disabled = true;

});
