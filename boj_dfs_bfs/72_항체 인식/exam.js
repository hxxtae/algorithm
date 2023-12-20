const fs = require('fs');
const stdin = fs.readFileSync('./input_1.txt').toString().trim();

// -------------
// 입력
// -------------
const input = stdin.split('\n').map(item => item.trim().split(' ').map(Number));
const [[N, M], ...TEXTURES] = input;
const TEXTURE_A = TEXTURES.slice(0, N);
const TEXTURE_B = TEXTURES.slice(N, N + N);

// -------------
// 풀이 (DFS)
// -------------
function solution(n, m, textureA, textureB) {
  const visited = Array.from({ length: n }, () => Array(m).fill(0));

  const findWay = (y, x, way) => {
    const X = [1, 0, -1, 0];
    const Y = [0, 1, 0, -1];

    return [y + Y[way], x + X[way]];
  }

  const dfs = (y, x, startA, startB) => {
    for (let i = 0; i < 4; i++) {
      const [nextY, nextX] = findWay(y, x, i);
      if (nextY < 0 || nextX < 0 || nextY >= n || nextX >= m) continue;
      if (visited[nextY][nextX]) continue;
      if (textureA[nextY][nextX] !== startA) continue;
      if (textureB[nextY][nextX] !== startB) return false;

      visited[nextY][nextX] = 1;
      const result = dfs(nextY, nextX, startA, startB);
      if (!result) return false;
    }

    return true;
  }

  let result = true;
  let vaccineCnt = 0;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < m; c++) {
      if (!visited[r][c]) {
        if (textureA[r][c] !== textureB[r][c]) {
          vaccineCnt += 1;
          if (vaccineCnt > 1) return 'NO';
        }
        visited[r][c] = 1;
        result = dfs(r, c, textureA[r][c], textureB[r][c]);
        if (!result) return 'NO';
      }
    }
  }

  return 'YES';
}

// -------------
// 출력
// -------------
const result = solution(N, M, TEXTURE_A, TEXTURE_B);
console.log(result);

// [주의할 점]
// ※ 백신은 조직에 단 한 번만 주사된다. 두 번 이상 백신이 주사되지 않는다.

