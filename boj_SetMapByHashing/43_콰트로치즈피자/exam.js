const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const [[N], TOPPINGS] = stdin.split('\n').map(item => item.trim().split(' '));

// -------------
// 풀이
// -------------
function solution(n, toppings) {
  const pizza = new Set();
  for (const topping of toppings) {
    if (!/Cheese$/.test(topping)) continue;
    pizza.add(topping);
  }

  if (pizza.size >= 4) return "yummy";
  return "sad";
}

// -------------
// 출력
// -------------
const result = solution(N, TOPPINGS);
console.log(result);