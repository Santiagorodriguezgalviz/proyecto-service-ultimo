
$(document).ready(function() {
    loadData();
    loadPerson();
    loadDocumentTypes();
    loadDocumentTypesPerson();
});

function save() {
    var data = {
        'code': $('#code').val(),
        'person': {
            'id': $('#person_id').val()
        },
        'state': $('#state').val() == 1 ? true : false
    };

    $.ajax({
        url: 'http://localhost:9000/seguridad/v1/api/client',
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(data) {
            alert("Registro guardado.");
            loadData();
            clearData();
        },
        error: function(error) {
            console.error('Error al guardar: ', error);
        }
    });
}



function savePerson() {
    var direccion = buildDireccion();
    var data = {
        'firstName': $('#first_name').val(),
        'lastName': $('#last_name').val(),
        'email': $('#email').val(),
        'typeDocument': $('#selectDocumentType').val(),
        'document': $('#documento').val(),
        'phone': $('#phone').val(),
        'city' : { 'id' : $('#city').val()},
        'dateOfBirth': $('#dateOfBirth').val(),
        'gender': $('#gender').val(),
        'address': direccion,
        'state': $('#state').val() == 1 ? true : false
    };

    $.ajax({
        url: 'http://localhost:9000/seguridad/v1/api/client/personCliente',    
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(data) {
            alert("Persona guardada correctamente.");
            loadPerson();
            clearPersonForm();
            $('#staticBackdrop').modal('hide');
        },
        error: function(error) {
            console.error('Error al guardar la persona: ', error);
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

// Función para actualizar un cliente
function update() {
    // Obtener los datos del formulario
    var data = {
        'person': {
            'id': $('#person_id').val(),
            'firstName' : $('#firstName').val(),
            'lastName' : $('#lastName').val(),
            'email' :$('#email').val(),
            'phone' : $('#phone').val(),
            'dateOfBirth' : $('#dateOfBirth').val(),
            'gender' : $('#gender').val(),
            'address': direccion,
            'city' : { 'id' : $('#city_id').val()},
            'typeDocument' : $('#selectDocumentType').val(),
            'document' : $('#document').val(),
            'state' : $('#state').val() == 1 ? true : false 
        },
        'state': parseInt($('#state').val())
    };

    var id = $('#id').val();

    // Realizar la petición AJAX para actualizar el cliente
    $.ajax({
        url: 'http://localhost:9000/seguridad/v1/api/client/' + id,
        method: "PUT",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function(result) {
            alert("Actualizado.");
            loadData(); // Recargar la lista de clientes
            clearData(); // Limpiar los campos del formulario
            // Cambiar el texto y el evento del botón a "Agregar" después de la actualización
            var btnAgregarCrear = $('#btnAgregarCrear'); // Seleccione el botón correcto
            btnAgregarCrear.text('Agregar');
            btnAgregarCrear.off('click').on('click', function() {
                save(); // Llamar a la función de guardar
            });
        },
        error: function(error) {
            console.error('Error al actualizar: ', error);
        }
    });
}

// Función para cargar los datos de los clientes
function loadData() {
    $.ajax({
        url: 'http://localhost:9000/seguridad/v1/api/client',
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            var html = '';
            var data = response.data;

            if (Array.isArray(data)) {
                data.forEach(function(item) {
                    html += `<tr>
                    <td>${item.id}</td>
                    <td>${item.code}</td>
                    <td>${item.person.firstName} ${item.person.lastName}</td>
                    <td>${item.person.document}</td>
                    <td>${item.person.typeDocument}</td>
                    <td><button onclick="findById(${item.id})">Editar</button></td>
                    <td><button onclick="deleteById(${item.id})">Eliminar</button></td>
                    </tr>`;
                });
            } else {
                console.error('El atributo "data" no es un arreglo: ', data);
            }
            $('#resultData').html(html);
        },
        error: function(error) {
            console.error('Error al cargar: ', error);
        }
    });
}




// Función para cargar los tipos de documento
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

function loadDocumentTypesPerson() {
    $.ajax({
        url: 'http://localhost:9000/seguridad/v1/api/tipo_doc/tipo_documento',
        method: "GET",
        dataType: 'json',
        success: function(response) {
            if (Array.isArray(response)) {
                $('#selectDocumentTypePerson').empty();
                response.forEach(function(tipo) {
                    $('#selectDocumentTypePerson').append(`<option value="${tipo}">${tipo}</option>`);
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

// Función para cargar las personas
function loadPerson() {
    $.ajax({
        url: 'http://localhost:9000/seguridad/v1/api/person',
        method: "GET",
        dataType: 'json',
        success: function(response) {
            if (response.status && Array.isArray(response.data)) {
                var persons = response.data.map(function(person) {
                    return {
                        label: `${person.firstName} ${person.lastName} - ${person.document}`,
                        value: person.document,
                        id: person.id,
                        nombre: person.firstName,
                        typeDocument: person.typeDocument,
                        document: person.document
                    };
                });

                $('#tags').autocomplete({
                    source: function(request, response) {
                        var term = request.term.toLowerCase();
                        var filtered = persons.filter(function(person) {
                            return person.value.toLowerCase().startsWith(term);
                        });
                        response(filtered);
                    },
                    select: function(event, ui) {
                        $('#tags').val(ui.item.value); // Llena el número de documento
                        $('#name').val(ui.item.nombre); // Llena el nombre de la persona
                        $("#person_id").val(ui.item.id);
                        $("#document").val(ui.item.document);
                        $("#selectDocumentType").val(ui.item.typeDocument);
                        return false;
                    }
                });
                
            } else {
                console.error("No se obtuvo la lista de personas.");
            }
        },
        error: function(error) {
            console.error("Error de la solicitud: ", error);
        }
    });
}


// Función para cargar las ciudades
function loadCity() {
    $.ajax({
        url: 'http://localhost:9000/seguridad/v1/api/city',
        method: "GET",
        dataType: 'json',
        success: function(response) {
            if (response.status && Array.isArray(response.data)) {
                var city = response.data;

                $('#city').empty(); // Limpiar opciones existentes
                $('#city').append('<option selected>Selecciona una ciudad</option>'); // Opción predeterminada
                city.forEach(function(city) {
                    $('#city').append(`<option value="${city.id}">${city.name}</option>`); // Agregar cada ciudad como opción
                });
            } else {
                console.error("No se obtuvo la lista de ciudades.");
            }
        },
        error: function(error) {
            console.error("Error de la solicitud: ", error);
        }
    });
}

function editPerson(id) {
    findById(id); 
    $('#staticBackdrop').modal('show'); 
}

// Función para buscar un cliente por ID
function findById(id) {
    $.ajax({
        url: 'http://localhost:9000/seguridad/v1/api/client/' + id,
        method: "GET",
        dataType: 'json',
        success: function(data) {
            $('#id').val(data.data.id);
            $('#code').val(data.data.code);
            $('#person_id').val(data.data.person.id);
            $('#state').val(data.data.state === true ? 1 : 0);
        
            // Llenar el formulario dentro del modal
            $('#first_name').val(data.data.person.firstName);
            $('#last_name').val(data.data.person.lastName);
            $('#email').val(data.data.person.email);
            $('#selectDocumentType').val(data.data.person.typeDocument);
            $('#documento').val(data.data.person.document);
            $('#phone').val(data.data.person.phone);
            $('#city').val(data.data.person.city.id);
            $('#dateOfBirth').val(data.data.person.dateOfBirth);
            $('#gender').val(data.data.person.gender);
        
            // Mostrar el modal
            $('#staticBackdrop').modal('show');
        
            // Cambiar el texto y el evento del botón "Guardar" a "Actualizar"
            var btnAgregarCrear = $('button[name="btnAgregarCrear"]');
            btnAgregarCrear.text('Actualizar');
            btnAgregarCrear.attr('onclick', 'update()');
        },
        error: function(error) {
            console.error('Error al encontrar: ', error);
        }
    });
}


// Función para eliminar un cliente por ID
function deleteById(id) {
    $.ajax({
        url: 'http://localhost:9000/seguridad/v1/api/client/' + id,
        method: 'DELETE',
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json'
        }
    }).done(function(result) {
        alert("Registro eliminado exitoso");
        loadData();
        clearData();
    }).fail(function(xhr, status, error) {
        console.error("Error al eliminar el registro:", error);
    });
}

// Función para limpiar los campos de entrada
function clearData() {
    $('#code').val('');
    $('#person_id').val('');
    $('#person').val('');
    $('#state').val('');
    $('#tags').val('');
    $('#name').val('');
}

// Función para limpiar los campos del formulario de persona
function clearPersonForm() {
    $('#firstName').val('');
    $('#lastName').val('');
    $('#email').val('');
    $('#selectDocumentType').val('');
    $('#document').val('');
    $('#phone').val('');
    $('#dateOfBirth').val('');
    $('#gender').val('');
    $('#address').val('');
}

// Función para manejar las nomeclaturas
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
