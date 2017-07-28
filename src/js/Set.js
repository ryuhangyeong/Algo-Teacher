/*
  집합 구현체
*/
import { setData, setArray } from './setData';
import forEach from 'lodash/forEach';
import filter from 'lodash/filter';

var Setbasic = {
  set_create: $('#set_create'),
  set_remove: $('#set_remove'),
  set_input: $('#set_input'),
  set_text: $('#set_text'),
  setAlert: $('#setAlert'),
  items: {},

  // 초기 설정 및 랜더링
  init: function() {
    // 인풋 랜덤 값 대입
    this.inputvalue();
    // 초기 데이터 삽입
    this.add('류한경');
    this.add('류한아');
    this.add('수지');
    // 데이터 화면 랜더링
    this.rendering('basic');
  },

  event: function() {
    this.set_remove.click(() => {
      var inputdata = this.set_input.val();
      // 데이터가 있어 삭제 가능한 상태
      setTimeout(() => {
        if(!this.has(inputdata)) {
          this.setAlert.addClass('error').removeClass('success').html('['+inputdata+'] 은(는) 존재하지 않습니다!')
          this.rendering('basic');
          setTimeout(() => {
            this.inputvalue();
          }, 2000)

        } else {
          this.remove(inputdata);
          this.rendering('basic');
          this.setAlert.addClass('success').removeClass('error').html('['+inputdata+'] 을(를) 삭제하였습니다!')
          setTimeout(() => {
            this.inputvalue();
          }, 2000)
        }
      }, 500)
    })

    this.set_create.click(() => {
      var inputdata = this.set_input.val();
      if(this.add(inputdata)) {
        this.rendering('create', inputdata);
        this.setAlert.addClass('success').html('정상 추가!');
        this.inputvalue();
      } else {
        this.setAlert.addClass('error').removeClass('success').html('중복!');
        this.rendering('basic');
        var index = this.values().indexOf(inputdata);
        $('.set_text span').eq(index).css({
          'color': '#f03e3e',
          'font-weight': 'bold',
          'font-size': '2rem'
        });

        setTimeout(() => {
          this.inputvalue();
          this.setAlert.html('');
        }, 2500)
      }
    });

  },

  /* set function */
  has: function(value) {
    return value in this.items;
  },

  add: function(value) {
    if(!this.has(value)) {
      this.items[value] = value;
      return true;
    }
    return false;
  },

  remove: function(value) {
    if(this.has(value)){
      delete this.items[value];
      return true;
    }

    return false;
  },

  clear: function() {
    this.items = {};
  },

  size: function() {
    return Object.keys(this.items).length;
  },

  values: function() {
    return Object.keys(this.items);
  },

  inputvalue: function() {
    var random = setData();

    this.set_input.val(random);
  },

  rendering: function(type, data) {;
    // 배열 값 추출
    var values = this.values();
    var str = '';


    switch(type) {
      case 'basic':
        forEach(values, (item, index) => {
          if(index + 1  < values.length) {
            str += "<span>"+item+"</span>"+",";
          } else {
            str += "<span>"+item+"</span>";
          }
        });
        this.set_text.html(str);
        break;
      case 'create':
        forEach(values, (item, index) => {
          if(index + 1  < values.length) {
            str += "<span>"+item+"</span>"+",";
          } else {
            str += "<span style='color:#4B9BE1; font-weight: bold; font-size: 2rem;'>"+item+"</span>";
          }
        });
        this.set_text.html(str);
        break;
    }


  }
}

var intersectionSet = {
  intersectionSet_create: $('#intersectionSet_create'),
  intersectionSet_inputA: $('#intersectionSet_inputA'),
  intersectionSet_inputB: $('#intersectionSet_inputB'),
  intersectionSet_text: $('#intersectionSet_text'),
  intersectionSet_clear: $('#intersectionSet_clear'),

  init: function() {
    this.inputvalue();
  },

  event: function() {
      this.intersectionSet_create.click(() => {
        var A_array = this.intersectionSet_inputA.val().split(',');
        var B_array = this.intersectionSet_inputB.val().split(',');
        var newArray = [];

        // 교집합을 찾기 위한 로직
        for(var i = 0; i < A_array.length; i++) {
          for(var j = 0; j < B_array.length; j++) {
            if(A_array[i] == B_array[j]) {
              newArray.push(B_array[j]);
            }
          }
        }
        var str = '';
        forEach(newArray, (item, index) => {
          if(index + 1  < newArray.length) {
            str += "<span>"+item+"</span>"+",";
          } else {
            str += "<span>"+item+"</span>";
          }
        });

        // 교집합이 존재한다면
        if(newArray.length != 0) {
          var str = '';
          forEach(newArray, (item, index) => {
            if(index + 1  < newArray.length) {
              str += "<span>"+item+"</span>"+",";
            } else {
              str += "<span>"+item+"</span>";
            }
          });

          this.intersectionSet_text.html(str);

        } else {
          this.intersectionSet_text.html("<span style='color:#f03e3e; font-weight: bold; font-size: 2rem;'>교집합이 존재하지 않아요!</span>");
          setTimeout(() => {
            this.inputvalue();
          }, 2000)
        }

      });

      this.intersectionSet_clear.click(() => {
        setTimeout(() => {
          this.inputvalue();
        }, 500)
      })
  },

  inputvalue: function() {
    var A = setArray();
    var B = setArray();

    this.intersectionSet_inputA.val(A);
    this.intersectionSet_inputB.val(B);
  }
}

var unionSet = {
  unionSet_create: $('#unionSet_create'),
  unionSet_inputA: $('#unionSet_inputA'),
  unionSet_inputB: $('#unionSet_inputB'),
  unionsSet_text: $('#unionsSet_text'),
  unionSet_clear: $('#unionSet_clear'),

  init: function() {
    this.inputvalue();
  },

  event: function() {
      this.unionSet_create.click(() => {
        var A_array = this.unionSet_inputA.val().split(',');
        var B_array = this.unionSet_inputB.val().split(',');
        var long;
        var short;

        if(A_array.length == B_array.length) {
          long = A_array;
          short = B_array;
        } else {
          long = A_array.length >= B_array.length ? A_array : B_array;
          short = A_array.length <= B_array.length ? A_array : B_array;
        }

        var newArray = [];

        for(var i = 0; i < long.length; i++) {
          newArray.push(long[i]);
        }

        for(var j = 0; j < short.length; j++) {
          if(newArray.indexOf(short[j]) < 0) {
            newArray.push(short[j])
          }
        }


        var str = '';
        forEach(newArray, (item, index) => {
          if(index + 1  < newArray.length) {
            str += "<span>"+item+"</span>"+",";
          } else {
            str += "<span>"+item+"</span>";
          }
        });

        // 교집합이 존재한다면
        if(newArray.length != 0) {
          var str = '';
          forEach(newArray, (item, index) => {
            if(index + 1  < newArray.length) {
              str += "<span>"+item+"</span>"+",";
            } else {
              str += "<span>"+item+"</span>";
            }
          });

          this.unionsSet_text.html(str);

        } else {
          this.unionsSet_text.html("<span style='color:#f03e3e; font-weight: bold; font-size: 2rem;'>교집합이 존재하지 않아요!</span>");
          setTimeout(() => {
            this.inputvalue();
          }, 2000)
        }

      });

      this.unionSet_clear.click(() => {
        setTimeout(() => {
          this.inputvalue();
        }, 500)
      })
  },

  inputvalue: function() {
    var A = setArray();
    var B = setArray();

    this.unionSet_inputA.val(A);
    this.unionSet_inputB.val(B);
  }
}

export {
  Setbasic,
  intersectionSet,
  unionSet
}
