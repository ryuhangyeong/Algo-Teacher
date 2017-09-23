import { setData } from '../data/setData';
import Error from '../utils/Error';
import Alert from '../utils/Alert';

const Linked = {
  create: $('#linked_create'),
  remove: $('#linked_remove'),
  inputname: $('#linked_input_name'),
  inputindex: $('#linked_input_index'),
  linked: $('.linked'),
  data: [], // 데이터 담기는 배열
  init() {
    this.event();
    this.inputvalue();
    this.add('류한경');
    this.add('노홍철');
    this.add('유재석');
    this.rendering('basic', '');
  },

  event() {

    this.inputindex.keydown((e) => {
      var code = e.keyCode;
      if(code == 13) { // Enter 키를 누르는 경우

        var name = this.inputname.val();
        var index = this.inputindex.val();
        var regNumber = /^[0-9]*$/;
        try {
          if(!regNumber.test(index)) throw new Error('AWRONG TYPE', '잘못된 타입입니다. 숫자만 입력하세요.');
          if(index > this.data.length - 1 || index <= -1) throw new Error('AWRONG INPUT', '인덱스는 0에서 (데이터 갯수 - 1) 만큼입니다.');
          if(this.data.indexOf(name) > -1) throw new Error('ALREADY NAME', '이미 존재하는 이름입니다.');
          if(name == "" || index == "") throw new Error('EMPTY INPUT', '이름과 인덱스를 필수 입력하세요!');
          this.indexAdd(index, name);
          this.rendering('add', name);
          Alert('추가되었어요!', 3000)
          this.inputvalue();
        } catch(e) {
          if(e.name == 'AWRONG INPUT') {
            Alert(e.message, 3000);
            return;
          } else if(e.name == 'AWRONG TYPE') {
            Alert(e.message, 3000);
            return;
          } else if(e.name == 'ALREADY NAME') {
            Alert(e.message, 3000);
            this.rendering('crash', name);
            setTimeout(() => {
              this.inputvalue();
            }, 2000)
            return;
          } else if(e.name == 'EMPTY INPUT') {
            Alert(e.message, 3000);
            return;
          }
        }
      }

    })
    this.create.click(() => {
      var name = this.inputname.val();
      try {
        if(name == "") throw new Error('EMPTY NAME', '이름이 비어있습니다');
        if(this.data.indexOf(name) > -1) throw new Error('ALREADY NAME', '이미 존재하는 이름입니다.');
        this.add(name);
        this.rendering('add', name);
        this.inputvalue();
        Alert('추가되었어요!', 3000)
      } catch(e) {
        if(e.name == 'ALREADY NAME') {
          Alert(e.message, 3000);
          this.rendering('crash', name);
          setTimeout(() => {
            this.inputvalue();
          }, 2000)
          return;
        } else if(e.name == 'EMPTY NAME'){
          Alert(e.message, 3000);
          setTimeout(() => {
            this.inputvalue();
          }, 2000)
        }

      }
    });

    this.remove.click(() => {

      swal({
        title: "삭제",
        text: "삭제할 이름을 적어주세요.",
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
        var removeIndex = this.data.indexOf(inputValue);
        if(removeIndex > -1) {
          swal({
            type: "success",
            title: "정상 삭제되었어요!",
            timer: 2000,
            showConfirmButton: false
          });
          this.rendering('crash', this.data[removeIndex]);
          setTimeout(() => {
            this.data.splice(removeIndex, 1);
            this.rendering('basic', '');
          }, 2000)
          return;
        }

        Alert('존재하지 않아서 삭제할 수 없어요!', 3000);
      })
    })
  },

  add(value) {
    this.data.push(value);
  },

  indexAdd(index, value) {
    this.data.splice(index, 0, value);
  },

  inputvalue() {
    var value = setData();
    this.inputname.val(value);
  },

  rendering(type, name) {
    this.linked.html('');
    this.linked.append("<div class='crash_chaining animated shake'><div class=linkedlist><div class=hashvalue>Head</div></div></div>");
    switch(type) {
      case 'basic': // 기본 랜더링
        for(var i = 0; i < this.data.length; i++) {
          $('.linkedlist').append(`<span class=link></span>`)
          $('.linkedlist').append(`<span class=linkedname>${this.data[i]}</div>`)
        }
        break;
      case 'crash': // 충돌 상태
        for(var i = 0; i < this.data.length; i++) {
          $('.linkedlist').append(`<span class=link></span>`)
          if(this.data[i] == name) {
            $('.linkedlist').append(`<span class="linkedname" style="background-color: #f03e3e">${this.data[i]}</div>`)
          } else {
            $('.linkedlist').append(`<span class="linkedname">${this.data[i]}</div>`)
          }
        }
        break;
      case 'add': // 충돌 상태
        for(var i = 0; i < this.data.length; i++) {
          $('.linkedlist').append(`<span class=link></span>`)
          if(this.data[i] == name) {
            $('.linkedlist').append(`<span class="linkedname" style="background-color: #1c7cd6">${this.data[i]}</div>`)
          } else {
            $('.linkedlist').append(`<span class="linkedname">${this.data[i]}</div>`)
          }
        }
        break;
    }
    $('.linkedlist').append(`<span class=link></span>`)
    $('.linkedlist').append('<span class="null">Null</span>')
  },

}

export default Linked;
