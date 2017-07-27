var Matrix = {
  visible: $('#graph_visible'),
  clear: $('#graph_clear'),
  matrix: $('#matrix'),
  adjacency: $('#adjacency'),
  adjacency_visible: $('#adjacency_visible'),
  adjacency_clear: $('#adjacency_clear'),
  Graph: [], // 그래프가 담기는 배열
  PositionX: [], // 위치 정보가 담긴다
  PositionY: [], // 위치 정보가 담긴다.
  adjacencyGraph: [],
  adjacencyPositionX: [],
  adjacencyPositionY: [],

  // 이벤트 리스너
  event: function() {

    this.adjacency_visible.click(() => {
      this.adjacencyGraph = [];
      this.adjacencyPositionX = [];
      this.adjacencyPositionY = [];

      var data = this.adjacency.val();
      var array = data.split("/");
      var count = array.length;

      var empty = [];

      for(var i = 0; i < count; i++) {
				empty[i] = [];
				for(var j = 0; j < count; j++) {
					empty[i][j] = 0;
				}
			}

      for(var i = 0; i< count; i++) {
				for(var j = 0; j < count; j++) {
					var t = array[i][j];
					if(t != undefined) {
						empty[i][t-1] = 1;
					} else {
						continue;
					}
				}
			}

      this.adjacencyGraph = empty;

      var canvas = document.getElementById('output_adjacency');
      this.drawGraph(this.adjacencyGraph, canvas);
    });

    this.visible.click(() => {
      // 클릭마다 초기 변수 초기화
      this.Graph = [];
			this.PositionX = [];
			this.PositionY = [];

      var data = this.matrix.val();
      this.Graph = this.getMatrix(data);
      console.log(this.Graph);
      if(this.isSimpleGrap(this.Graph)) { // 그래프 그리는데 문제가 없다면
				var canvas = document.getElementById('output');
				this.drawGraph(this.Graph, canvas); // 배열과 그래프
			}
    });

    this.clear.click(() => {
      var canvas = document.getElementById('output');
      this.clearCanvas(canvas);
    })
  },

  getMatrix: function(data) {
    data = data.replace(/\s+/g,''); // 공백 없애기
			if(Math.sqrt(data.length) % 1 !== 0) {
        swal({
          type: "warning",
          title: "정사각형 배열이 아닙니다.",
          timer: 3000,
          showConfirmButton: false
        });
				return false;
			}

			var pattern = /^[0-1]+$/;

			if(!pattern.test(data)) {
        swal({
          type: "warning",
          title: "0 또는 1 이외의 숫자는 포함될수 없어요!",
          timer: 3000,
          showConfirmButton: false
        });
				return false;
			}

			var size = Math.sqrt(data.length); // 배열의 길이
			var Mtx = []; // 반환을 위한 빈 배열

			for(var i = 0; i < size; i++) {
				Mtx[i] = []; // 배열 안의 내부 배열을 만든다.
				for(var j = 0; j < size; j++) {
					Mtx[i][j] = data[i*size + j];
				}
			}
			// 2차원 배열을 만들어서 반환한다.
			return Mtx;
  },

   isSimpleGrap: function(Graph) {
     for(var i = 0; i < this.Graph.length; i++) {
				if(Graph[i][i] != 0) {
          swal({
            type: "warning",
            title: "data[i][i] 번째 데이터는 반드시 0 입니다.",
            timer: 3000,
            showConfirmButton: false
          });
					return false;
				}

				for(var j = i; j < this.Graph.length; j++) {
					if(Graph[i][j] !== Graph[j][i]) {
            swal({
              type: "warning",
              title: "대칭되는 부분의 값이 동일해야 합니다!",
              timer: 3000,
              showConfirmButton: false
            });
						return false;
					}
				}
			}
			return true;
   },

    drawGraph: function(Graph, canvas) {
      this.clearCanvas(canvas);

			var ctx = canvas.getContext("2d"); // 캔버스에 요소 그리기 위한 준비

			var R = Math.min(canvas.width, canvas.height) / 2 -10; // 높으외 넓이중 작은 값에다가 나누기 2 빼기 10 (65)
			for(var k = 0; k < Graph.length; k++) {
				// 노드의 각 지점에 대한 위치 정보 x, y 좌표
				var p_X = R * Math.cos( 2 * Math.PI * k / Graph.length);
				var p_Y = R * Math.sin( 2 * Math.PI * k / Graph.length);
				this.drawNode(p_X, p_Y, canvas);

				ctx.fillText(k+1, p_X + canvas.width / 2 -20, p_Y + canvas.height / 2);

				// 배열에 위치 정보 저장
				this.PositionX.push(p_X);
				this.PositionY.push(p_Y);
			}

			// edge draw
			for (var i=0; i<Graph.length; i++) {
				for (var j=0; j<Graph.length; j++) {
					if (Graph[i][j]!=0) {
					  this.lineTo([this.PositionX[i],this.PositionY[i]], [this.PositionX[j],this.PositionY[j]], canvas);
					}
				}
			}
    },

    drawNode: function(p_X, p_Y, canvas) {
      var radius = 12;
			var ctx = canvas.getContext("2d");
			p_X += canvas.width / 2;
			p_Y += canvas.height / 2;

			ctx.beginPath();

			ctx.arc(p_X, p_Y, radius, 0, 2 * Math.PI);
			ctx.strokeStyle = 'white';
			ctx.stroke();
			ctx.fillStyle = 'white';
			ctx.fill();
    },

    lineTo: function(point1, point2, canvas) {
      var ctx = canvas.getContext("2d");

      point1[0] += canvas.width / 2;
      point1[1] += canvas.height / 2;
      point2[0] += canvas.width / 2;
      point2[1] += canvas.height / 2;

      ctx.beginPath();
      ctx.moveTo(point1[0], point1[1]);
      ctx.lineTo(point2[0], point2[1]);
      ctx.stroke();
    },

    clearCanvas: function(canvas) {
      var ctx = canvas.getContext("2d");
			ctx.fillStyle = "#343a40";
			ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

export default Matrix;
