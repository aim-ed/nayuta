const overload = require('operator-overloading')
const number = require('big.js')

let Nayuta = (value) => new NayutaClass(value)

class NayutaClass {
    constructor(value) {
        this.value = number(value)
    }

    __plus(leftOperand) { // +
        if (typeof leftOperand.value != 'undefined')
            return Nayuta(leftOperand.value.plus(this.value))
        return Nayuta(number(leftOperand).plus(this.value))
    }

    __minus(leftOperand) { // -
        if (typeof leftOperand.value != 'undefined')
            return Nayuta(leftOperand.value.minus(this.value))
        return Nayuta(number(leftOperand).minus(this.value))
    }

    __multiply(leftOperand) { // *
        if (typeof leftOperand.value != 'undefined')
            return Nayuta(leftOperand.value.mul(this.value))
        return Nayuta(number(leftOperand).mul(this.value))
    }

    __divide(leftOperand) { // /
        if (typeof leftOperand.value != 'undefined')
            return Nayuta(leftOperand.value.div(this.value))
        return Nayuta(number(leftOperand).div(this.value))
    }

    __modulus(leftOperand) { // /
        if (typeof leftOperand.value != 'undefined')
            return Nayuta(leftOperand.value.mod(this.value))
        return Nayuta(number(leftOperand).mod(this.value))
    }

    __bitwiseXOR(leftOperand) { // ^
        if (typeof leftOperand.value != 'undefined')
            return Nayuta(leftOperand.value.pow(Number(this.value)))
        return Nayuta(number(leftOperand).pow(Number(this.value)))
    }

    __addAssign(leftOperand) { // +=
        this.value = this.value.plus(leftOperand.value)
        return this
    }

    __minusAssign(leftOperand) { // -=
        this.value = this.value.minus(leftOperand.value)
        return this
    }

    __multiplyAssign(leftOperand) { // *=
        this.value = this.value.mul(leftOperand.value)
        return this
    }

    __divideAssign(leftOperand) { // /=
        this.value = this.value.div(leftOperand.value)
        return this
    }

    __modulusAssign(leftOperand) { // /=
        this.value = this.value.mod(leftOperand.value)
        return this
    }

    __xorAssign(leftOperand) { // ^=
        this.value = this.value.pow(Number(leftOperand.value))
        return this
    }

    __greaterThan(leftOperand) { // >
        return leftOperand.value.gt(this.value)
    }

    __greaterThanEqual(leftOperand) { // >=
        return leftOperand.value.gte(this.value)
    }

    __lessThan(leftOperand) { // <
        return leftOperand.value.lt(this.value)
    }

    __lessThanEqual(leftOperand) { // <=
        return leftOperand.value.lte(this.value)
    }

    __doubleEqual(leftOperand) { // ==
        return leftOperand.value.eq(this.value)
    }

    __notEqual(leftOperand) { // !=
        return !leftOperand.value.eq(this.value)
    }

    __tripleEqual(leftOperand) { // ===
        if (typeof leftOperand.value == 'undefined') return false
        return leftOperand.value.eq(this.value)
    }

    __notDoubleEqual(leftOperand) { // !==
        if (typeof leftOperand.value == 'undefined') return true
        return !leftOperand.value.eq(this.value)
    }

    __increment(some) { // ++
        this.value = this.value.plus(1)
        return this
    }

    __decrement() { // --
        this.value = this.value.minus(1)
        return this
    }

    __unaryNOT() { // ! factorial
        let result = Nayuta('1')
        for (let index = Nayuta(this.value); index.__lessThan(Nayuta('0')); index.__decrement())
            result.__multiplyAssign(index)
        return result
    }

    abs() {
        return Nayuta(this.value.abs())
    }

    sqrt() {
        return Nayuta(this.value.sqrt())
    }

    pow(value) {
        return Nayuta(this.value.pow(value))
    }

    times(value) {
        return Nayuta(this.value.times(value))
    }

    round(value) {
        return Nayuta(this.value.round(value))
    }

    toString() {
        return String(this.value)
    }

    toNumber() {
        return Number(this.value)
    }

    toExponential(value) {
        return this.value.toExponential(value)
    }

    toFixed(value) {
        return this.value.toFixed(value)
    }

    toPrecision(value) {
        return this.value.toPrecision(value)
    }
}

module.exports = (args) => {
    // Convert string -> box
    // Load global variable
    for (let index in args) {
        if (index == 'code') continue

        let arg = args[index]
        if (typeof arg == 'string') arg = Nayuta(arg)

        if (typeof global[index] != 'undefined')
            throw new Error('[box] Global variable collision:' + index)

        global[index] = arg
    }

    let result = overload(args.code)(Nayuta, args)

    // Unload global variable
    for (let index in args) {
        if (index == 'code') continue

        if (typeof global[index] == 'undefined') continue
        delete global[index]
    }

    // Return type is always string
    return (result instanceof NayutaClass) ? result.toString() : result
}
