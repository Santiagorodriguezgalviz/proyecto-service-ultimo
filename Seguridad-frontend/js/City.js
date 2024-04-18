function save(){
    var data ={
        'name' : $('#name').val(),
        'code' : $('#code').val(),
        'department' : {'id' : $('#department_id').val()},
        'state' : $('#state').val() == 1 ? true : false 
    };

    var jsonData = JSON.stringify(data);
    $.ajax({
        url : 'http://localhost:9000/seguridad/v1/api/city',
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
        'name' : $('#name').val(),
        'code' : $('#code').val(),
        'department' : {'id' : $('#department').val()},
        'state' : parseInt($('#state').val()) 
    };

    var id = $('#id').val();
    var jsonData = JSON.stringify(data);

    $.ajax({
        url : 'http://localhost:9000/seguridad/v1/api/city/' + id, 
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
        url : 'http://localhost:9000/seguridad/v1/api/city',
        method: "GET",
        dataType: 'json',
        success : function(response){
            var html = '';
            var data = response.data;

            if(Array.isArray(data)){
                data.forEach(function(item){
                    html += `<tr>
                    <td>${item.name}</td>
                    <td>${item.code}</td>
                    <td>${item.department.name}</td>
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

function loadDepartment(){
    $.ajax({
        url: 'http://localhost:9000/seguridad/v1/api/department',
        method: "GET",
        dataType: 'json',
        success: function(response) {
            if (response.status && Array.isArray(response.data)) {
                var departments = response.data.map(function(department) {
                    return {
                        label: department.name, // Mostrar nombre y apellido
                        value: department.id // El valor que se enviará cuando se seleccione un elemento
                    };
                });
                
                // Inicializar el autocompletado en el campo de entrada #person
                $('#department').autocomplete({
                    source : function(request, response){
                        var results = $.ui.autocomplete.filter(departments, request.term);
                        if (!results.length){
                            results = [{label : 'No se encontraron resultados', value: null}];
                        }
                        response(results);
                    },
                    select: function(event, ui){
                        $("#department_id").val(ui.item.value);
                        $("#department").val(ui.item.label);
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
        url : 'http://localhost:9000/seguridad/v1/api/city/' + id,
        method: "GET",
        dataType: 'json',
        success : function(data){
            $('#id').val(data.data.id);
            $('#name').val(data.data.name);
            $('#code').val(data.data.code);
            $('#department').val(data.data.department.id);
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
        url : 'http://localhost:9000/seguridad/v1/api/city/' + id,
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
    $('#name').val('');
    $('#code').val('');
    $('#department').val('');
    $('#state').val('');
}