// Ejercicio 1
function promedios(arreglo) {
  let sum = 0;
  for (num of arreglo) {
    sum += num;
  }
  let promedio = sum / arreglo.length;
  return promedio;
}

console.log(promedios([5, 7, 10]));

// Ejercicio 2
const fs = require("fs");

function escribirArchivo(texto) {
  fs.writeFile("file.txt", texto, (error) => {
    if (error) {
      console.error("Error al escribir el archivo:", error);
      return;
    }
    console.log("Archivo escrito correctamente.");
  });
}

escribirArchivo("Esta es una prueba, espero que funcione");

// Ejercicio 3 (TwoSum)
function twoSum(nums, target) {
  const mapa = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complemento = target - nums[i];

    if (mapa.has(complemento)) {
      return [mapa.get(complemento), i];
    }

    mapa.set(nums[i], i);
  }
}

console.log(twoSum([2, 7, 11, 15], 9));
