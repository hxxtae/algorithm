function solution(k, d) {
  const dd = d**2;
  let count = 0;
  for(let x = 0; x <= d; x += k) {
    const maxY = Math.sqrt(dd - x**2);
    count += parseInt(maxY / k) + 1;
  }
  return count;
}

// NOTE: 피타고라스 정의 / 등차수열의 개수

// [접근]
// 원의 반지름 d를 직각삼각형의 밑변이라 두고,
// 임의의 점 x, y 에서 밑변의 각 꼭지점에 선을 이으면 삼각형을 이룬다.

// d는 원의 반지름의 길이며, x, y의 점은 피타고라스의 정의에 의해
// Math.sqrt(x^2 + y^2) = Math.sqrt(d^2) 를 만족해야 한다.

// 해당 문제에서는 찍을 수 있는 점의 개수 이므로 원 안의 점의 개수를 구하면 된다.
// 그럼 피타고리스 정의에 의해 x값에 따른 y의 최대값을 구하면
// 해당 y점 에서 부터 원 안에 찍을 수 있는 모든 점 즉, 등차수열의 개수를 구하면 된다.

// 참고
// - 피타고라스 정의: a^2 + b^2 = c^2
// - 등차수열의 개수: ((LastNumber - FirstNumber) / n) + 1
//   (n: 공차(간격))

