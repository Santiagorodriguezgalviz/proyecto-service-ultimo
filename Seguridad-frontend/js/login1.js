function login() {
    // Obtener los datos del formulario
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    var userData = {
        username: username,
        password: password
    };

    $.ajax({
        url: 'http://localhost:9000/seguridad/v1/api/user/login',
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(userData),
        success: function (data) {  
            if (data && data.data) {
                // Almacenar los datos del usuario en localStorage
                localStorage.setItem('userData', JSON.stringify(data.data));

                // Redirigir al usuario al navbar o a la página que necesites
                console.log("dato concedido");
                
                Swal.fire({
                    title: "¡Perfecto!",
                    text: "¡Acceso concedido!",
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                }).then(() => {
                    window.location.href = "../view/Navbar.html";
                });

                window.location.href = "../view/Navbar.html";
            } else {
                Swal.fire({
                    title: "¡Oops!",
                    text: "¡Inicio de sesión fallido!",
                    icon: "error",
                    timer: 2000,
                    showConfirmButton: false
                });
            }

        },
        error: function (error) {
            console.log("error datra");
            console.error('Error en la solicitud:', error);
            // Si hay un error en la solicitud, redireccionar a la página de inicio de sesión
            window.location.href = "../view/login1.html";
        }
    });
}
