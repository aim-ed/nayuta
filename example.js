const box = require('./nayuta')

let result = box({
    code: function(number, args) {
        return ((a * b) ^ c) % d
    },

    a: '34563457823457238472364782346872364723467847523.2345234782746723482687',
    b: '458357384573845792347239472394723847293847289347',
    c: '3',
    d: '5',
})

console.log(result)
