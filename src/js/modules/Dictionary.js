import { setData } from '../data/setData';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';

function DictionaryClass() {
  var data = {};

  this.has = function(key) {
    return key in data; // true of false;
  }

  this.set = function(key, value) {
    data[key] = value;
  }

  this.remove = function(key) {
    if(this.has(key)) {
      delete data[key];
      return true;
    }
    return false;
  }

  this.get = function(key) {
    return this.has(key) ? data[key] : undefined;
  }

  this.values = function() {
    var values = [];
    for(var k in data) {
      if(this.has(k)) {
        values.push(data[k]);
      }
    }

    return values;
  }

  this.getData = function() {
    return data;
  }
}

var Dictionary = {
  dictionary_create: $('#dictionary_create'),
  dictionary_remove: $('#dictionary_remove'),
  dictionary_input_key: $('#dictionary_input_key'),
  dictionary_input_value: $('#dictionary_input_value'),
  dictionary_container: $('.dictionary_container'),
  dictionary_container_table: $('.dictionary_container table'),
  dictionary: null,
  init: function() {
    this.dictionary = new DictionaryClass();

    this.dictionary.set('1', '류한경')
    this.dictionary.set('99', '구본주')
    this.dictionary.set('121', '김미정')
    this.dictionary.set('323', '이설아')
    this.dictionary.set('423', '한설주')
    this.event();
    this.rendering('basic', '');
    this.inputvalue();
  },

  event: function() {


    this.dictionary_create.click(() => {
      var data = this.dictionary.getData();
      var key = this.dictionary_input_key;
      var value = this.dictionary_input_value;

      var keyArray = Object.keys(data);
      var valueArray = Object.values(data);
      if(key.val() == "" || value.val() == "") {
        Materialize.toast('요소는 필수 입력이예요!', 3000, 'rounded');
        key.focus();
        return;
      }

      if(key.val() < 0 || key.val() > 999) {
        Materialize.toast('키는 0 ~ 999 사이의 수입니다.', 3000, 'rounded');
        this.inputvalue();
        return;
      }


      if(valueArray.indexOf(value.val()) > -1) {
        Materialize.toast('이미 존재하는 이름입니다.', 3000, 'rounded');
        this.rendering('crash', value.val());
        return;
      }



      this.dictionary.set(key.val(), value.val());
      this.rendering('create', value.val());
      Materialize.toast('정상 추가되었어요!', 3000, 'rounded');
      this.inputvalue();

    });

    this.dictionary_remove.click(() => {
      // 삭제 로직
      var data = this.dictionary.getData();
      var key = this.dictionary_input_key;
      var value = this.dictionary_input_value;

      var keyArray = Object.keys(data);
      var valueArray = Object.values(data);
      swal({
        title: "삭제",
        text: "이름에 해당하는 값을 삭제해요!",
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

        if(valueArray.indexOf(inputValue) == -1) {
          swal.showInputError("존재하지 않아 삭제 할 수 없습니다.");
          return;
        } else {
          swal({
            type: "success",
            title: "정상 삭제되었어요!",
            timer: 2000,
            showConfirmButton: false
          });
          // this.rendering('crash', );
          var removeKey = keyArray[valueArray.indexOf(inputValue)];
          this.rendering('crash', inputValue);
          setTimeout(() => {
            this.dictionary.remove(removeKey);
            this.rendering('basic', '');
          }, 2000)
          return;
        }

      })
    })
  },

  inputvalue: function() {
    var number = Math.floor(Math.random() * 999);
    var value = setData();

    this.dictionary_input_key.val(number);
    this.dictionary_input_value.val(value);
  },

  rendering: function(mode, name) {
    var data = this.dictionary.getData();
    this.dictionary_container_table.html('');
    this.dictionary_container_table.html('<tr><th>키 <span>▲</span> <span>▼</span></th><th>값 <span>▲</span> <span>▼</span></th></tr>');
    switch(mode) {
      case 'basic':
        forEach(data, (item, index) => {
          this.dictionary_container_table.append(`<tr><td>${index}</td><td>${item}</td></tr>`)
        });
        break;
      case 'create':
        forEach(data, (item, index) => {
          if(item == name) {
            this.dictionary_container_table.append(`<tr class="animated bounceIn" style="background-color:#4B9BE1; color: #fff; font-weight: bold;"><td>${index}</td><td>${item}</td></tr>`)
          } else {
            this.dictionary_container_table.append(`<tr><td>${index}</td><td>${item}</td></tr>`)
          }
        });
        break;
      case 'crash':
        forEach(data, (item, index) => {
          if(item == name) {
            this.dictionary_container_table.append(`<tr class="animated shake" style="background-color:#f03e3e; color: #fff; font-weight: bold;"><td>${index}</td><td>${item}</td></tr>`)
          } else {
            this.dictionary_container_table.append(`<tr><td>${index}</td><td>${item}</td></tr>`)
          }
        });
        break;
    }
  }
}

export default Dictionary;
