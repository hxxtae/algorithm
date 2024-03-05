const fs = require('fs');
const stdin = fs.readFileSync('./input_3.txt').toString().trim();

// -------------
// 입력
// -------------
const [N, ...CAR_NUMBERS] = stdin.split('\n').map(item => item.trim());

// -------------
// 풀이
// -------------
function solution(n, carNumbers) {
  const comeOfCar = new Map();
  const outOfCar = [];
  let cnt = 0;

  for (let i = 0; i < n; i++) {
    const [comeNum, outNum] = [carNumbers[i], carNumbers[i + n]];
    comeOfCar.set(comeNum, i + 1);
    outOfCar.push(outNum);
  }
  
  for (let i = 0; i < n; i++) {
    const carNum1 = outOfCar[i];
    const order1 = comeOfCar.get(carNum1);
    for (let j = i + 1; j < n; j++) {
      const carNum2 = outOfCar[j];
      const order2 = comeOfCar.get(carNum2);
      if (order2 < order1) {
        cnt++;
        break;
      }
    }
  }

  return cnt;
}

// -------------
// 출력
// -------------
const result = solution(+N, CAR_NUMBERS);
console.log(result);

// [접근]
// 터널 안에서 추월한 차량의 개수를 구하기 위한 판단 조건으로는,
// 각 차량이 터널에 들어간 순서를 매기고, 터널에서 나오는 차량이 다음 으로 나오는 차량을 추월했는지 여부를 판단하면 된다.
// 즉, 이중 반복문을 통해 현재 터널에서 나온 차량이 다음으로 나오는 차량들 중에서 하나라도 추월을 하였다면 카운트를 해준다.
