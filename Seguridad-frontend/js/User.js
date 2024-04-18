function save(){
    var data = {
        'username' : $('#username').val(),
        'password' : $('#password').val(),
        'person' : { 
            'id' : $('#person_id').val()
        },
        'role' : [{ 
            'id' : $('#role_id').val()
        }],
        'state' : $('#state').val() == 1 ? true : false 
    };

    var jsonData = JSON.stringify(data);

    $.ajax({
        url : 'http://localhost:9000/seguridad/v1/api/user',
        method : 'POST',
        dataType : 'json',
        contentType : 'application/json',
        data : jsonData,
        success : function(data){
            alert("Registro guardado.");
            loadData();
            clearData();
        },
        error : function(error){
            console.error('Error al guardar: ',error);
        }
    });
}

function update(){
    var data = {
        'username' : $('#username').val(),
        'password' : $('#password').val(),
        'person' : { 
            'id' : $('#person_id').val()
        },
        'role' : [{ 
            'id' : $('#role').val()
        }],
        'state' :parseInt ($('#state').val())
    };

    var id = $('#id').val();
    var jsonData = JSON.stringify(data);

    $.ajax({
        url : 'http://localhost:9000/seguridad/v1/api/user/' + id, 
        method: "PUT",
        dataType: 'json',
        contentType: 'application/json',
        data: jsonData,
        success : function(result){
            alert("Actualizado.");
            loadData(); 
            clearData();

            var btnAgregar = $('button[name="btnAgregar"]');
            btnAgregar.text('Agregar');
            btnAgregar.attr('onclick', 'save()');
        },
        error : function(error){
            console.error('Error al actualizar: ', error);
        }
    });
}

function loadData(){
    $.ajax({
        url: 'http://localhost:9000/seguridad/v1/api/user', 
        method : 'GET',
        dataType : 'json',
        success : function(response){
            var html = '';
            var data = response.data;

            if(Array.isArray(data)){
                data.forEach(function(item){
                    var roles = "";
                    item.role.forEach(function(role){
                        roles += role.name + ", ";
                    });
                    roles = roles.slice(0, -2); // Elimina la última coma y el espacio

                    html += `<tr>
                    <td>${item.username}</td>
                    <td>${item.password}</td>
                    <td>${item.person.firstName} ${item.person.lastName}</td>
                    <td>${roles}</td>
                    <td>${item.state === true ? 'Activo': 'Inactivo'}</td>
                    <td><button onclick="findById(${item.id})">Editar</button></td>
                    <td><button onclick="deleteById(${item.id})">Eliminar</button></td>
                    </tr>`;
                });
            } else {
                console.error('El atributo "data" no es un arreglo: ',data);
            }
            $('#resultData').html(html);
        },
        error : function(error){
            console.error('Error al cargar: ',error);
        }
    });
}


function loadPerson(){
    $.ajax({
        url: 'http://localhost:9000/seguridad/v1/api/person',
        method: "GET",
        dataType: 'json',
        success: function(response) {
            if (response.status && Array.isArray(response.data)) {
                var persons = response.data.map(function(person) {
                    return {
                        label: `${person.firstName} ${person.lastName}`, // Mostrar nombre y apellido
                        value: person.id // El valor que se enviará cuando se seleccione un elemento
                    };
                });
                
                // Inicializar el autocompletado en el campo de entrada #person
                $('#person').autocomplete({
                    source : function(request, response){
                        var results = $.ui.autocomplete.filter(persons, request.term);
                        if (!results.length){
                            results = [{label : 'No se encontraron resultados', value: null}];
                        }
                        response(results);
                    },
                    select: function(event, ui){
                        $("#person_id").val(ui.item.value);
                        $("#person").val(ui.item.label);
                        console.log("ID de empresa seleccionada: " + ui.item.value);
                        return false;
                    }
    });
} else {
    console.error("No se obtuvo la lista de personas.");
}
        },
        error : function(error){
            console.error("Error de la solicitur: ",error);
        }
    });
}

function loadRole(){
    $.ajax({
        url: 'http://localhost:9000/seguridad/v1/api/role',
        method: "GET",
        dataType: 'json',
        success: function(response) {
            if (response.status && Array.isArray(response.data)) {
                var roles = response.data.map(function(role) {
                    return {
                        label: role.name, // Mostrar nombre y apellido
                        value: role.id // El valor que se enviará cuando se seleccione un elemento
                    };
                });
                
                // Inicializar el autocompletado en el campo de entrada #person
                $('#role').autocomplete({
                    source : function(request, response){
                        var results = $.ui.autocomplete.filter(roles, request.term);
                        if (!results.length){
                            results = [{label : 'No se encontraron resultados', value: null}];
                        }
                        response(results);
                    },
                    select: function(event, ui){
                        $("#role_id").val(ui.item.value);
                        $("#role").val(ui.item.label);
                        console.log("ID de empresa seleccionada: " + ui.item.value);
                        return false;
                    }
    });
} else {
    console.error("No se obtuvo la lista de personas.");
}
        },
        error : function(error){
            console.error("Error de la solicitur: ",error);
        }
    });
}

function findById(id){
    $.ajax({
        url : 'http://localhost:9000/seguridad/v1/api/user/' + id, 
        method: "GET",
        dataType: 'json',
        success : function(data){
            $('#id').val(data.data.id);
            $('#username').val(data.data.username);
            $('#password').val(data.data.password);
            $('#person').val(data.data.person.id);
            $('#role').val(data.data.role.id);
            $('#state').val(data.data.state === true ? 1 : 0);

            var btnAgregar = $('button[name="btnAgregar"]');
            btnAgregar.text('Actualizar');
            btnAgregar.attr('onclick', 'update()');

        },
        error : function(error){
            console.error('Error al encontrar: ',error);
        }
    });
}

function deleteById(id){
    $.ajax({
        url : 'http://localhost:9000/seguridad/v1/api/user/' + id, 
        method : 'DELETE',
        dataType : 'json',
        headers : {
            'Content-Type' : 'application/jsons'
        }
    }).done(function(result){
        alert("Registro eliminado exitoso");
        loadData();
        clearData();
    }).fail(function(xhr, status, error) {
        console.error("Error al eliminar el registro:", error);
    });
}

function clearData(){
    $('#username').val('');
    $('#password').val('');
    $('#person').val('');
    $('#view').val('');
    $('#state').val('');
}