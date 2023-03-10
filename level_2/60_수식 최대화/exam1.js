function solution(expression) {
  const operState = [['+', 0], ['-', 0], ['*', 0]];
  const operArr = [];
  const len = 3;
  let maxNum = 0;
  const expressionResult = (deep) => {
    if(deep === len) {
      const sumNum = expressionLoop(expression, operArr);
      maxNum = Math.max(maxNum, Math.abs(sumNum));
      return;
    }
    for(let i = 0; i < len; i++) {
      let [op, state] = operState[i];
      if(state) continue;
      operState[i][1] = 1;
          
      operArr.push(op);
      expressionResult(deep + 1);
      operArr.pop();
          
      operState[i][1] = 0;
    }
  }
  expressionResult(0);
  return maxNum;
}

function expressionLoop(exp, operArr) {
  const map = new Map();
  const mapKey = new Map([['+', 'a'], ['-', 'b'], ['*', 'c']]);
  for(const op of operArr) {
    exp = operationResult(exp, op, map, mapKey);
  }
  return +map.get(exp);
}

function operationResult(exp, op, map, mapKey) {
  const reg = new RegExp(`\\w+[${op}]\\w+`);
  let count = 1;
  while(1) {
    const key = mapKey.get(op) + count++;
    const matchNum = reg.exec(exp);
    if(matchNum == null) return exp;
      
    let [num1, num2] = matchNum.join('').split(op);
    num1 = map.get(num1) || num1;
    num2 = map.get(num2) || num2;
    map.set(key, operationFunc(num1, num2, op).toString());
    exp = exp.replace(reg, key);
  }
  return exp;
}

function operationFunc(num1, num2, op) {
  if(op === '+') return +num1 + +num2;
  if(op === '-') return +num1 - +num2;
  return +num1 * +num2;
}

// NOTE: DFS / 해시 / 정규표현식

// [접근]
// 1. 먼저 연산자의 우선순위를 정하고.
// 2. 우선수위가 높은 연산자 부터 expression에 각 연산 결과를 치환한다.
//    우선순위 예: ['+', '-', '*']
//    - 문자열 "100-200*300-500+20"에 A + B 연산을 'an'으로 치환하여 문자열에 다시 반환 (n = 숫자)
//    - 문자열 "100-200*300-a1"에 A - B 연산을 'an' 으로 치환하여 문자열에 다시 반환 (n = 숫자)
//    - 문자열 "b1*b2"에 A - B 연산을 'cn' 으로 치환하여 문자열에 다시 반환 (n = 숫자)
// 3. 최종 문자열에 반환된 치환된 문자열 "c1" 을 값으로 변환하여 결과를 반환한다.