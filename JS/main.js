let nombre = 0;
let precio = 0;
let noches = 0;
let libre = true


// ARRAY
const habitaciones = [];


// NUEVAS HABITACIONES
const hobbiton = new Habitacion("Hobbiton", 5000, 0, true);
habitaciones.push(hobbiton);

const isengard = new Habitacion("Isengard", 10000, 0, true);
habitaciones.push(isengard);

const moria = new Habitacion("Minas de Moria", 15000, 0, true);
habitaciones.push(moria);

const mordor = new Habitacion("Mordor", 25000, 0, true);
habitaciones.push(mordor);



// AJAX PARA TOMAR LOS COMENTARIOS DESDE EL JSON Y APLICARLOS DINAMICAMENTE
const urljson = "./JS/comentariosClientes.json";
    
$.getJSON(urljson, function (respuesta, estado) {
                
    if (estado === "success") {

        const comentarios = respuesta;
    
        $("#nombreHobbiton1").html(`${comentarios[0].nombre}`);
        $("#hobbiton1").prepend(`<img src="${comentarios[0].imagen}" alt="">`);
        $("#comenHobbiton1").html(`${comentarios[0].comentario}`);
        $("#nombreHobbiton2").html(`${comentarios[1].nombre}`);
        $("#hobbiton2").prepend(`<img src="${comentarios[1].imagen}" alt="">`);
        $("#comenHobbiton2").html(`${comentarios[1].comentario}`);

        $("#nombreIsengard1").html(`${comentarios[2].nombre}`);
        $("#isengard1").prepend(`<img src="${comentarios[2].imagen}" alt="">`);
        $("#comenIsengard1").html(`${comentarios[2].comentario}`);
        $("#nombreIsengard2").html(`${comentarios[3].nombre}`);
        $("#isengard2").prepend(`<img src="${comentarios[3].imagen}" alt="">`);
        $("#comenIsengard2").html(`${comentarios[3].comentario}`);

        $("#nombreMoria1").html(`${comentarios[4].nombre}`);
        $("#moria1").prepend(`<img src="${comentarios[4].imagen}" alt="">`);
        $("#comenMoria1").html(`${comentarios[4].comentario}`);
        $("#nombreMoria2").html(`${comentarios[5].nombre}`);
        $("#moria2").prepend(`<img src="${comentarios[5].imagen}" alt="">`);
        $("#comenMoria2").html(`${comentarios[5].comentario}`);

        $("#nombreMordor1").html(`${comentarios[6].nombre}`);
        $("#mordor1").prepend(`<img src="${comentarios[6].imagen}" alt="">`);
        $("#comenMordor1").html(`${comentarios[6].comentario}`);
        $("#nombreMordor2").html(`${comentarios[7].nombre}`);
        $("#mordor2").prepend(`<img src="${comentarios[7].imagen}" alt="">`);
        $("#comenMordor2").html(`${comentarios[7].comentario}`);

    }
});


// PINTA LOS PRECIOS DE LAS HABITACIONES EN EL HTML
$("#precioHobbiton").html(`Disfrutá de Hobbiton por sólo <strong>$${hobbiton.precio} por noche + IVA</strong>.`);
$("#precioIsengard").html(`Disfrutá de Hobbiton por sólo <strong>$${isengard.precio} por noche + IVA</strong>.`);
$("#precioMoria").html(`Disfrutá de Hobbiton por sólo <strong>$${moria.precio} por noche + IVA</strong>.`);
$("#precioMordor").html(`Disfrutá de Hobbiton por sólo <strong>$${mordor.precio} por noche + IVA</strong>.`);


/* FUNCION PARA RESERVAR HABITACION */
function reservarHabitacion() {
            
    noches = $("#noches").val();
    nombre = $("#alojamiento").val();
    
        
        switch(nombre){
            
            case "hobbiton":
                nombre = hobbiton.nombre;
                precio = hobbiton.precio;
                hobbiton.reservar()
                document.getElementById("reservarHobbiton").innerHTML = `¡Agotado!`;
                document.getElementById("reservarHobbiton").classList.add("agotado");
                document.getElementById("reservarHobbiton").removeAttribute('href');
                break;

            case "isengard":
                nombre = isengard.nombre;
                precio = isengard.precio;
                isengard.reservar()
                document.getElementById("reservarIsengard").innerHTML = `¡Agotado!`;
                document.getElementById("reservarIsengard").classList.add("agotado");
                document.getElementById("reservarIsengard").removeAttribute('href');
                break;

            case "moria":
                nombre = moria.nombre;
                precio = moria.precio;
                moria.reservar()
                document.getElementById("reservarMoria").innerHTML = `¡Agotado!`;
                document.getElementById("reservarMoria").classList.add("agotado");
                document.getElementById("reservarMoria").removeAttribute('href');
                break;

            case "mordor":
                nombre = mordor.nombre;
                precio = mordor.precio;
                mordor.reservar()
                document.getElementById("reservarMordor").innerHTML = `¡Agotado!`;
                document.getElementById("reservarMordor").classList.add("agotado");
                document.getElementById("reservarMordor").removeAttribute('href');
                break;
        }
        

        return new Habitacion(nombre, precio, noches, libre)
}


// FUNCION PARA VALIDAR EL ALOJAMIENTO Y NOCHES INGRESADAS
function validarNoches(){
   
    if ($("#noches").val() <= 0) {
        alert("La cantidad de noches debe ser mayor a 0");
        $("#noches").focus();
        return false;
    } else if ($("#alojamiento").val() == "empty") {
        alert("Seleccione su alojamiento");
        $("#noches").focus();
        return false;

    } else

    return true;
}



// EVENTO RESERVA
$(document).ready(function() { 


    // SELECCIONAR ALOJAMIENTO
    $("#submit").click(function (e) { 

        e.preventDefault();

        const reserva = reservarHabitacion();

        if(validarNoches()){ 

            reserva.calcularSubTotal();
            reserva.calcularIva();
            reserva.calcularTotal();

            
            /*  LOCALSTORAGE  */
            localStorage.setItem('reservaRealizada', JSON.stringify(reserva));


            // MUESTRA LA VENTANA MODAL DE CONFIRMACION
            $("#modal").fadeIn();


            /* FUNCION PARA MOSTRAR EL RESULTADO */
            function mostrarReserva() {

                $("#resultado").html(
                `Alojamiento: <b>${reserva.nombre}</b>
                <br><br>
                Cantidad de noches: <b>${reserva.noches}</b>
                <br><br>

                <b>Subtotal:</b><br>
                $${reserva.precio} x ${reserva.noches} noche/s = $${(reserva.precio * reserva.noches)}<br>
                + IVA 21% =  $${reserva.calcularIva()}
                <br><br><br><br><br><br><br><br><br><br><br><br>

                <h3>Total final:
                <br>$${reserva.total}</h3><br><br>
                `);
            }

            mostrarReserva()
            

            // RESETEA EL FORMULARIO
            $('#form')[0].reset();
        }

    });


    // CONFIRMAR PAGO
    $("#tarjeta").submit(function (e) { 
        
        e.preventDefault();

        $("#main2").html(`
        <p>¡Su reserva ha sido realizada con éxito! <br>
        ¡Que tenga una estadía de fantasía!</p>
        <a href="" id="si">volver</a>
        `);

        $("#modal2").fadeIn();  // VIENE EL NUEVO MODAL DE CONFIRMACION


        $("#si").click(function (e) { 
            e.preventDefault();
            
            $("#modal2").fadeOut("fast"); //SE VA EL MODAL AL CLICKEAR

            $("#modal").hide(); // SE VA EL MODAL ANTERIOR DE PAGO
        });


        localStorage.clear(); // LIMPIA EL LOCAR STORAGE
    
    });


    // CONTINUA EL PAGO SI EL USUARIO DEJA EL FORMULARIO A LA MITAD
    if (localStorage.length > 0) {

        let reservaRealizada = JSON.parse(localStorage.getItem('reservaRealizada'));
        
        let reserva = new Habitacion (reservaRealizada.nombre, reservaRealizada.precio, reservaRealizada.noches, reservaRealizada.libre, reservaRealizada.subTotal, reservaRealizada.total);


        // VIENE EL NUEVO MODAL PARA CONFIRMAR SI EL USUARIO QUIERE CONTINUAR
        $("#main2").html(`
        <p>El ojo que todo lo ve dice que usted ya comenzó a realizar una reserva. ¿Desea continuarla?</p>
        <div>
            <a href="" id="si">Sí</a>
            <a href="" id="no">No</a>
        </div>
        `);

        $("#modal2").fadeIn();

        // SI DICE QUE SÍ
        $("#si").click(function (e) { 
            e.preventDefault();

            $("#modal2").fadeOut("fast");

            // MUESTRA LA VENTANA MODAL DE CONFIRMACION
            $("#modal").fadeIn();

            /* FUNCION PARA MOSTRAR EL RESULTADO */
            function mostrarReserva() {

                $("#resultado").html(
                `Alojamiento: <b>${reserva.nombre}</b>
                <br><br>
                Cantidad de noches: <b>${reserva.noches}</b>
                <br><br>

                <b>Subtotal:</b><br>
                $${reserva.precio} x ${reserva.noches} noches = $${(reserva.precio * reserva.noches)}<br>
                + IVA 21% =  $${reserva.calcularIva()}
                <br><br><br><br><br><br><br><br><br><br><br><br>

                <h3>Total final:
                <br>$${reserva.total}</h3><br><br>
                `);
            }

            mostrarReserva()

        });

        // SI DICE QUE NO
        $("#no").click(function (e) { 
            e.preventDefault();
            
            $("#modal2").hide(); //SE CIERRA EL MODAL

            localStorage.clear();  //SE LIMPIA EL STORAGE

        });

    }
    

    // BOTON X PARA CANCELAR
    $("#cancelar").click(function (e) { 
        
        e.preventDefault();

        $("#modal").hide();

        localStorage.clear();
    
    });
    
});
