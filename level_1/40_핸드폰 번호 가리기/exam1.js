// 풀이 1. splice
function solution1(phone_number) {
  const arr = [...phone_number];
  arr.splice(0, (arr.length - 4), "*".repeat(arr.length - 4));
  return arr.join('');
}

// 풀이 2. slice
function solution2(phone_number) {
  const arr = [...phone_number],
        len = arr.length;
  return `${'*'.repeat(len - 4)}${arr.slice(len - 4).join('')}`;
}

// 풀이 3. RegExp
function solution3(phone_number) {
  return phone_number.replace(/\d(?=\d{4})/g, '*');
}