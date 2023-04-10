function solution(name) {
  const left_data = Array.from({length: 13}, (v, i) => [String.fromCharCode(i + 65), i]);
  const right_data = Array.from({length: 13}, (v, i) => [String.fromCharCode(90 - i), i+1]).reverse();
  const map = new Map([...left_data, ...right_data]);
  const len = name.length;
  let upNDown = 0;
  let leftNright = len - 1;
  let idxA = 0;
  
  for(let i = 0; i < len; i++){
    // 위아래 고정 값
    upNDown = [...name].reduce((prev, curr) => prev + map.get(curr), 0);
    
    // A_index 기억하기
    idxA = i;
    while(name[idxA] === "A") idxA += 1;

    // 앞으로 가는 경우
    if(i === 0) leftNright = Math.min(len-idxA, leftNright);
    else leftNright = Math.min((2 * (i - 1) + len-idxA), leftNright);

    // 뒤로 가는 경우
    if(i !== 0) leftNright = Math.min(leftNright, (i - 1 + (len-idxA) * 2));
  }
  return upNDown + leftNright;
}

// [접근]
// 왼쪽, 오른쪽의 위치를 살펴보면서 최소 거리만 충족시킨다.

// 어려움...