function solution(s) {
  const arr = [...s];
  let count = 0;
  for(let i = 0, len = s.length; i < len; i++) {
    const symmetry = []; // 대칭 여부 확인
    let sum = 0; // 대칭 합 확인
    for(let str of arr) {
      if(']' === str || '}' === str || ')' === str) {
        sum -= 1;
        const prevStr = symmetry.at(-1);
        if(prevStr === '[' && str === ']') symmetry.pop();
        else if(prevStr === '{' && str === '}') symmetry.pop();
        else if(prevStr === '(' && str === ')') symmetry.pop();
        else break;
      } else {
        sum += 1;
        symmetry.push(str);
      }
    }
    arr.push(arr.shift());
    symmetry.length === 0 && sum === 0 && count++;
  }
  return count;
}

// NOTE: 스택 / 힙
