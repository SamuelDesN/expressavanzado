$(document).ready(function(){
    let rango=0
    $.ajax({
        url:"http://localhost:5000/users/",
        method:"GET",
        success:function(data){
            rango=data.length
            $('#buscador').attr("placeholder", `Introduce numero del 1 al ${rango}`)}})
    
    $('#listar').click(function(){
        $.ajax({
            url:"http://localhost:5000/users/",
            method:"GET",
            success:function(data){
                $('#result').html(" ")
                let rango=data.length
                $('#result').html("<div class='cartas'></div>");
for (let i = 0; i < rango; i++) {
    $('.cartas').append(`
        <div class='carta'>
            <img class='fotolista' src='./imagenes/alumno.png'>
            <p class='idlista'>ID: ${data[i].id}</p>
            <p class='nombrelista'>${data[i].nombre}</p>
            <p class='apellidolista'>${data[i].apellido}</p>
            <p class='telefonolista'>${data[i].telefono}</p>
        </div>
    `);
}
                
                }
            })
        })
        $('#primer').on('click',function(){
            $.ajax({
                url:"http://localhost:5000/users/user1",
                method:"GET",
                success:function(data){
                    $('#result').html(` <div class='carta'>
            <img class='fotolista' src='./imagenes/alumno.png'>
            <p class='idlista'>ID: ${data.id}</p>
            <p class='nombrelista'>${data.nombre}</p>
            <p class='apellidolista'>${data.apellido}</p>
            <p class='telefonolista'>${data.telefono}</p>
        </div>`)
                    }
                })
        })
        $('#buscarid').on('click',function(){
            let valor=$('#buscador').val()
            $('#buscador').val("")
            $.ajax({
                url:`http://localhost:5000/users/${valor}`,
                method:"GET",
                success:function(data){
                    if(valor>=1){
                        $('#result').html(` <div class='carta'>
                            <img class='fotolista' src='./imagenes/alumno.png'>
                            <p class='idlista'>ID: ${data.id}</p>
                            <p class='nombrelista'>${data.nombre}</p>
                            <p class='apellidolista'>${data.apellido}</p>
                            <p class='telefonolista'>${data.telefono}</p>
                        </div>`)
                     }
                    else{
                        $('#result').html('')
                    }}
                })
        })
        $('#agregar').on('click', function () {
            $('#result').html(`
                <div class='agregarlo'>
                <input type='text' class='nombre' placeholder='Introduce tu nombre' required><br>
                <input type='text' class='apellido' placeholder='Introduce tu apellido' required><br>
                <input type='number' class='telefono' placeholder='Introduce tu número' required><br>
                <button class='enviar'>Enviar</button>
                </div>
            `);
        
            $('.enviar').on('click', function () {
                let nombrenuevo = $('.nombre').val();
                let apellidonuevo = $('.apellido').val();
                let telefononuevo = $('.telefono').val();
                if (!nombrenuevo || !apellidonuevo || !telefononuevo) {
                    alert("Completa todos los campos");
                    return;
                }
                $.ajax({
                    url: `http://localhost:5000/users`,
                    type: "POST",
                    contentType: "application/json", 
                    data: JSON.stringify({ 
                        id: rango + 1, 
                        nombre: nombrenuevo,
                        apellido: apellidonuevo,
                        telefono: telefononuevo
                    }),
                    success: function () {
                        alert("Usuario agregado con éxito");
                        $('.nombre').val("");
                        $('.apellido').val("");
                        $('.telefono').val("");
                        rango++;
                    },
                });
            });
        });
    })
                                
            
        
    