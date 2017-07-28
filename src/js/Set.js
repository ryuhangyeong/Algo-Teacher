/*
  집합 구현체
*/

var Setbasic = {
  create: $('.set_create'),
  remove: $('.set_remove'),
  set_input: $('.set_input'),
  set_text: $('.set_text'),
  items: {},

  // 초기 설정 및 랜더링
  init: function() {
    this.items.add('류한경');
    this.items.add('류한아');
  },

  event: function() {

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
  }


}


export {
  Setbasic
}
