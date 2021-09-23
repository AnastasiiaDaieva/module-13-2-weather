import 'regenerator-runtime/runtime.js'
import './styles/style.css'
import './styles/styles.scss'

// import './js/notification'

import './js/weatherWidget'

// Kahoot 1
// 3
// const somePromise = new Promise(r => r(`hello`))
// const resolveData = ()=>{
//     console.log(await somePromise)
// }
// resolveData()
// console.log(`world`) // Error - потому что нет async

// 4
// const getData = async () => {
//   console.log(`hello`)
// }
// getData()
// console.log(`world`) // hello world - без await

// 5
// const somePromise = new Promise(r => r(`hello`))
// const resolveData = async () => {
//   console.log(await somePromise())
// }
// resolveData() // Error - потому что somePromise не функция
// console.log(`world`)

// 6
// const somePromise = new Promise(r => r(`hello`))
// const resolveData = async () => {
//   console.log(await somePromise)
// }
// resolveData()
// console.log(`world`) // world hello - сначала синхронный, потом экземпляр асинхронного промиса

// 7
// const somePromise = new Promise(r => r(`hello`))
// const resolveData = async () => {
//   console.log(await somePromise)
// }
// console.log(`world`) // world hello - сначала синхронный, потом экземпляр асинхронного промиса
// resolveData()

// 8
// const somePromise = new Promise(r => r(`hello`))
// const resolveData = async () => {
//   return await somePromise
// }
// console.log(resolveData()) // экземпляр промиса

// Kahoot 2
// 3
// async function f() {
//   await Promise.reject(`reject`)
//   return `ok`
// }

// f().catch(console.log) // reject - потому что вызов метода reject обрабатывается в catch

// 4
// async function f() {
//   await Promise.reject(`reject`)
//   return `ok`
// }

// f().then(console.log).catch(console.log) // reject - потому что вызов метода reject обрабатывается в catch

// 5
// async function f() {
//   throw new Error(`oops`)
// }
// f()
//   .then(() => console.log(`resolve`))
//   .catch(console.log)

// 6
// class Thenable {
//   constructor(num) {
//     this.num = num
//   }
//   then(res, rej) {
//     setTimeout(() => res(this.num * 2), 1000)
//     return 0
//   }
// }
// async function f() {
//   let result = await new Thenable(11)
//   console.log(result)
// }
// f()
