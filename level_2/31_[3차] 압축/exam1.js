function solution(msg) {
  const aToz = Array
    .from({length: 26}, (v, i) => String.fromCharCode(65 + i))
    .map((c, i) => [c, i + 1]);
  const map = new Map(aToz);
  const stack = [];
  let strSum = '';
  for(let i = 0, len = msg.length; i < len; i++) {
    const char = msg[i];
    strSum += char;
    if(!map.get(strSum)) { // 해시 -> 무
      stack.push(map.get(strSum.slice(0, -1)));
      map.set(strSum, map.size + 1);
      strSum = '';
      i--;
    } else { // 해시 -> 유
      if(i + 1 === len) stack.push(map.get(strSum));
      else continue;
    }
  }
  return stack;
}

// NOTE: 탐색 / 해시

// [접근]
// 해시로 A ~ Z 까지 1 ~ 26 할당
// 루프를 돌면서 주어진 문자열에 맞는 사전 색인 번호 stack에 추가

// 조건1: 포인터를 두고, 포인터를 다음 index 즉, 
//   다음 문자열과 합하여 해시에 존재하는 문자열 색인 번호 유무 확인
//   유: 다음 루프의 문자열과 합하여 해시 확인
//   무: 이전 합한 문자열 까지 해시에 존재하는 문자열 색인 번호 stack에 추가
//       - 포인터 이전으로 되돌리기
//       - 합한 문자열 초기화

// 조건2: 다음 포인터가 없을 시(마지막 루프)
//   현재 문자열까지 해시에 존재하는 문자열 색인 번호 stack에 추가 후 루프 종료