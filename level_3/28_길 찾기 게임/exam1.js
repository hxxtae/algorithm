function solution(nodeinfo) {
  const len = nodeinfo.length;
  const nodes = nodeinfo
    .map((arr, idx) => 
      [idx+1, {'x': arr[0],'y': arr[1], 'left': null,'right': null}]);
      // item: [node, {x, y, left, right}]
  nodes.sort(([n1, data1], [n2, data2]) => {
    if(data1.y === data2.y) return data1.x - data2.x;
    return data2.y - data1.y;
  });
  const nodeMap = new Map(nodes);

  const preorder = (arr, node) => {
    if(node == null) return;
    arr.push(node);
    preorder(arr, nodeMap.get(node).left);
    preorder(arr, nodeMap.get(node).right);
  }
  const postorder = (arr, node) => {
    if(node == null) return;
    postorder(arr, nodeMap.get(node).left);
    postorder(arr, nodeMap.get(node).right);
    arr.push(node);
  }
  let [rootNode, root] = [nodes[0][0], nodes[0][1]]; // [node(key), obj(value)]

  const addNode = (parent, child) => {
    // left
    if(parent.x > child[1].x) {
      if(parent.left == null) {
        parent.left = child[0];
      } else {
        addNode(nodeMap.get(parent.left), child);
      }
    }
    // right
    else if(parent.x < child[1].x) {
      if(parent.right == null) {
        parent.right = child[0];
      } else {
        addNode(nodeMap.get(parent.right), child);
      }
    }
  }

  for(const child of nodeMap) {
    addNode(root, child);
  }

  const result = [[], []];
  preorder(result[0], rootNode);
  postorder(result[1], rootNode);
  return result;
}

// NOTE: Binary Tree(이진트리 전위순회, 후위순회)
