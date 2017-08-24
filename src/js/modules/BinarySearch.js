import { setRandomArray } from '../data/setData';
import forEach from 'lodash/forEach';

var BinarySearch = {
  binary_search_button: $('#binary_search_button'),
  binary_search_clear: $('#binary_search_clear'),
  binary_search_input_array: $('#binary_search_input_array'),
  binary_search_input_value: $('#binary_search_input_value'),
  binary_search_container: $('.binary_search_container'),

  init: function() {
    this.event();
    this.inputvalue();
  },

  event: function() {
    this.binary_search_button.click(() => {
      var data = this.binary_search_input_array.val().split(',');
      var value = this.binary_search_input_value;

      if(value.val() == "") {
        Materialize.toast('데이터를 입력하세요!', 3000, 'rounded');
        value.focus();
        return;
      }

      if(!(data.indexOf(value.val()) > -1)) {
        Materialize.toast('존재하지 않은 데이터입니다!', 3000, 'rounded');
        return;
      }
      // mid 표시
      var mid = Math.floor(data.length / 2);
      this.rendering(data, data[mid]);
      this.binary_search_button.attr('disabled', true);

      var func = setInterval(() => {
        var mid = Math.floor(data.length / 2);

        if(parseInt(value.val()) < parseInt(data[mid])) {
          data = data.splice(0, mid);
          mid = Math.floor(data.length / 2);
          this.rendering(data, data[mid]);
        } else if(parseInt(value.val()) > parseInt(data[mid])){
          data = data.splice(mid, data.length - mid);
          mid = Math.floor(data.length / 2);
          this.rendering(data, data[mid]);
        } else {
          // 같은 경우
          Materialize.toast('데이터를 찾았습니다!', 3000, 'rounded');
          this.binary_search_button.attr('disabled', false);
          clearInterval(func)
        }
      }, 3000);
    });

    this.binary_search_clear.click(() => {
      this.inputvalue();
    })
  },

  inputvalue() {
    var num = Math.floor(Math.random()*(10-5+1))+5; // 5~10까지 난수 발생
    this.binary_search_input_array.val(setRandomArray(num, 100).sort((a, b) => a - b));
  },

  rendering: function(data, name) {
    this.binary_search_container.html('');
    forEach(data, (item) => {
      if(item == name) {
        this.binary_search_container.append(`
          <div class="priority_queue_item animated bounce" style="background-color: #f03e3e;">
            <div class="priority_queue_name">
              ${item}
            </div>
          </div>
        `);
      } else {
        this.binary_search_container.append(`
          <div class="priority_queue_item">
            <div class="priority_queue_name">
              ${item}
            </div>
          </div>
        `);
      }
    });
  }
}

export default BinarySearch;
