const fs = require("fs")

fs.promises.readFile("package.json", "utf-8")
.then( (contenido)=>{
    const info= {
        info:(contenido),
        infoObject: JSON.parse(contenido),
        size: contenido.length
    }
    console.log(info.infoObject)

})