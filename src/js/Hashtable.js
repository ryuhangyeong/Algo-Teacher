import Randompeople from './Randompeople';
import { filter, forEach } from 'lodash';

var Hashtable = {
  create: $('.hashtable_create'),
  remove: $('.hashtable_remove'),
  inputname: $('.hashtable_input_name'),
  inputemail: $('.hashtable_input_email'),
  hashtablediv: $('.hashtable_table'),
  hashtabletable: $('.hashtable_table table'),
  table: [],

  init: function() {
    this.put('류한경', '류한경@gmail.com');
    this.put('김나마', '김나마@gmail.com');
    this.put('박한별', '박한별@gmail.com');
    this.put('김혜지', '김혜지@gmail.com');
    this.rendering()
    this.randomInput()
  },

  event: function() {
    this.create.click(() => {
      var name = this.inputname.val();
      var email = this.inputemail.val();

      if(name == '' || email == '') {
        swal({
          type: "warning",
          title: "요소를 입력하세요.",
          timer: 1000,
          showConfirmButton: false
        });
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

  rendering: function() {
    this.hashtabletable.html('');
    this.hashtabletable.html('<tr><th>이름/키</th><th>해시 값</th><th>값</th></tr>');

    filter(this.table, (item) => {
      return item !== undefined;
    }).forEach((item) => {
        this.hashtabletable.append('<tr><td>'+item.key+'</td><td>'+item.position+'</td><td>'+item.value+'</td></tr>');
    })
  },

  // hashtable function

  put: function(key, value) {
    var position = this.loseloseHashCode(key);
    this.table[position] = {
      position: position,
      key: key,
      value: value
    };
  }
}

export default Hashtable;
