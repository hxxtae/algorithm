function solution(files) {
  const sortFiles = files.sort((fileA, fileB) => {
    const sort1 = headSort(fileA, fileB);
    const sort2 = numberSort(fileA, fileB);
    if(sort1 !== 0) return sort1;
    return sort2;
  });
  return sortFiles;
}

function headSort(fileA, fileB) {
  fileA = fileA.match(/^[a-z\s\-]+/i)?.join('').toLowerCase();
  fileB = fileB.match(/^[a-z\s\-]+/i)?.join('').toLowerCase();
  return fileA.localeCompare(fileB);
}

function numberSort(fileA, fileB) {
  fileA = parseInt(fileA.match(/\d+/).join(''));
  fileB = parseInt(fileB.match(/\d+/).join(''));
  return fileA - fileB;
}

// NOTE: 정렬 / 정규표현식

// 입력으로 들어온 파일명을 조건 순서에 맞게 정렬
// 1. HEAD - 사전순 정렬 함수.(영문자만 비교, 대소문자 구분x)
// 2. NUMBER - 숫자 오름차순 정렬 함수.(숫자만 비교, 정수 형태로 비교)
// 3. TAIL - 아무런 정렬 하지 않음 (위 정렬 이후 입력 순서 그대로 출력)