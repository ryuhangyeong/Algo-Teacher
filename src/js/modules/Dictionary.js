import { setData } from '../data/setData';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';

function DictionaryClass() {
  var data = [];

  this.has = function(key) {
    return key in data; // true of false;
  }

  this.set = function(key, value) {
    data[key] = {
      key, value
    };
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

    var data = this.dictionary.getData();
    this.rendering(data, 'basic', '');
    this.inputvalue();

  },

  event: function() {
    var that = this;

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


      if(this.findValue(value.val()) != 0) {
        Materialize.toast('이미 존재하는 이름입니다.', 3000, 'rounded');
        this.rendering(data,'crash', value.val());
        return;
      }



      this.dictionary.set(key.val(), value.val());
      this.rendering(data,'create', value.val());
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

        if(this.findValue(inputValue) == 0) {
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
          var removeKey = this.findValue(inputValue);

          this.rendering(data, 'crash', inputValue);
          setTimeout(() => {
            this.dictionary.remove(removeKey[0].key);
            this.rendering(data, 'basic', '');
          }, 2000)
          return;
        }

      })
    });

    // 정렬을 위한 이벤트 동적 바인딩
    $(document).on("click","#sort",function(data){
      var sort = $(this).attr('data-sort');
      var standard = $(this).attr('data-standard');
      var data = that.dictionary.getData();

      if(sort == "key") {
        if(standard == "height") {
          data.sort((a, b) => {
            return b.key - a.key;
          })
          that.rendering(data,'basic', '');

        } else {
          data.sort((a, b) => {
            return a.key - b.key;
          })
          that.rendering(data,'basic', '');
        }
      } else {
        if(standard == "height") {
          data.sort((a, b) => {
            return a.value > b.value ? -1 : a.value < b.value ? 1 : 0;
          })
          that.rendering(data,'basic', '');
        } else {
          data.sort((a, b) => {
            return a.value < b.value ? -1 : a.value > b.value ? 1 : 0;
          })

          that.rendering(data,'basic', '');
        }
      }
      Materialize.toast('정렬 되었어요!', 3000, 'rounded');
    });




  },

  inputvalue: function() {
    var number = Math.floor(Math.random() * 999);
    var value = setData();

    this.dictionary_input_key.val(number);
    this.dictionary_input_value.val(value);
  },

  findValue: function(value) {
    var data = this.dictionary.getData();
    var alreay = filter(data, (item) => {
      return item !== undefined;
    }).filter((item) => {
      return item.value == value;
    });

    return alreay;
  },

  findkey: function(key) {
    var data = this.dictionary.getData();
    var find = filter(data, (item) => {
      return item !== undefined;
    }).filter((item) => {
      return item.key == key;
    })

    return find;
  },

  rendering: function(data, mode, name) {

    this.dictionary_container_table.html('');
    this.dictionary_container_table.html(`
      <tr>
        <th>키
          <span id="sort" data-sort="key" data-standard="height">▲</span>
          <span id="sort" data-sort="key" data-standard="row">▼</span>
        </th>
        <th>값
          <span id="sort" data-sort="value" data-standard="height">▲</span>
          <span id="sort" data-sort="value" data-standard="row">▼</span>
        </th>
      </tr>

    `);
    switch(mode) {
      case 'basic':
        filter(data, (item) => {
          return item !== undefined;
        }).forEach((item, index) => {
          this.dictionary_container_table.append(`<tr><td>${item.key}</td><td>${item.value}</td></tr>`)
        });
        break;
      case 'create':
        filter(data, (item) => {
          return item !== undefined;
        }).forEach((item, index) => {
          if(item.value == name) {
            this.dictionary_container_table.append(`<tr class="animated bounceIn" style="background-color:#4B9BE1; color: #fff; font-weight: bold;"><td>${item.key}</td><td>${item.value}</td></tr>`)
          } else {
            this.dictionary_container_table.append(`<tr><td>${item.key}</td><td>${item.value}</td></tr>`)
          }
        });
        break;
      case 'crash':
        filter(data, (item) => {
          return item !== undefined;
        }).forEach((item, index) => {
          if(item.value == name) {
            this.dictionary_container_table.append(`<tr class="animated shake" style="background-color:#f03e3e; color: #fff; font-weight: bold;"><td>${item.key}</td><td>${item.value}</td></tr>`)
          } else {
            this.dictionary_container_table.append(`<tr><td>${item.key}</td><td>${item.value}</td></tr>`)
          }
        });
        break;
    }
  }
}

export default Dictionary;
