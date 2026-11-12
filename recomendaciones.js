// OBTENER INFORMACION DEL CODIGO QR

const parametros = new URLSearchParams(window.location.search);

const clave = parametros.get("clave");
const genero = parametros.get("genero");

// MOSTRAR CLAVE DEL LECTOR

document.getElementById("claveLector").textContent =
    "Tu clave de lector es: " + (clave || "No proporcionada");

// LIBROS SEGUN EL GENERO

const libros = {

    "Novela": [
        ["Orgullo y prejuicio", "Jane Austen", "9780141439518"],
        ["Cien años de soledad", "Gabriel García Márquez", "9780307474728"],
        ["El gran Gatsby", "F. Scott Fitzgerald", "9780743273565"]
    ],

    "Ciencia ficción": [
        ["Dune", "Frank Herbert", "9780441172719"],
        ["Fahrenheit 451", "Ray Bradbury", "9781451673319"],
        ["La máquina del tiempo", "H. G. Wells", "9780451530707"]
    ],

    "Fantasía": [
        ["El Hobbit", "J. R. R. Tolkien", "9780547928227"],
        ["Harry Potter y la piedra filosofal", "J. K. Rowling", "9780590353427"],
        ["El león, la bruja y el armario", "C. S. Lewis", "9780064471046"]
    ],

    "Misterio": [
        ["Asesinato en el Orient Express", "Agatha Christie", "9780062693662"],
        ["El sabueso de los Baskerville", "Arthur Conan Doyle", "9780451528018"],
        ["La verdad sobre el caso Harry Quebert", "Joël Dicker", ""]
    ],

    "Historia": [
        ["Sapiens", "Yuval Noah Harari", "9780062316097"],
        ["Los pilares de la Tierra", "Ken Follett", "9780451166890"],
        ["El diario de Ana Frank", "Ana Frank", "9780553296983"]
    ],

    "Poesía": [
        ["Veinte poemas de amor y una canción desesperada", "Pablo Neruda", ""],
        ["Rimas", "Gustavo Adolfo Bécquer", ""],
        ["Poeta en Nueva York", "Federico García Lorca", ""]
    ]

};

// OBTENER LOS LIBROS DEL GENERO SELECCIONADO

const seleccion = libros[genero];

const lista = document.getElementById("listaLibros");
const descripcion = document.getElementById("descripcion");

if (seleccion) {

    descripcion.textContent =
        "Seleccionamos estos libros porque tu género favorito es: " + genero;

    seleccion.forEach(function(libro, indice) {

        let tarjeta = document.createElement("div");
        tarjeta.className = "libro";

        // CREAR PORTADA

        let portada = document.createElement("img");

        portada.src = libro[2]
            ? "https://covers.openlibrary.org/b/isbn/" + libro[2] + "-M.jpg"
            : "";

        portada.alt = "Portada de " + libro[0];

        portada.onerror = function() {
            portada.style.display = "none";
        };

        // CREAR TITULO

        let titulo = document.createElement("h3");
        titulo.textContent = (indice + 1) + ". " + libro[0];

        // CREAR AUTOR

        let autor = document.createElement("p");
        autor.textContent = "Autor: " + libro[1];

        // ETIQUETA

        let etiqueta = document.createElement("span");
        etiqueta.textContent = "Recomendación BookSpace";

        // AGREGAR ELEMENTOS

        tarjeta.appendChild(portada);
        tarjeta.appendChild(titulo);
        tarjeta.appendChild(autor);
        tarjeta.appendChild(etiqueta);

        lista.appendChild(tarjeta);

    });

} else {

    descripcion.textContent =
        "No encontramos tu género. Regresa al registro para seleccionar uno.";

}