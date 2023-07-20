function solution(input_string) {
  const result = [];
  const len = input_string.length;
  const map = new Map(Array.from({length: len}, (_, i) => [input_string[i], []]));
  for(let i = 0; i < len; i++) {
    const chr = input_string[i];
    map.get(chr).push(1);
    while(input_string[i] === input_string[i+1]) {
      map.get(chr)[map.get(chr).length-1] += 1;
      i++;
    }
  }
  for(let [alpha, arr] of map) 
    arr.length > 1 && result.push(alpha);
  return result.length > 0 ? result.sort().join('') : 'N';
}

// NOTE: 문제 구현 능력

// [접근]
// Map -> key, value
// n알파벳 : [연속된 n알파벳의 길이, ..]

// ee
// [2]

// e
// [1]

// eeed
// [3]

// ede
// [1, 1]

// eedee
// [2, 2]