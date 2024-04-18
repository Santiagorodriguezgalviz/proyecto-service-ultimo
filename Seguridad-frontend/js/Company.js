function save(){
    actualizarDireccion();
    var data ={
        'nit' : $('#nit').val(),
        'rs' : $('#rs').val(),
        'address' : $('#address').val(),
        'city' : {'id' : $('#city_id').val()},
        'web' : $('#web').val(),
        'email' : $('#email').val(),
        'phone' : $('#phone').val(),
        'state' : $('#state').val() == 1 ? true : false 
    };

    var jsonData = JSON.stringify(data);
    $.ajax({
        url : 'http://localhost:9000/seguridad/v1/api/company',
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
        'nit' : $('#nit').val(),
        'rs' : $('#rs').val(),
        'address' : $('#address').val(),
        'city' : {'id' : $('#city_id').val()},
        'web' : $('#web').val(),
        'email' : $('#email').val(),
        'phone' : $('#phone').val(),
        'state' : parseInt($('#state').val()) 
    };

    var id = $('#id').val();
    var jsonData = JSON.stringify(data);

    $.ajax({
        url : 'http://localhost:9000/seguridad/v1/api/company/' + id, 
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
        url : 'http://localhost:9000/seguridad/v1/api/company',
        method: "GET",
        dataType: 'json',
        success : function(response){
            var html = '';
            var data = response.data;

            if(Array.isArray(data)){
                data.forEach(function(item){
                    html += `<tr>
                    <td>${item.nit}</td>
                    <td>${item.rs}</td>
                    <td>${item.address}</td>
                    <td>${item.city.name}</td>
                    <td>${item.web}</td>
                    <td>${item.email}</td>
                    <td>${item.phone}</td>
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
        url : 'http://localhost:9000/seguridad/v1/api/company/' + id,
        method: "GET",
        dataType: 'json',
        success : function(data){
            $('#id').val(data.data.id);
            $('#nit').val(data.data.nit);
            $('#rs').val(data.data.rs);
            $('#address').val(data.data.address);
            $('#city').val(data.data.city.id);
            $('#web').val(data.data.web);
            $('#email').val(data.data.email);
            $('#phone').val(data.data.phone);
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

function cargarNomeclaturas() {
    var nomeclaturas = {
        "calle": "Calle",
        "carrera": "Carrera",
        "transversal": "Transversal",
        "bis": "Bis"
    };

    var addressInput = '';

    for (var key in nomeclaturas) {
        if (nomeclaturas.hasOwnProperty(key)) {
            addressInput += `<div class="form-group row">
                                <label class="col-sm-2 col-form-label">${nomeclaturas[key]}</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" name="${key}" id="${key}" placeholder="${nomeclaturas[key]}">
                                </div>
                            </div>`;
        }
    }

    $("#inputs").append(addressInput);
}

function actualizarDireccion() {
    var address = '';

    // Iterar sobre todos los campos de dirección y construir la dirección completa
    $("#inputs input[type='text']").each(function () {
        var fieldValue = $(this).val().trim();
        var fieldLabel = $(this).attr('placeholder').trim();
        if (fieldValue !== '') {
            address += `${fieldLabel}: ${fieldValue}, `;
        }
    });

    // Actualizar el campo "Address" con la dirección construida
    $("#address").val(address);
}

function deleteById(id){
    $.ajax({
        url : 'http://localhost:9000/seguridad/v1/api/company/' + id,
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
    $('#nit').val('');
    $('#rs').val('');
    $('#address').val('');
    $('#city').val('');
    $('#web').val('');
    $('#email').val('');
    $('#phone').val('');
    $('#state').val('');
}