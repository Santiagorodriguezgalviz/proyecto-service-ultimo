function login() {
    var username = $('#username').val();
    var password = $('#password').val();

    if (username.trim() === '' || password.trim() === '') {
        alert('Por favor ingrese un nombre de usuario y una contraseña.');
        return;
    }


    var loginData = {
        'username': username,
        'password': password
    };


    var jsonData = JSON.stringify(loginData);

    
    $.ajax({
        url: 'http://localhost:9000/seguridad/v1/api/user/login/', 
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: jsonData,
        success: function(response) {
            if (response.status) {
                alert('Inicio de sesión exitoso');
                window.location.href = '../view/Person.html';
            } else {
                alert('Error al iniciar sesión: ' + response.message);
            }
        },
        error: function(xhr, status, error) {
            alert('Error al iniciar sesión: ' + error);
        }
    });
}
