import { setArray } from '../data/setData';
import forEach from 'lodash/forEach';

// 순차 검색
var SequentialSearch = {
  search_button: $('#search_button'),
  search_clear: $('#search_clear'),
  search_input_array: $('#search_input_array'),
  search_input_value: $('#search_input_value'),
  search_container: $('.search_container'),
  init: function() {
    this.event();
    this.inputvalue();
  },

  event: function() {
    this.search_button.click(() => {
      var array = this.search_input_array.val().split(',');
      var value = this.search_input_value;
      var index = 0;
      if(value.val() == "") {
        Materialize.toast('검색은 필수 입력입니다!', 3000, 'rounded');
        return;
      }

      this.rendering(array);

      this.search_button.attr('disabled', true);
      var func = setInterval(() => {
        if(array[index] == value.val()) {
          clearInterval(func);
          Materialize.toast(`${value.val()} 을(를) 찾았어요!`, 3000, 'rounded');
          this.search_button.attr('disabled', false);
        }
        this.rendering(array, array[index]);
        index++;

        if(index == array.length) {
          clearInterval(func);
          Materialize.toast('존재하지 않은 데이터입니다!', 3000, 'rounded');
          this.search_button.attr('disabled', false);
        }
      }, 1000);

    });

    this.search_clear.click(() => {
      this.inputvalue();
      this.search_input_value.val("")
    })
  },

  inputvalue: function() {
    var data = setArray();
    this.search_input_array.val(data);
  },

  rendering: function(data, name) {
    this.search_container.html('');
    forEach(data, (item) => {
      if(item == name) {
        this.search_container.append(`
          <div class="priority_queue_item animated bounce" style="background-color: #f03e3e;">
            <div class="priority_queue_name">
              ${item}
            </div>
          </div>
        `);
      } else {
        this.search_container.append(`
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
export default SequentialSearch;
