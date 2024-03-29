# 벽 부수고 이동하기4

### Level: 골드2

<img src="https://d2gd6pc034wcta.cloudfront.net/tier/14.svg" style="width: 20px" />

<br>

| 시간 제한 | 메모리 제한 |
| -------- | ---------- |
| 2 초 | 512 MB |

<br>

## 문제 설명

N×M의 행렬로 표현되는 맵이 있다. 맵에서 0은 이동할 수 있는 곳을 나타내고, 1은 이동할 수 없는 벽이 있는 곳을 나타낸다. 한 칸에서 다른 칸으로 이동하려면, 두 칸이 인접해야 한다. 두 칸이 변을 공유할 때, 인접하다고 한다.

각각의 벽에 대해서 다음을 구해보려고 한다.

- 벽을 부수고 이동할 수 있는 곳으로 변경한다.
- 그 위치에서 이동할 수 있는 칸의 개수를 세어본다.

한 칸에서 이동할 수 있는 칸은 상하좌우로 인접한 칸이다.

<br>

## 입력

첫째 줄에 `N(1 ≤ N ≤ 1,000)`, `M(1 ≤ M ≤ 1,000)`이 주어진다. 다음 N개의 줄에 M개의 숫자로 맵이 주어진다.

<br>

## 출력

맵의 형태로 정답을 출력한다. 원래 빈 칸인 곳은 0을 출력하고, 벽인 곳은 이동할 수 있는 칸의 개수를 10으로 나눈 나머지를 출력한다.

<br>

**예제 입력1 & 예제 출력1**

```
3 3
101
010
101

```

```
303
050
303

```

**예제 입력2 & 예제 출력2**

```
4 5
11001
00111
01010
10101

```

```
46003
00732
06040
50403

```

**예제 입력3 & 예제 출력3**

```
3 5
01000
10000
00000

```

```
04000
40000
00000

```

**예제 입력4 & 예제 출력4**

```
5 5
01111
10100
01000
10111
00000

```

```
03166
40700
04000
80222
00000

```

---

ref: https://www.acmicpc.net/problem/16946