import Randompeople from '../data/Randompeople';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';

var Linearsearch = {
  create: $('#linear_create'),
  remove: $('#linear_remove'),
  inputname: $('#linear_input_name'),
  inputemail: $('#linear_input_email'),
  hashtablediv: $('#linear_table'),
  hashtabletable: $('#linear_table table'),
  table: [],

  init: function() {
    this.put('류한경', '류한경@gmail.com');
    this.put('김나마', '김나마@gmail.com');
    this.put('박한별', '박한별@gmail.com');
    this.put('김혜지', '김혜지@gmail.com');
    this.rendering('basic'); // 초기 기본 랜더링
    this.randomInput(); // 인풋 랜덤 값 삽입
    this.event();
  },

  event: function() {
    this.create.click(() => {
      var name = this.inputname.val();
      var email = this.inputemail.val();

      // 인풋 유효성 검사
      if(name == '' || email == '') {
        Materialize.toast('요소는 필수 입력이예요!', 3000, 'rounded');
        this.inputname.focus();
        return;
      }

      if(this.findName(name).length > 0) { // 이미 존재하고 있는 이름이 있다면

        Materialize.toast('이미 존재하는 이름이거나 해시 값이 동일합니다.', 3000, 'rounded');
        
        this.rendering('crash', this.findPosition(this.loseloseHashCode(name))[0].key);

        // 충돌된 인풋 박스 스타일링
        this.inputname.css({
          'color': '#f03e3e',
          'font-weight': 'bold'
        });
        this.inputemail.css({
          'color': '#f03e3e',
          'font-weight': 'bold'
        });


        setTimeout(() => {
          // 4초 지난후 스타일링 복구
          this.randomInput();
          this.inputname.css({
            'color': 'black',
            'font-weight': 'none'
          });
          this.inputemail.css({
            'color': 'black',
            'font-weight': 'none'
          });
        }, 4000);
        return;
      } else { // 존재하지 않는 이름이라면
        // 정상 추가 로직
        if(this.findPosition(this.loseloseHashCode(name)) != 0) { // 키 값이 같다면
            Materialize.toast('해시 값이 동일하여 선행 탐색 방법으로 자신의 자리를 탐색해나갑니다.', 3000, 'rounded');

            var position = this.loseloseHashCode(name);
            var index = position++;
            while(this.table[index] != undefined) {
              index++;
            }

            var infomation = {
              type: 'linear',
              index: index
            }

            // 충돌된 인풋 박스 스타일링
            this.inputname.css({
              'color': '#f03e3e',
              'font-weight': 'bold'
            });
            this.inputemail.css({
              'color': '#f03e3e',
              'font-weight': 'bold'
            });


            setTimeout(() => {
              // 4초 지난후 스타일링 복구
              this.randomInput();
              this.inputname.css({
                'color': 'black',
                'font-weight': 'none'
              });
              this.inputemail.css({
                'color': 'black',
                'font-weight': 'none'
              });
            }, 4000);

            this.linearput(name, email, infomation);

            this.rendering('crash', this.findName(name)[0].key);
            setTimeout(() => {
              this.randomInput();
            }, 2000);
        } else {
          Materialize.toast('정상 추가되었어요!', 3000, 'rounded');
          // 데이터 상자에 데이터 삽입
          this.put(name, email);
          console.log(this.table)
          setTimeout(() => {
            this.randomInput();
          }, 2000);

          this.rendering('mark', this.findPosition(this.loseloseHashCode(name))[0].key);
          return;
        }
      }
    })

    this.remove.click(() => {
      swal({
        title: "삭제",
        text: "이름에 해당하는 해시 값을 삭제해요!",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "이름을 입력하세요"
      }, (inputValue) => {
        if(inputValue === false) return false;
        if(inputValue === "") {
          swal.showInputError("이름은 필수입력입니다!");
          return false;
        }

        for(var i = 0; i < this.table.length; i++) {
          if(this.table[i] === undefined) continue;
          if(this.table[i].key === inputValue) {
            this.rendering('crash', inputValue)
            setTimeout(() => {
              this.delete(this.table[i].position); // 포지션 위치
              this.rendering('basic');
            }, 2000)
            swal({
              type: "success",
              title: "정상 삭제되었어요!",
              timer: 2000,
              showConfirmButton: false
            });
            return;
          }
        }
        Materialize.toast('요소가 존재하지 않아요!', 3000, 'rounded')

      })
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
  delete: function(position) {
    delete this.table[position];
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

  linearput: function(key, value, infomation) {
    this.table[infomation.index] = {
      position: infomation.index,
      key: key,
      value: value
    };
  },
  // search function

  /* 이미 데이터 안에 존재하는 유저가 있는지 확인하는 함수 */
  findPosition: function(position) {
    var already = filter(this.table, (item) => {
      return item !== undefined;
    }).filter((item) => {
      return item.position == position;
    });

    return already;
  },

  findName: function(name) {
    var already = filter(this.table, (item) => {
      return item !== undefined;
    }).filter((item) => {
      return item.key == name;
    });

    return already;

  }
}

export default Linearsearch;
