import Randompeople from './Randompeople';
import { filter, forEach } from 'lodash';

var Hashtable = {
  create: $('#hashtable_create'),
  remove: $('#hashtable_remove'),
  inputname: $('#hashtable_input_name'),
  inputemail: $('#hashtable_input_email'),
  hashtablediv: $('#hashtable_table'),
  hashtabletable: $('#hashtable_table table'),
  table: [],

  init: function() {
    this.put('류한경', '류한경@gmail.com');
    this.put('김나마', '김나마@gmail.com');
    this.put('박한별', '박한별@gmail.com');
    this.put('김혜지', '김혜지@gmail.com');
    this.rendering('basic'); // 초기 기본 랜더링
    this.randomInput(); // 인풋 랜덤 값 삽입
  },

  event: function() {
    this.create.click(() => {
      var name = this.inputname.val();
      var email = this.inputemail.val();

      // 인풋 유효성 검사
      if(name == '' || email == '') {
        swal({
          type: "warning",
          title: "요소를 입력하세요.",
          timer: 1000,
          showConfirmButton: false
        });
        return;
      }

      // 갯수가 0이 아니면 이미 데이터가 존재한다는 말이다.
      if(this.findPosition(this.loseloseHashCode(name)) != 0) {
        // 충돌 사실을 사용자에게 알려준다. 그리고, 충돌 방지법에 대해 알려주도록 한다.
        swal({
          title: "충돌 발생!",
          text: "<p>이름이 다르더라도 해시 값이 같으면 충돌이 일어나요!</p><p><b>충돌을 방지하는 선형 탐색과 체이닝에 대해 아래에서 알아보세요!</b></p>",
          html: true,
          timer: 3000,
          showConfirmButton: false
        });
        this.rendering('crash', this.findPosition(this.loseloseHashCode(name))[0].key);

        // 충돌된 인풋 박스 스타일링
        this.inputname.css({
          'background-color': '#f03e3e',
          'color': 'white',
          'font-weight': 'bold'
        });
        this.inputemail.css({
          'background-color': '#f03e3e',
          'color': 'white',
          'font-weight': 'bold'
        });


        setTimeout(() => {
          // 4초 지난후 스타일링 복구
          this.randomInput();
          this.inputname.css({
            'background-color': 'white',
            'color': 'black',
            'font-weight': 'none'
          });
          this.inputemail.css({
            'background-color': 'white',
            'color': 'black',
            'font-weight': 'none'
          });
        }, 4000)
        return;
      } else {

        // 정상 추가 로직
        swal({
          type: "success",
          title: "정상 추가되었어요!",
          timer: 2000,
          showConfirmButton: false
        });
        // 데이터 상자에 데이터 삽입
        this.put(name, email);
        setTimeout(() => {
          this.randomInput();
        }, 3000);

        this.rendering('mark', this.findPosition(this.loseloseHashCode(name))[0].key);
        return;
      }
    })
  },

  /* utils */

  randomInput: function() {
    var value = Randompeople();
    this.inputname.val(value.name);
    this.inputemail.val(value.email);
  },

  loseloseHashCode: function(key) {
    var hash = 0;
    for(var i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % 37;
  },

  // rendering

  rendering: function(type, key) {
    this.hashtabletable.html('');
    this.hashtabletable.html('<tr><th>이름/키</th><th>해시 값</th><th>값</th></tr>');

    switch(type) {
      case 'basic': // 기본 랜더링
        filter(this.table, (item) => {
          return item !== undefined;
        }).forEach((item) => {
            this.hashtabletable.append('<tr><td>'+item.key+'</td><td>'+item.position+'</td><td>'+item.value+'</td></tr>');
        });
        break;
      case 'crash': // 충돌 발생시 데이터 삽입시 이름이 다르더라도 해시값이 같은 경우 충돌 발생했다고 한다.
        filter(this.table, (item) => {
          return item !== undefined;
        }).forEach((item) => {
          if(item.key == key) {
            this.hashtabletable.append('<tr style="background-color:#f03e3e; color: #fff; font-weight: bold;"><td>'+item.key+'</td><td>'+item.position+'</td><td>'+item.value+'</td></tr>');
          } else {
            this.hashtabletable.append('<tr><td>'+item.key+'</td><td>'+item.position+'</td><td>'+item.value+'</td></tr>');
          }
        });
        break;
      case 'mark':
        filter(this.table, (item) => {
          return item !== undefined;
        }).forEach((item) => {
          if(item.key == key) {
            this.hashtabletable.append('<tr style="background-color:#4B9BE1; color: #fff; font-weight: bold;"><td>'+item.key+'</td><td>'+item.position+'</td><td>'+item.value+'</td></tr>');
          } else {
            this.hashtabletable.append('<tr><td>'+item.key+'</td><td>'+item.position+'</td><td>'+item.value+'</td></tr>');
          }
        });
        break;
    }
  },

  // hashtable function

  put: function(key, value) {
    var position = this.loseloseHashCode(key);
    this.table[position] = {
      position: position,
      key: key,
      value: value
    };
  },

  // search function

  /* 이미 데이터 안에 존재하는 유저가 있는지 확인하는 함수 */
  findPosition: function(position) {
    var alreay = filter(this.table, (item) => {
      return item !== undefined;
    }).filter((item) => {
      return item.position == position;
    });

    return alreay;
  }
}

export default Hashtable;
