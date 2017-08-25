import Stack from './Stack';
import Error from '../utils/Error'; // 에러 핸들링
import Alert from '../utils/Alert'; // Materialize 알림창

// 리팩토링(17/8/24)
var MulBase = {
  mulBase_create: $('#mulBase_create'),
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
      var reg = /^[0-9]*$/; // 정규  표현식 숫자만
      try {
        if(!reg.test(data)) {
          throw new Error('NOT NUMBER', '숫자만 입력가능 합니다!');
        }
      } catch(e) {
        if(e.name == 'NOT NUMBER') {
          Alert(e.message, 3000);
          return;
        }
      }
      Alert('변환되었습니다!', 3000);
      this.binary(data);
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
