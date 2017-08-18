

// 각각의 노드에 관련
var Node = function(x,y,r, ctx, data) {
  // 각 노드마다 left, right Node 존재
  this.leftNode = null; // 왼족 노드
  this.rightNode = null; // 오른쪽 노드

  this.draw = function() { // 캔버스에 그리는 함수
    ctx.beginPath(); // 새 경로를 만듭니다
    ctx.arc(x, y, r, 0, Math.PI * 2); // (x,y) 좌표 / r 반지름 크기 원을 그립니다.
    ctx.stroke(); // 윤곽선 표시
    ctx.closePath(); // 경로 닫음
    ctx.strokeText(data, x, y); // 받은 데이터 값을 x,y좌표에 넣습니다.

    // ctx.strokeText(data, x - 2, y + 2); 중앙 정렬
  };

  // get 값을 얻기 위한 함수들
  this.getData = function() { return data; }; // 매개변수 data
  this.getX = function() { return x; }; // 매개변수 x
  this.getY = function() { return y; }; // 매개변수 y
  this.getRadius = function() { return r; }; // 매개변수 r

  // 노드의 자식을 표현하는 왼쪽 대각선
  this.leftCoordinate = function() {
    return {
      cx: (x - (3 * r)),
      cy: (y + (3 * r))
    }
  };
  // 노드의 자식을 표현하는 오른쪽 대각선
  this.rightCoordinate = function() {
    return {
      cx: (x + ( 3 * r)),
      cy: (y + ( 3 * r))
    }
  };
};

var Line = function() {

  this.draw = function(x, y, toX, toY, r, ctx) {
    var moveToX = x;
    var moveToY = y + r;
    var lineToX = toX;
    var lineToY = toY - r;
    ctx.beginPath();
    ctx.moveTo(moveToX, moveToY);
    ctx.lineTo(lineToX, lineToY);
    ctx.stroke();
  };
};

// Represents the btree logic
var BTree = function() {
  var c = document.getElementById('my-canvas');
  var ctx = c.getContext('2d');
  var line = new Line();
  this.root = null;

  var self = this;

  // Getter for root
  this.getRoot = function() { return this.root; };

  // Adds element to the tree
  this.add = function( data) {
    // If root exists, then recursively find the place to add the new node
    if(this.root) {
      this.recursiveAddNode(this.root, null, null, data);
    } else {
    // If not, the add the element as a root
      this.root = this.addAndDisplayNode(200, 20, 15, ctx, data);
      return;
    }
  };

  // Recurively traverse the tree and find the place to add the node
  this.recursiveAddNode = function(node, prevNode, coordinateCallback, data) {
    if(!node) {
      // This is either node.leftCoordinate or node.rightCoordinate
      var xy = coordinateCallback();
      var newNode = this.addAndDisplayNode(xy.cx, xy.cy, 15, ctx, data);
      line.draw(prevNode.getX(), prevNode.getY(), xy.cx, xy.cy, prevNode.getRadius(), ctx)
      return newNode;
    }
    else {
      if(data <= node.getData()) {
        node.left = this.recursiveAddNode(node.left, node, node.leftCoordinate, data);
      }
      else {
        node.right = this.recursiveAddNode(node.right, node, node.rightCoordinate, data);
      }
      return node;
    }
  };

  // Adds the node to the tree and calls the draw function
  this.addAndDisplayNode = function(x, y, r, ctx, data) {
    var node = new Node(x, y, r, ctx, data);
    node.draw();
    return node;
  };
};

var addToTree = function() {
  input = document.getElementById('tree-input');
  value = parseInt(input.value);
  if(value)
    btree.add(value);
  else
    alert("Wrong input");
};

var btree = new BTree();
