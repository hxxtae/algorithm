// 1.
const solution1 = (n) => parseInt(n.toString(3).split('').reverse().join(''), 3);

// 2.
const solution2 = (n) => parseInt([...n.toString(3)].reverse().join(''), 3);
