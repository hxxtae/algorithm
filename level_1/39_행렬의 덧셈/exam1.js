function solution (arr1, arr2) {
  return arr1.map((v, i) => v.reduce((arr, num, numIdx) => [...arr, (num + arr2[i][numIdx])], []));
}
