


# Tutorial de Validación de Formulario con Firebase
Despliegue del formulario aqui: https://validacion-formulario-javascript-firebase-hs23p15hg.vercel.app

 Aplicación de validación de formulario utilizando JavaScript y Firebase. La aplicación permite a los usuarios ingresar su nombre, correo electrónico y contraseña, y luego guarda los datos en una base de datos de Firebase. A continuación, se explica el funcionamiento del código JavaScript:

## Configuración de Firebase

Antes de comenzar, asegúrate de obtener los datos de configuración necesarios de Firebase. Debes tener una cuenta de Firebase y un proyecto configurado. Luego, reemplaza los valores de `API_KEY`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId` y `measurementId` en el objeto `firebaseConfig` con los valores correspondientes proporcionados por Firebase.

   const firebaseConfig = {
    apiKey: "AIzaSyAtzZBYDfoiNzqGID-Dbmocn3sSfbI4nTM",
    authDomain: "datos-de-formulario-a7f4a.firebaseapp.com",
    projectId: "datos-de-formulario-a7f4a",
    storageBucket: "datos-de-formulario-a7f4a.appspot.com",
    messagingSenderId: "272027873812",
    appId: "1:272027873812:web:71f8f1b1ee8373451ced01",
    measurementId: "G-3QH6MBXXNZ"
};
    
    // Inicializar Firebase
    firebase.initializeApp(firebaseConfig);

## Inicialización de Firestore

Después de configurar Firebase, inicializamos Firestore y obtenemos una referencia al servicio. Esto nos permite interactuar con la base de datos de Firebase.

    const db = firebase.firestore();

## Validación del Formulario

El siguiente paso es validar los campos del formulario cuando se envía. Se agrega un evento de escucha al elemento con el ID "formulario" para capturar el evento de envío.

    document.getElementById('formulario').addEventListener('submit', (event) => {
      event.preventDefault();
      // Código de validación del formulario
    });

Dentro del evento de envío, realizamos la validación de los campos del formulario uno por uno.

### Validación del campo de nombre

    let entradaNombre = document.getElementById('name');
    let errorNombre = document.getElementById('nameError');
    
    if (entradaNombre.value.trim() === '') {
      errorNombre.textContent = 'Por favor, introducí tu nombre';
      errorNombre.classList.add('error-message');
    } else {
      errorNombre.textContent = '';
      errorNombre.classList.remove('error-message');
    }

Verificamos si el valor del campo de nombre está en blanco. Si es así, mostramos un mensaje de error y aplicamos una clase CSS para resaltar el error. De lo contrario, eliminamos cualquier mensaje de error y la clase CSS correspondiente.

### Validación del correo electrónico

    //validar campo correo electronico
let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern =  /\S+@\S+\.\S+/

    if(!emailPattern.test(emailEntrada.value)){
        emailError.textContent = 'por favor introdicir un email valido' 
        emailError.classList.add('error-message')
    }
    else{
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }

### Validación de la contraseña

    if (!contrasenaPattern.test(contrasenaEntrada.value)) {
      contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, números, mayúsculas y minúsculas y caracteres especiales';
      contrasenaError.classList.add('error-message');
    } else {
      contrasenaError.textContent = '';
      contrasenaError.classList.remove('error-message');
    }

### Envío del formulario y almacenamiento en Firebase

    if (!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent) {
      db.collection("users").add({
        nombre: entradaNombre.value,
        email: emailEntrada.value,
        password: contrasenaEntrada.value
      })
      .then((docRef) => {
        alert('El formulario se ha enviado con éxito', docRef.id);
        document.getElementById('formulario').reset();
      })
      .catch((error) => {
        alert(error);
      });
    }

Si no hay mensajes de error en ninguno de los campos, procedemos a enviar el formulario. Utilizamos la función `add()` de Firestore para agregar un nuevo documento a la colección "users" en la base de datos de Firebase. El documento contiene los valores ingresados en los campos del formulario. Si el envío es exitoso, mostramos una alerta con un mensaje de éxito y restablecemos el formulario. Si ocurre algún error, mostramos una alerta con el mensaje de error.
