function solution(new_id) {
  let resultId = new_id;
  resultId = toLower(resultId);
  resultId = removeSpecialChar(resultId);
  resultId = sumClose(resultId);
  resultId = removeCloseOfFirstAndEnd(resultId);
  resultId = emptyString(resultId);
  resultId = maxLength15(resultId);
  resultId = minLength3(resultId);
  return resultId;
}

function toLower(id) {
  return id.toLowerCase();
}

function removeSpecialChar(id) {
  return id.split(/[^\.\-\_\w]/g).join('');
  // 또는 id.replace(/[^\.\-\_\w]/g, '');
}

function sumClose(id) {
  return id.replaceAll(/(\.)+/g, '.');
  // 또는 id.replace(/(\.)+/g, '.');
  // ✔ flag에 g(global) 가 있어야 replaceAll과 같은 효과 적용 가능
}

function removeCloseOfFirstAndEnd(id) {
  let arr = id.split('');
  if (id[0] === '.') arr.splice(0, 1);
  if (id.at(-1) === '.') arr.splice(-1, 1);
  return arr.join('');
  // 또는 id.replace(/^\.|\.$/g, '');
}

function emptyString(id) {
  return id === '' ? 'aaa' : id;
  // 또는 id.replace(/^$/, 'aaa');
}

function maxLength15(id) {
  id = id.slice(0, 15);
  return removeCloseOfFirstAndEnd(id);
}

function minLength3(id) {
  return id += id.length < 3 ? id.at(-1).repeat(3 - id.length) : '';
}

// NOTE: 정규표현식 사용
