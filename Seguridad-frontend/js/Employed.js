function save(){
    var data ={
        'code' : $('#code').val(),
        'person' : {'id' : $('#person_id').val()},
        'company' : {'id' : $('#company_id').val()},
        'position' : {'id' : $('#position_id').val()},
        'state' : $('#state').val() == 1 ? true : false 
    };

    var jsonData = JSON.stringify(data);
    $.ajax({
        url : 'http://localhost:9000/seguridad/v1/api/employed',
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
    var data ={
        'code' : $('#code').val(),
        'person' : {'id' : $('#person_id').val()},
        'company' : {'id' : $('#company_id').val()},
        'position' : {'id' : $('#position_id').val()},
        'state' : parseInt($('#state').val()) 
    };

    var id = $('#id').val();
    var jsonData = JSON.stringify(data);

    $.ajax({
        url : 'http://localhost:9000/seguridad/v1/api/employed/' + id, 
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
        url : 'http://localhost:9000/seguridad/v1/api/employed',
        method: "GET",
        dataType: 'json',
        success : function(response){
            var html = '';
            var data = response.data;

            if(Array.isArray(data)){
                data.forEach(function(item){
                    html += `<tr>
                    <td>${item.code}</td>
                    <td>${item.person.firstName}</td>
                    <td>${item.company.web}</td>
                    <td>${item.position.name}</td>
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

function loadPosition(){
    $.ajax({
        url : 'http://localhost:9000/seguridad/v1/api/position',
        method: "GET",
        dataType: 'json',
        success: function(response) {
            if (response.status && Array.isArray(response.data)) {
                var positions = response.data.map(function(position) {
                    return {
                        label: position.name, 
                        value: position.id 
                    };
                });

                
                $('#position').autocomplete({
                    source : function(request, response){
                        var results = $.ui.autocomplete.filter(positions, request.term);
                        if (!results.length){
                            results = [{label : 'No se encontraron resultados', value: null}];
                        }
                        response(results);
                    },
                    select: function(event, ui){
                        $("#position_id").val(ui.item.value);
                        $("#position").val(ui.item.label);
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

function findById(id){
    $.ajax({
        url : 'http://localhost:9000/seguridad/v1/api/employed/' + id,
        method: "GET",
        dataType: 'json',
        success : function(data){
            $('#id').val(data.data.id);
            $('#code').val(data.data.code);
            $('#person').val(data.data.person.id);
            $('#company').val(data.data.company.id);
            $('#position').val(data.data.position.id);
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
        url : 'http://localhost:9000/seguridad/v1/api/employed/' + id,
        method: "DELETE",
        headers : {
            'Content-Type' : 'application/json'
        }
    }).done(function(result){
        alert("Registro eliminado.");
        loadData();
        clearData();
    }).fail(function(xhr, status, error) {
        console.error("Error al eliminar el registro:", error);
    });
}

function clearData(){
    $('#code').val('');
    $('#person').val('');
    $('#company').val('');
    $('#position_id').val('');
    $('#state').val('');
}