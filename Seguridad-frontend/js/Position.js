function save(){
    var data = {
        'code' : $('#code').val(),
        'name' : $('#name').val(),
        'state' : $('#state').val() == 1 ? true : false 
    };

    var jsonData = JSON.stringify(data);

    $.ajax({
        url : 'http://localhost:9000/seguridad/v1/api/position',
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
        'name' : $('#name').val(),
        'state' : parseInt($('#state').val()) 
    };

    var id = $('#id').val();
    var jsonData = JSON.stringify(data);

    $.ajax({
        url : 'http://localhost:9000/seguridad/v1/api/position/' + id, 
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
        url: 'http://localhost:9000/seguridad/v1/api/position', 
        method : 'GET',
        dataType : 'json',
        success : function(response){
            var html = '';
            var data = response.data;

            if(Array.isArray(data)){
                data.forEach(function(item){
                    html += `<tr>
                    <td>${item.code}</td>
                    <td>${item.name}</td>
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

function findById(id){
    $.ajax({
        url: 'http://localhost:9000/seguridad/v1/api/position/' + id, 
        method : 'GET',
        dataType : 'json',
        success : function(data){
            $('#id').val(data.data.id);
            $('#code').val(data.data.code);
            $('#name').val(data.data.name);
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
        url: 'http://localhost:9000/seguridad/v1/api/position/' + id, 
        method : 'DELETE',
        headers : {
            'Content-Type' : 'application/json'
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
    $('#code').val('');
    $('#state').val('');
}
