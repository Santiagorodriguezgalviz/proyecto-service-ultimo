function save(){
    console.log('Guardado')
    var direccion = buildDireccion();
    var data = {
        
        'firstName' : $('#firstName').val(),
        'lastName' : $('#lastName').val(),
        'email' :$('#email').val(),
        'phone' : $('#phone').val(),
        'dateOfBirth' : $('#dateOfBirth').val(),
        'gender' : $('#gender').val(),
        'address': direccion,
        'typeDocument' : $('#selectDocumentType').val(),
        'document' : $('#document').val(),

        'city' : { 'id' : $('#city_id').val()},
        
                'state' : $('#state').val() == 1 ? true : false 
    };

    

    var jsonData = JSON.stringify(data);

    $.ajax({
        url : 'http://localhost:9000/seguridad/v1/api/person',
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

function buildDireccion() {
    var direccion = '';
    direccion += $('#calle_carrera').val() + ' '; // Agrega la calle o carrera
    direccion += $('#numero').val() + ' '; // Agrega el número
    direccion += $('#guion').val() + ' '; // Agrega el guion
    direccion += $('#otro').val(); // Agrega el otro
    return direccion.trim(); // Elimina espacios adicionales al inicio y al final
}

function update(){
    console.log("Datos guardados")
    var direccion = buildDireccion();
    var data = {
        'firstName' : $('#firstName').val(),
        'lastName' : $('#lastName').val(),
        'email' :$('#email').val(),
        'phone' : $('#phone').val(),
        'dateOfBirth' : $('#dateOfBirth').val(),
        'gender' : $('#gender').val(),
        'address': direccion,
        'typeDocument' : $('#selectDocumentType').val(),
        'document' : $('#document').val(),

        'city' : { 'id' : $('#city_id').val()},
        
        'state' :parseInt ($('#state').val())
    };

    var id = $('#id').val();
    var jsonData = JSON.stringify(data);

    $.ajax({
        url : 'http://localhost:9000/seguridad/v1/api/person/' + id, 
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
        url: 'http://localhost:9000/seguridad/v1/api/person', 
        method : 'GET',
        dataType : 'json',
        success : function(response){
            var html = '';
            var data = response.data;

            if(Array.isArray(data)){
                data.forEach(function(item){
                    html += `<tr>
                    <td>${item.firstName}</td>
                    <td>${item.lastName}</td>
                    <td>${item.email}</td>
                    <td>${item.phone}</td>
                    <td>${item.dateOfBirth}</td>
                    <td>${item.gender}</td>
                    <td>${item.address}</td>
                    <td>${item.city.name}</td>
                    <td>${item.typeDocument}</td>
                    <td>${item.document}</td>
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
                        label: city.name,
                        value: city.id 
                    };
                });
                
                
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


function loadDocumentTypes() {
    $.ajax({
        url: 'http://localhost:9000/seguridad/v1/api/tipo_doc/tipo_documento',
        method: "GET",
        dataType: 'json',
        success: function(response) {
            if (Array.isArray(response)) {
                $('#selectDocumentType').empty();
                response.forEach(function(tipo) {
                    $('#selectDocumentType').append(`<option value="${tipo}">${tipo}</option>`);
                });
            } else {
                console.error("No se obtuvo la lista de tipos de documento.");
            }
        },
        error: function(error) {
            console.error("Error al obtener los tipos de documento: ", error);
        }
    });
}


function loadDocumentTypes() {
    $.ajax({
        url: 'http://localhost:9000/seguridad/v1/api/tipo_doc/tipo_documento',
        method: "GET",
        dataType: 'json',
        success: function(response) {
            if (Array.isArray(response)) {
                $('#selectDocumentType').empty();
                response.forEach(function(tipo) {
                    $('#selectDocumentType').append(`<option value="${tipo}">${tipo}</option>`);
                });
            } else {
                console.error("No se obtuvo la lista de tipos de documento.");
            }
        },
        error: function(error) {
            console.error("Error al obtener los tipos de documento: ", error);
        }
    });
}




function findById(id){
    
    $.ajax({
        url: 'http://localhost:9000/seguridad/v1/api/person/' + id,
        method : 'GET',
        dataType : 'json',
        success : function(data){
            $('#id').val(data.data.id);
            $('#firstName').val(data.data.firstName);
            $('#lastName').val(data.data.lastName);
            $('#email').val(data.data.email);
            $('#phone').val(data.data.phone);
            $('#dateOfBirth').val(data.data.dateOfBirth);
            $('#gender').val(data.data.gender);
            $('selectDocumentType').val(data.data.typeDocument);
            $('#document').val(data.data.document);
            $('#direccion').val(data.data.address);
            
           
            $('#numero').val(data.data.address);
            $('#guion').val(data.data.address);
            $('#otro').val(data.data.address);
            $('#city').val(data.data.city.id);
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
        url: 'http://localhost:9000/seguridad/v1/api/person/' + id,
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
    $('#calle').val('');
    $('#carrera').val('');
    $('#transversal').val('');
    $('#bis').val(''.bis);
    $('#firstName').val('');
    $('#lastName').val('');
    $('#email').val('');
    $('#phone').val('');
    $('#dateOfBirth').val('');
    $('#gender').val('');
    $('#address').val('');
    $('#city').val('');
    $('selectDocumentType').val('');
    $('#document').val('');
    $('#calle_carrera').val('');
    $('#numero').val('');
    $('guion').val('');
    $('#otro').val('');
    $('#state').val('');
}

function loadNomeclaturas() {
    $.ajax({
        url: 'http://localhost:9000/seguridad/v1/api/tipo_doc/nomeclatura',
        method: "GET",
        dataType: 'json',
        success: function(response) {
            if (Array.isArray(response)) {
                response.forEach(function(nomeclatura) {
                    $('#addressType').append(`<option value="${nomeclatura}">${nomeclatura}</option>`);
                    $('#inputData').append(`<div class="form-group row" id="${nomeclatura}" style="display: none;">
                                                <label class="col-sm-2 col-form-label">${nomeclatura}</label>
                                                <div class="col-sm-10">
                                                    <input type="text" class="form-control" name="${nomeclatura}" id="${nomeclatura}" placeholder="${nomeclatura}">
                                                </div>
                                            </div>`);
                });

                $('#addressType').change(function() {
                    var selectedType = $(this).val();
                    $('[id^="calle"], [id^="numero"], [id^="guion"], [id^="otro"]').hide();
                    $('#' + selectedType).show();
                });
            } else {
                console.error("No se obtuvo la lista de nomeclaturas.");
            }
        },
        error: function(error) {
            console.error("Error al obtener las nomeclaturas: ", error);
        }
    });
}