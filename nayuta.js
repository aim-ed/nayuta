//const overload = require('operator-overloading')
const number = require('big.js')

let nayuta = (value) => new NayutaClass(value)

class NayutaClass {
    constructor(value) {
        this.value = number(value)
    }

    [Symbol.for('+')](rightOperand) {
        if (typeof rightOperand.value != 'undefined')
            return nayuta(this.value.plus(rightOperand.value))
        return nayuta(this.value.plus(number(rightOperand)))
    }

    [Symbol.for('-')](rightOperand) {
        if (typeof rightOperand.value != 'undefined')
            return nayuta(this.value.minus(rightOperand.value))
        return nayuta(this.value.minus(number(rightOperand)))
    }

    [Symbol.for('*')](rightOperand) {
        if (typeof rightOperand.value != 'undefined')
            return nayuta(this.value.mul(rightOperand.value))
        return nayuta(this.value.mul(number(rightOperand)))
    }

    [Symbol.for('/')](rightOperand) {
        if (typeof rightOperand.value != 'undefined')
            return nayuta(this.value.div(rightOperand.value))
        return nayuta(this.value.div(number(rightOperand)))
    }

    [Symbol.for('%')](rightOperand) {
        if (typeof rightOperand.value != 'undefined')
            return nayuta(this.value.mod(rightOperand.value))
        return nayuta(this.value.mod(number(rightOperand)))
    }

    [Symbol.for('**')](rightOperand) {
        if (typeof rightOperand.value != 'undefined')
            return nayuta(this.value.pow(Number(rightOperand.value)))
        return nayuta(this.value.pow(Number(rightOperand)))
    }

    [Symbol.for('+=')](rightOperand) {
        this.value = rightOperand.plus(this.value)
        return this
    }

    [Symbol.for('-=')](rightOperand) {
        this.value = rightOperand.minus(this.value)
        return this
    }

    [Symbol.for('*=')](rightOperand) {
        this.value = rightOperand.mul(this.value)
        return this
    }

    [Symbol.for('/=')](rightOperand) {
        this.value = rightOperand.div(this.value)
        return this
    }

    [Symbol.for('%=')](rightOperand) {
        this.value = rightOperand.mod(this.value)
        return this
    }

    [Symbol.for('^=')](rightOperand) {
        this.value = rightOperand.pow(Number(this.value))
        return this
    }

    [Symbol.for('>')](rightOperand) { // >
        return this.value.gt(rightOperand.value)
    }

    [Symbol.for('>=')](rightOperand) { // >=
        return this.value.gte(rightOperand.value)
    }

    [Symbol.for('<')](rightOperand) { // <
        return this.value.lt(rightOperand.value)
    }

    [Symbol.for('<=')](rightOperand) { // <=
        return this.value.lte(rightOperand.value)
    }

    [Symbol.for('==')](rightOperand) { // ==
        return this.value.eq(rightOperand.value)
    }

    [Symbol.for('!=')](rightOperand) { // !=
        return !this.value.eq(rightOperand.value)
    }

    [Symbol.for('===')](rightOperand) { // ===
        if (typeof rightOperand.value == 'undefined') return false
        return this.value.eq(rightOperand.value)
    }

    [Symbol.for('!==')](rightOperand) { // !==
        if (typeof rightOperand.value == 'undefined') return false
        return !this.value.eq(rightOperand.value)
    }

    abs() {
        return nayuta(this.value.abs())
    }

    sqrt() {
        return nayuta(this.value.sqrt())
    }

    pow(value) {
        return nayuta(this.value.pow(value))
    }

    times(value) {
        return nayuta(this.value.times(value))
    }

    round(value) {
        return nayuta(this.value.round(value))
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

module.exports = nayuta