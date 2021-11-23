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