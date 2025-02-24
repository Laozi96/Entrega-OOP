class Reserva{
    constructor(IDUnico, IDCliente, status, checkIn, checkOut){
        this.IDUnico = IDUnico;
        this.IDCliente = IDCliente;
        this.status = status;
        this.checkIn = checkIn;
        this.checkOut = checkOut;
    }
}
export default Reserva;