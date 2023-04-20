function solution(common) {
  const findDistance = (arr) => {
    // 등차
    if((arr[2] - arr[1]) === (arr[1] - arr[0]))
      return common.at(-1) + (arr[2] - arr[1]);
    // 등비
    return common.at(-1) * (arr[1] / arr[0]);
  }
  return findDistance(common);
}

// NOTE: 등차 등비