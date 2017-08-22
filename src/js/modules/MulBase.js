function Stack() {
  var items = [];

  this.push = function(element) {
    items.push(element);
  }

  this.pop = function() {
    return items.pop();
  }

  this.length = function() {
    return items.length;
  }
}


var MulBase = {
  mulBase_create: $('#mulBase_create'),
  mulBase_remove: $('#mulBase_remove'),
  mulBase_input: $('#mulBase_input'),
  mulBase_container: $('.mulBase_container'),
  stack: null,

  init: function() {
    this.stack = new Stack();
    this.event();
    this.inputvalue();
  },

  event: function() {
    this.mulBase_create.click(() => {
      var data = this.mulBase_input.val();
      this.binary(data);
      /*
        12로 예시
        12가 들어가면 나머지 0이 push
        6은 0보다 크므로 다시 위로
        6이 들어가서 나머지 0이 push
        3은 0보다 크므로 다시 위로
        3이 들어가서 나머지 1이 push
        1은 0보다 크므로 다시 위로
        1이 들어가서 나머지 1이 push
        1 나누기 2는 0 Math.floor를 통해서
        그러면 while(data > 0) 조건 비성립하므로 이쪽 반복문은 종료 이제 아래로

        stack 갯수를 세어서 0보다 큰 경우 돌아간다. 돌때마다 pop으로 제일 왼쪽 데이터를 꺼내고 str에 붙인다.
        계속 꺼내쓰다보면 길이가 0보다 작아질 경우 while문 종료
      */

    })
  },

  binary: function(data) {
    var number = data;
    do {
      this.stack.push(data % 2);
      data = Math.floor(data / 2);
    } while(data > 0);


    var str = "";
    while (this.stack.length() > 0) {
      str += this.stack.pop();
    }
    this.mulBase_container.html(`${str}(${number})`);
    this.inputvalue();
  },

  inputvalue: function() {
    var value = Math.floor(Math.random() * 500) + 1;
    this.mulBase_input.val(value);
  }
}

export default MulBase;
