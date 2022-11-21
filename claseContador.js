class Counter {
    constructor(responsible){
        this.responsible=responsible
        this.countLocal=0
    }

    static countGlobal = 0

    getResponsible = ()=>{
        return this.responsible
    }

    count =()=>{
        this.countLocal ++
        Counter.countGlobal ++  
        
    }

    getCountLocal =()=> {return this.countLocal}
    getCountGlobal =()=> {return this.countGlobal}


}

//crear instancia 

const Ezequiel = new Counter("Ezequiel");
const Priscila = new Counter("Priscila");
const Faby = new Counter("Faby");

Ezequiel.count()
Priscila.count()
Faby.count()
Priscila.count()
Priscila.count()
Priscila.count()
Faby.count()
Ezequiel.count()
Ezequiel.count()

console.log(`${Ezequiel.getResponsible()}:${Ezequiel.getCountLocal()}`)
console.log(`${Priscila.getResponsible()}:${Priscila.getCountLocal()}`)
console.log(`${Faby.getResponsible()}:${Faby.getCountLocal()}`)

console.log(`${Counter.countGlobal}`)