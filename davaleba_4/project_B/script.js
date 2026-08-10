const temperature = 28;
const kilometers = 10.5;

const fahrenheit = (temperature * 9) / 5+32;
const kelvin = temperature + 273.15;
const miles = kilometers * 0.621371;
const meters = kilometers * 1000;

console.log(`${fahrenheit.toFixed(1)}°F`);
console.log(`${kelvin.toFixed(1)}K`)
console.log(`${miles.toFixed(1)}mi`)
console.log(`${meters.toFixed(1)}m`)