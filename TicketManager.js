class TicketManager {

    #precioBaseDeGanancia

    constructor(){
        this.events =[]
        this.#precioBaseDeGanancia = 0.15

    }

    getEvents =()=>{
        return this.events
    }
    
    getNextId= ()=>{
        const count=this.events.lenght
        const NextId = (count > 0) ? this.events[count-1].id + 1 : 1;

        return NextId
    }

    

    addEvent = (name, place, price, capacidad= 50, fecha= new Date().toLocaleDateString())=>{
        const event ={
            id: this.getNextId(),
            name,
            place, 
            price: price + this.#precioBaseDeGanancia,
            capacidad: capacidad ?? 50,
            fecha: fecha ?? new Date().toLocaleDateString(),
        }

        this.events.push(event)

    }
}