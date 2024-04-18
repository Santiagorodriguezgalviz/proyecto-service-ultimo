function save(){
    var data = {
        'name' : $('#name').val(),
        'description' : $('#description').val(),
        'module' : [{ 
            'id' : $('#module_id').val()
        }],
        'state' : $('#state').val() == 1 ? true : false 
    };

    var jsonData = JSON.stringify(data);

    $.ajax({
        url : 'http://localhost:9000/seguridad/v1/api/role',
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
        'name' : $('#name').val(),
        'description' : $('#description').val(),
        'module' : [{ 
            'id' : $('#module_id').val()
        }],
        'state' :parseInt ($('#state').val())
    };

    var id = $('#id').val();
    var jsonData = JSON.stringify(data);

    $.ajax({
        url : 'http://localhost:9000/seguridad/v1/api/role/' + id, 
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
        url: 'http://localhost:9000/seguridad/v1/api/role', 
        method : 'GET',
        dataType : 'json',
        success : function(response){
            var html = '';
            var data = response.data;

            if(Array.isArray(data)){
                data.forEach(function(item){
                    var modules = "";
                    item.module.forEach(function(module){
                        modules += module.name + ", ";
                    });
                    modules = modules.slice(0, -2); // Elimina la última coma y el espacio

                    html += `<tr>
                    <td>${item.name}</td>
                    <td>${item.description}</td>
                    <td>${modules}</td>
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




function loadModule(){
    $.ajax({
        url: 'http://localhost:9000/seguridad/v1/api/module',
        method: "GET",
        dataType: 'json',
        success: function(response) {
            if (response.status && Array.isArray(response.data)) {
                var modules = response.data.map(function(module) {
                    return {
                        label: module.name, // Mostrar nombre y apellido
                        value: module.id // El valor que se enviará cuando se seleccione un elemento
                    };
                });
                
                // Inicializar el autocompletado en el campo de entrada #person
                $('#module').autocomplete({
                    source : function(request, response){
                        var results = $.ui.autocomplete.filter(modules, request.term);
                        if (!results.length){
                            results = [{label : 'No se encontraron resultados', value: null}];
                        }
                        response(results);
                    },
                    select: function(event, ui){
                        $("#module_id").val(ui.item.value);
                        $("#module").val(ui.item.label);
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
        url : 'http://localhost:9000/seguridad/v1/api/role/' + id, 
        method: "GET",
        dataType: 'json',
        success : function(data){
            $('#id').val(data.data.id);
            $('#name').val(data.data.name);
            $('#description').val(data.data.description);
            
            if(data.data.module.length > 0){
                $('#module_id').val(data.data.module[0].id)
                $('#module').val(data.data.module[0].name)
            }

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
        url : 'http://localhost:9000/seguridad/v1/api/role/' + id, 
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
    $('#name').val('');
    $('#description').val('');
    $('#module_id').val('');
    $('#state').val('');
}