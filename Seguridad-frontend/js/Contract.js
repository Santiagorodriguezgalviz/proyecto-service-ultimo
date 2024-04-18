function save(){
    var data = {
        'code' : $('#code').val(),
        'dateStart' : $('#dateStart').val(),
        'dateEnding' :$('#dateEnding').val(),
        'salary' : $('#salary').val(),
        'object' : $('#object').val(),
        'company' : { 'id' : $('#company_id').val()},
        'employed' : { 'id' : $('#employed_id').val()},
        'state' : $('#state').val() == 1 ? true : false 
    };

    var jsonData = JSON.stringify(data);

    $.ajax({
        url : 'http://localhost:9000/seguridad/v1/api/contract',
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
        'code' : $('#code').val(),
        'dateStart' : $('#dateStart').val(),
        'dateEnding' :$('#dateEnding').val(),
        'salary' : $('#salary').val(),
        'object' : $('#object').val(),
        'company' : { 'id' : $('#company_id').val()},
        'employed' : { 'id' : $('#employed_id').val()},
        'state' :parseInt ($('#state').val())
    };

    var id = $('#id').val();
    var jsonData = JSON.stringify(data);

    $.ajax({
        url : 'http://localhost:9000/seguridad/v1/api/contract/' + id, 
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
        url: 'http://localhost:9000/seguridad/v1/api/contract', 
        method : 'GET',
        dataType : 'json',
        success : function(response){
            var html = '';
            var data = response.data;

            if(Array.isArray(data)){
                data.forEach(function(item){
                    html += `<tr>
                    <td>${item.code}</td>
                    <td>${item.dateStart}</td>
                    <td>${item.dateEnding}</td>
                    <td>${item.salary}</td>
                    <td>${item.object}</td>
                    <td>${item.company.web}</td>
                    <td>${item.employed.person.firstName} ${item.employed.person.lastName}</td>
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

function loadCompany(){
    $.ajax({
        url : 'http://localhost:9000/seguridad/v1/api/company',
        method: "GET",
        dataType: 'json',
        success: function(response) {
            if (response.status && Array.isArray(response.data)) {
                var companys = response.data.map(function(company) {
                    return {
                        label: company.web, 
                        value: company.id 
                    };
                });

                
                $('#company').autocomplete({
                    source : function(request, response){
                        var results = $.ui.autocomplete.filter(companys, request.term);
                        if (!results.length){
                            results = [{label : 'No se encontraron resultados', value: null}];
                        }
                        response(results);
                    },
                    select: function(event, ui){
                        $("#company_id").val(ui.item.value);
                        $("#company").val(ui.item.label);
                        console.log("ID del empleado seleccionado: " + ui.item.value);
                        return false;
                    }
                });
            } else {
                console.error("No se obtuvo la lista de empleados.");
            }
        },
        error : function(error){
            console.error("Error de la solicitud: ",error);
        }
    });
}

function loadEmployed(){
    $.ajax({
        url : 'http://localhost:9000/seguridad/v1/api/employed',
        method: "GET",
        dataType: 'json',
        success: function(response) {
            if (response.status && Array.isArray(response.data)) {
                var employeds = response.data.map(function(employed) {
                    return {
                        label: `${employed.person.firstName} ${employed.person.lastName}`, // Mostrar nombre y apellido
                        value: employed.id // El valor que se enviará cuando se seleccione un elemento
                    };
                });

                // Inicializar el autocompletado en el campo de entrada #employed
                $('#employed').autocomplete({
                    source : function(request, response){
                        var results = $.ui.autocomplete.filter(employeds, request.term);
                        if (!results.length){
                            results = [{label : 'No se encontraron resultados', value: null}];
                        }
                        response(results);
                    },
                    select: function(event, ui){
                        $("#employed_id").val(ui.item.value);
                        $("#employed").val(ui.item.label);
                        console.log("ID del empleado seleccionado: " + ui.item.value);
                        return false;
                    }
                });
            } else {
                console.error("No se obtuvo la lista de empleados.");
            }
        },
        error : function(error){
            console.error("Error de la solicitud: ",error);
        }
    });
}


function loadCity(){
    $.ajax({
        url: 'http://localhost:9000/seguridad/v1/api/city',
        method: "GET",
        dataType: 'json',
        success: function(response) {
            if (response.status && Array.isArray(response.data)) {
                var cities = response.data.map(function(city) {
                    return {
                        label: city.name, // Mostrar nombre y apellido
                        value: city.id // El valor que se enviará cuando se seleccione un elemento
                    };
                });
                
                // Inicializar el autocompletado en el campo de entrada #person
                $('#city').autocomplete({
                    source : function(request, response){
                        var results = $.ui.autocomplete.filter(cities, request.term);
                        if (!results.length){
                            results = [{label : 'No se encontraron resultados', value: null}];
                        }
                        response(results);
                    },
                    select: function(event, ui){
                        $("#city_id").val(ui.item.value);
                        $("#city").val(ui.item.label);
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
        url: 'http://localhost:9000/seguridad/v1/api/contract/' + id,
        method : 'GET',
        dataType : 'json',
        success : function(data){
            $('#id').val(data.data.id);
            $('#code').val(data.data.code);
            $('#dateStart').val(data.data.dateStart);
            $('#dateEnding').val(data.data.dateEnding);
            $('#salary').val(data.data.salary);
            $('#object').val(data.data.object);
            $('#company').val(data.data.company.id);
            $('#employed').val(data.data.employed.id);
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


function deleteById(id) {
    $.ajax({
        url: 'http://localhost:9000/seguridad/v1/api/contract/' + id,
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }).done(function(result) {
        alert("Registro eliminado exitoso");
        loadData();
        clearData();
    }).fail(function(xhr, status, error) {
        console.error("Error al eliminar el registro:", error);
    });
}

function clearData(){
    $('#code').val('');
    $('#dateStart').val('');
    $('#dateEnding').val('');
    $('#salary').val('');
    $('#object').val('');
    $('#company').val('');
    $('#employed').val('');
    $('#state').val('');
}
