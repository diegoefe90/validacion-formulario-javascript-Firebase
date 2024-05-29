
const firebaseConfig = {
    apiKey: "AIzaSyAtzZBYDfoiNzqGID-Dbmocn3sSfbI4nTM",
    authDomain: "datos-de-formulario-a7f4a.firebaseapp.com",
    projectId: "datos-de-formulario-a7f4a",
    storageBucket: "datos-de-formulario-a7f4a.appspot.com",
    messagingSenderId: "272027873812",
    appId: "1:272027873812:web:71f8f1b1ee8373451ced01",
    measurementId: "G-3QH6MBXXNZ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();



document.getElementById('formulario').addEventListener('submit',(Event) =>{
    Event.preventDefault()
    
    //Validar campo nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if(entradaNombre.value.trim() === ''){
        errorNombre.textContent = 'El campo nombre es obligatorio' 
        errorNombre.classList.add('error-message')
    }
    else{
        errorNombre.textContent = '' 
        errorNombre.classList.remove('error-message')
    }

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

    //validar campo contraseña
    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    if(contrasenaEntrada.value.length < 8){
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres'
        contrasenaError.classList.add('error-message')
    }else{
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-message')
    }

    //si todos los campos son validos enviar formulario
    if(!errorNombre.textContent && !emailError.textContent && !contrasenaError.textContent){
        
        
        //BACKEND QUE RECIBA LA INFORMACIÓN

        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });



        alert('El formulario se ha enviado con éxito ')
        document.getElementById('formulario').reset();
    
    }
})