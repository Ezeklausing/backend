
const object= {}


for (let i = 0; i < 10000; i++) {
    const a = parseInt(Math.random()*20)
    if (!object[a]){object[a]= 1}
    else{object[a]++} 
}
console.log(object)