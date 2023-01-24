// 풀이 1.
function solution1(arr1, arr2) {
  const len1 = arr1[0].length;
  const len2 = arr2[0].length;
  return arr1.map((col) => {
    return multifulFunc(col, arr2, len1, len2);
  });
}

function multifulFunc(col, arr2, len1, len2) {
  const addArr = [];
  for(let r = 0; r < len2; r++) {
    let sum = 0;
    for(let c = 0; c < len1; c++) {
      sum += (col[c] * arr2[c][r]);
    }
    addArr.push(sum);
  }
  return addArr;
}

// 풀이 2.
function solution2(arr1, arr2) {
  return arr1.map((col) => arr2[0]
                .map((row, rowIdx) => col
                .reduce((sum, colNum, colIdx) => sum += colNum * arr2[colIdx][rowIdx], 0)))
}

// 행렬의 곱셈 (참고) : https://mathbang.net/562