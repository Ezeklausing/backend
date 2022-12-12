
const moment = require("moment")

const today = moment()

const fechaNacimiento = moment("21--03--1992", "DD--MM--YYYY")

const ezequiel = today.diff(fechaNacimiento, "days")
const result = console.log(`Desde mi nacimiento han pasado ${ezequiel} dias.`)
console.log(fechaNacimiento)
