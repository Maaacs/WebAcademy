let username = 'Max'
console.log(username)
let a: number = 1
let b: string = '6'
let c: number = 2
console.log(a + b)

// Arrays
let stringArr: string [] = ["one", "two"]
stringArr[2] = "three"
console.log(stringArr[1])
console.log(stringArr[2])

// Tuplas
let myTuple: [string, number, boolean] = ["LesPaul", 54, true]
let mixed = ["Jhon", 1, false]
myTuple[1] = 42
console.log(myTuple)

// Objetos 
let myObj: object // instancia de uma estrutura na memória
myObj = [] // array vazio que singifica que o array aceita qualquer coisa e as primeiroas coisas definirão o tipo dele
console.log(typeof myObj)
myObj = {}; //dicionario