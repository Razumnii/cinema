/*
const user = {
	name: 'Sergey',
	surename: 'Razumnii',
	age: undefined,
}

// если страше 18 то на вы здравствуйте, младше 18 привет
const str = `${user.name} ${user.surename}`
let result
if (user.age >= 18 && user.age <= 100) {
	result = `Здравствуйте ${str}`
}
if (user.age <= 18) {
	result = `Привет ${str}`
}
if (user.age > 100) {
	result = `Вам пора на покой`
}
if (!result) {
	result = `Возраст неопередёлен`
}

console.log(result)
*/
// перебрать объект.

const car = {
	name: 'Zaz',
	model: "lada",
	distance: 0,
	price: 0
}

for (let key in car) {
	console.log(key + ":" + car[key])
}

let phones = {
	'7': 'Russia',
	'49': 'Deutschland',
	'13': 'Sweden',
	'1': 'Belarus'
}

for (let code in phones) {
	console.log(code)
}

// console.log(car)

