// 풀이 1.
function solution1(w, h) {
  const GCD = (a, b) => {
    let r = a % b;
    if(r === 0) return b;
    return GCD(b, r);
  }
  return w * h - (w + h - GCD(w, h));
}

// NOTE: 최대공약수 / 유클리드 호제법

// [접근]
// 수학적인 공식으로 (w + h - 최대공약수) 는 대각선으로 선을 그엇을 때
// 선에 포함된 사각형의 갯수를 의미한다.
// 1. 사각형의 w와 h가 서로소인 경우 잘린 정사각형의 갯수 = w + h - 1
// 2. 사각형의 w와 h가 서로소가 아닌 경우 잘린 정사각형의 갯수 = w + h - 최대공약수

// 그리고 w, h가 1억 이하 이므로 최대공약수를 구하기 위해서는 무조건
// 유클리드 호제법 알고리즘을 사용해야 시간초과가 나지 않는다.
// ref: https://coding-factory.tistory.com/599

// 풀이 2.
function solution2(w,h){
  const slope = h / w;
  let result = 0;
  
  for(let i = 1; i <= w; i++){
    result += Math.ceil(slope * i);
  }
  return ((h * w) - result) * 2;
}

// NOTE: 기울기를 활용한 방법

// [접근]
// 기울기에 따른 세로축 사각형의 개수를 활용한 방법

// 1. 기울기를 구한다.

// 2. w(x좌표)를 지나면서 기울기에 따른 사각형의 높이(y좌표) 
// 즉, x좌표를 기준으로 기울기 이하의 y좌표값(사각형의 개수)을 누적한다.

// 3. 누적된 사각형의 개수를 sum이라 하면
//    ((w * h) - sum) * 2
// 로 최종 사각형의 개수를 반환한다.