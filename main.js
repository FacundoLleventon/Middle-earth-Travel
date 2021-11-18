let nombre = 0;
let precio = 0;
let noches = 0;
let libre = true


// OBJETO HABITACION
class Habitacion {
    constructor(nombre, precio, noches, libre, subTotal, total){
        this.nombre = nombre
        this.precio = precio
        this.noches = noches;
        this.libre = libre;
        this.subTotal = subTotal;
        this.total = total;
    }

    calcularSubTotal() {
        this.subTotal = this.precio * this.noches;
    }

    calcularIva() {
        return this.subTotal * 0.21;
    }

    calcularTotal() {
        this.total = this.subTotal + this.calcularIva();
    }

    reservar() {
        this.libre = false;
    }

}


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
                break;

            case "isengard":
                nombre = isengard.nombre;
                precio = isengard.precio;
                isengard.reservar()
                document.getElementById("reservarIsengard").innerHTML = `¡Agotado!`;
                document.getElementById("reservarIsengard").classList.add("agotado");
                break;

            case "moria":
                nombre = moria.nombre;
                precio = moria.precio;
                moria.reservar()
                document.getElementById("reservarMoria").innerHTML = `¡Agotado!`;
                document.getElementById("reservarMoria").classList.add("agotado");
                break;

            case "mordor":
                nombre = mordor.nombre;
                precio = mordor.precio;
                mordor.reservar()
                document.getElementById("reservarMordor").innerHTML = `¡Agotado!`;
                document.getElementById("reservarMordor").classList.add("agotado");
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
                $${reserva.precio} x ${reserva.noches} noches = $${(reserva.precio * reserva.noches)}<br>
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

        alert(`¡Su reserva a ha sido realizada con éxito!\n
        ¡Que tenga una estadía de fantasía!`);

        $("#modal").hide();

        localStorage.clear();
    
    });


    // CONTINUA EL PAGO SI EL USUARIO DEJA EL FORMULARIO A LA MITAD
    if (localStorage.length > 0) {

        let reservaRealizada = JSON.parse(localStorage.getItem('reservaRealizada'));
        
        let reserva = new Habitacion (reservaRealizada.nombre, reservaRealizada.precio, reservaRealizada.noches, reservaRealizada.libre, reservaRealizada.subTotal, reservaRealizada.total);

        
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

    }

    // BOTON X PARA CANCELAR
    $("#cancelar").click(function (e) { 
        
        e.preventDefault();

        $("#modal").hide();

        localStorage.clear();
    
    });
    
});
