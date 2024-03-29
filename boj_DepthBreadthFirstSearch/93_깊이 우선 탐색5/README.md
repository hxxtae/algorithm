# 깊이 우선 탐색5

### Level: 실버2

<img class="left" src="https://d2gd6pc034wcta.cloudfront.net/tier/9.svg" style="width: 20px" />

| 시간 제한 | 메모리 제한 |
| -------- | ---------- |
| 1 초 | 512 MB |

## 문제 설명

오늘도 서준이는 깊이 우선 탐색(DFS) 수업 조교를 하고 있다. 아빠가 수업한 내용을 학생들이 잘 이해했는지 문제를 통해서 확인해보자.

N개의 정점과 M개의 간선으로 구성된 무방향 그래프(undirected graph)가 주어진다. 정점 번호는 1번부터 N번이고 모든 간선의 가중치는 1이다. 정점 R에서 시작하여 깊이 우선 탐색으로 만들어 지는 트리를 깊이 우선 탐색 트리라고 하자. 깊이 우선 탐색 트리에 있는 i번 노드의 깊이(depth)를 di라고 하자. 시작 정점 R의 깊이는 0이고 방문 되지 않는 노드의 깊이는 -1이다. 정점 R에서 시작하여 깊이 우선 탐색으로 노드를 방문할 경우 i번 노드의 방문 순서를 ti라고 하자. 시작 정점의 방문 순서는 1이고 시작 정점에서 방문할 수 없는 노드는 0이다. 모든 노드에 대한 di × ti 값의 합을 구해보자.

깊이 우선 탐색 의사 코드는 다음과 같다. 인접 정점은 오름차순으로 방문한다.

## 입력

첫째 줄에 정점의 수 N (5 ≤ N ≤ 100,000), 간선의 수 M (1 ≤ M ≤ 200,000), 시작 정점 R (1 ≤ R ≤ N)이 주어진다.

다음 M개 줄에 간선 정보 u v가 주어지며 정점 u와 정점 v의 가중치 1인 양방향 간선을 나타낸다. (1 ≤ u < v ≤ N, u ≠ v) 모든 간선의 (u, v) 쌍의 값은 서로 다르다.

## 출력

첫째 줄에 모든 노드에 대한 di × ti 값의 합을 출력한다.

### 예제 입력1 & 예제 출력1

```text
5 5 1
1 4
1 2
2 3
2 4
3 4

```

```text
20

```

정점 1번에서 정점 2번을 방문한다. 정점 2번에서 정점 3번을 방문한다. 정점 3번에서 정점 4번을 방문한다. 정점 5번은 정점 1번에서 방문할 수 없다. 따라서, ti 값은 1번 정점부터 1, 2, 3, 4, 0이다.

깊이 우선 탐색 트리는 1, 2, 3, 4번 노드로 구성된다. 1번 노드가 루트이다. 1번 노드의 자식은 2번 노드이다. 2번 노드의 자식은 3번 노드이다. 3번 노드의 자식은 4번 노드이다. 5번 노드는 1번 노드에서 방문 될 수 없다. 따라서, di값은 1번 정점부터 0, 1, 2, 3, -1이다.

ti × di 값의 합은 1×0 + 2×1 + 3×2 + 4×3 + 0×(-1) = 20이다.

---

ref: https://www.acmicpc.net/problem/24483