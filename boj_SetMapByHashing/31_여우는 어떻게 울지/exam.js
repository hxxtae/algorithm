const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력 & 출력
// -------------
const input = stdin.split('\n').map(item => item.trim());
const T = +input[0];
for (let test = 0, idx = 1; test < T; test++) {
  const soundList = input[idx++].split(' ');
  const soundSet = new Set();
  while (input[idx] !== "what does the fox say?") {
    const [_animal, _, sound] = input[idx++].split(' ');
    soundSet.add(sound);
  }
  idx++;
  const result = solution(soundList, soundSet);
  console.log(result);
}

// -------------
// 풀이
// -------------
function solution(soundList, soundSet) {
  const foxSound = [];
  soundList.forEach((sound) => !soundSet.has(sound) && foxSound.push(sound));

  return foxSound.join(' ');
}
