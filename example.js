const nayuta = require('./nayuta.js')

let a = nayuta("13458734583457348953534.4647566348577385")
let b = nayuta("5675674583423455664566344.4567435274247823748723456478567823468723567823648725678256782467823748")
let c = nayuta("8485765237457634256683475267856873245768353.523457238458236472837467831264872346278342")


let s = null
console.log(s === null)
//Cannot read property 'Symbol(===)' of null

console.log(String(a * b % c))
