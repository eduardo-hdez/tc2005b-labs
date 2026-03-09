function assert(condition, message) {
  console.assert(condition, message);
  const result = condition ? "PASS" : "FAIL";
  document.write(`<p>[${result}] ${message}</p>`);
}

// Ejercicio 1
let num = parseInt(prompt("Introduce un número:"));

if (!isNaN(num) && num > 0) {
  document.write("<h2>Ejercicio 1</h2>");
  document.write("<table>");
  document.write("<tr><th>Número</th><th>Cuadrado</th><th>Cubo</th></tr>");

  for (let i = 1; i <= num; i++) {
    document.write("<tr>");
    document.write("<td>" + i + "</td>");
    document.write("<td>" + i * i + "</td>");
    document.write("<td>" + i * i * i + "</td>");
    document.write("</tr>");
  }

  document.write("</table>");
} else {
  document.write("Entrada inválida.");
}

// Ejercicio 2
let randomSum = Math.floor(Math.random()) + Math.floor(Math.random());

let numberGuess = parseInt(
  prompt("Introduce el resultado de la suma de dos números:"),
);

if (numberGuess == randomSum) {
  document.write("<h2>Ejercicio 2</h2>");
  document.write("¡Adivinaste el número!");
} else {
  document.write("<h2>Ejercicio 2</h2>");
  document.write("¡Incorrecto!");
}

// Ejercicio 3
function contador(arreglo) {
  let negativos = 0;
  let ceros = 0;
  let positivos = 0;

  for (num of arreglo) {
    if (num < 0) {
      negativos++;
    } else if (num === 0) {
      ceros++;
    } else {
      positivos++;
    }
  }

  return { negativos, ceros, positivos };
}

document.write("<h2>Ejercicio 3</h2>");
const resContador = contador([0, 0, -3, -2, -15, 2]);
document.write(
  `<p>Negativos: ${resContador.negativos}, Ceros: ${resContador.ceros}, Positivos: ${resContador.positivos}</p>`,
);

assert(contador([0, 0, -3, -2, -15, 2]).negativos === 3, "contador: negativos debe ser 3");
assert(contador([0, 0, -3, -2, -15, 2]).ceros === 2, "contador: ceros debe ser 2");
assert(contador([0, 0, -3, -2, -15, 2]).positivos === 1, "contador: positivos debe ser 1");
assert(contador([1, 2, 3]).negativos === 0, "contador: sin negativos");
assert(contador([]).ceros === 0, "contador: arreglo vacío");

// Ejercicio 4
function promedios(arreglo) {
  const promediosArreglo = [];
  for (fila of arreglo) {
    let suma = 0;
    for (num of fila) {
      suma += num;
    }
    const promedioFila = suma / fila.length;
    promediosArreglo.push(promedioFila);
  }
  return promediosArreglo;
}

document.write("<h2>Ejercicio 4</h2>");
const resPromedios = promedios([
  [10, 20, 30],
  [5, 5],
  [100, 200],
]);
document.write(`<p>Promedios: ${resPromedios.join(", ")}</p>`);

assert(promedios([[10, 20, 30]])[0] === 20, "promedios: promedio de [10,20,30] debe ser 20");
assert(promedios([[5, 5]])[0] === 5, "promedios: promedio de [5,5] debe ser 5");
assert(promedios([[100, 200]])[0] === 150, "promedios: promedio de [100,200] debe ser 150");
assert(promedios([[10, 20, 30], [5, 5]]).length === 2, "promedios: debe retornar 2 promedios");

// Ejercicio 5
function inverso(num) {
  let numStr = num.toString();
  let numInverso = "";

  let der = numStr.length - 1;

  while (der >= 0) {
    numInverso += numStr[der];
    der--;
  }

  return Number(numInverso);
}

document.write("<h2>Ejercicio 5</h2>");
document.write(`<p>El inverso de 12345 es: ${inverso(12345)}</p>`);

assert(inverso(12345) === 54321, "inverso: 12345 debe ser 54321");
assert(inverso(100) === 1, "inverso: 100 debe ser 1");
assert(inverso(7) === 7, "inverso: número de un dígito debe ser igual");
assert(inverso(1001) === 1001, "inverso: 1001 debe ser 1001");

// Ejercicio 6 (TwoSum)
class twoSumSolver {
  constructor(numbers) {
    this.numbers = numbers;
    this.lastResult = null;
  }

  findPair(target) {
    const hashMap = {};

    for (let i = 0; i < this.numbers.length; i++) {
      const complement = target - this.numbers[i];

      if (hashMap.hasOwnProperty(complement)) {
        this.lastResult = [hashMap[complement], i];
        return this.lastResult;
      }

      hashMap[this.numbers[i]] = i;
    }

    this.lastResult = null;
    return null;
  }

  getResultMessage() {
    if (this.lastResult) {
      return `Índices encontrados: ${this.lastResult[0]} y ${this.lastResult[1]}`;
    } else {
      return "No se encontró ninguna pareja que sume el target.";
    }
  }
}

document.write("<h2>Ejercicio 6</h2>");
document.write(
  "<p>Dado un arreglo de números enteros y un número objetivo (<em>target</em>), encuentra los índices de los dos números que suman exactamente el target.</p>",
);
document.write(
  "<p>Ejemplo: <code>nums = [2, 7, 11, 15]</code>, <code>target = 9</code> → <code>[0, 1]</code> porque <code>2 + 7 = 9</code>.</p>",
);
document.write(
  "<p>Suposiciones: cada entrada tiene exactamente una solución y no se puede usar el mismo elemento dos veces.</p>",
);
const solver = new twoSumSolver([2, 7, 11, 15]);
solver.findPair(9);
document.write(`<p>${solver.getResultMessage()}</p>`);

const s1 = new twoSumSolver([2, 7, 11, 15]);
assert(JSON.stringify(s1.findPair(9)) === JSON.stringify([0, 1]), "twoSum: [2,7,11,15] target 9 → [0,1]");

const s2 = new twoSumSolver([3, 2, 4]);
assert(JSON.stringify(s2.findPair(6)) === JSON.stringify([1, 2]), "twoSum: [3,2,4] target 6 → [1,2]");

const s3 = new twoSumSolver([1, 2, 3]);
assert(s3.findPair(10) === null, "twoSum: sin solución debe retornar null");

const s4 = new twoSumSolver([3, 3]);
assert(JSON.stringify(s4.findPair(6)) === JSON.stringify([0, 1]), "twoSum: [3,3] target 6 → [0,1]");
