// Configuración de Firebase
const firebaseConfig = {
    apiKey: "TU_API_KEY",
    authDomain: "TU_AUTH_DOMAIN",
    projectId: "TU_PROJECT_ID",
    storageBucket: "TU_STORAGE_BUCKET",
    messagingSenderId: "TU_MESSAGING_SENDER_ID",
    appId: "TU_APP_ID",
    measurementId: "TU_MEASUREMENT_ID"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);
// Inicializa Firestore
var db = firebase.firestore();

// Obtener referencia a la colección de publicaciones en la base de datos
const publicacionesRef = db.collection('publicaciones');

// Función para cargar y mostrar las publicaciones
function cargarPublicaciones() {
    // Limpiar contenido existente
    document.querySelector('.publicaciones').innerHTML = '';

    // Obtener los datos de las publicaciones desde la base de datos
    publicacionesRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // Obtener los datos de cada publicación
            const publicacion = doc.data();
            
            // Crear un elemento HTML para mostrar la publicación
            const publicacionHTML = `
                <div class="publicacion">
                    <h2>${publicacion.titulo}</h2>
                    <p>${publicacion.contenido}</p>
                    <button onclick="eliminarPublicacion('${doc.id}')">Eliminar</button>
                </div>
            `;

            // Agregar la publicación al contenedor
            document.querySelector('.publicaciones').innerHTML += publicacionHTML;
        });
    }).catch((error) => {
        console.error("Error al cargar las publicaciones: ", error);
    });
}

// Función para eliminar una publicación
function eliminarPublicacion(id) {
    // Confirmar si el usuario desea eliminar la publicación
    if (confirm("¿Estás seguro de que quieres eliminar esta publicación?")) {
        // Eliminar la publicación de la base de datos
        publicacionesRef.doc(id).delete().then(() => {
            console.log("Publicación eliminada correctamente.");
            // Volver a cargar las publicaciones para actualizar la lista
            cargarPublicaciones();
        }).catch((error) => {
            console.error("Error al eliminar la publicación: ", error);
        });
    }
}

// Llamar a la función para cargar las publicaciones al cargar la página
window.onload = cargarPublicaciones;
