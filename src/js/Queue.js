import { forEach } from 'lodash';

var Queue = {
  /* variable */
  create: $('.queue_create'),
  remove: $('.queue_remove'),
  input: $('.queue_input'),
  list: $('.queue_list'),
  text: $('.queue_text'),
  data: [],

  /* 초기화 */
  init: function() {
    this.enqueue(100); // 데이터 추가
    this.rendering(); // 데이터 랜더링
    this.randomInput(); // 인풋박스 랜덤 값 설정
  },

  /* queue function */

  enqueue: function(value) {
    this.data.push(value);
  },

  dequeue: function() {
    return this.data.shift();
  },

  count: function() {
    return this.data.length;
  },

  /* 이벤트 초기화 */
  event: function() {
    // 추가 버튼을 누르는 경우 실행
    this.create.click(() => {
      // 이벤트 중복 방지
      this.create.attr('disabled', true);
      if(this.count() > 8) {
        swal({
          type: "warning",
          title: "더 이상 추가할 수 없어요!",
          timer: 1000,
          showConfirmButton: false
        });
        this.disabled(this.create, false);
        return;
      }
      // 이벤트 중복 클릭 방지를 위한 로직
      this.disabled(this.create, false);
      /* 요소 처음 위치 지정 */
      this.text.css({
        'left': '1200px',
        'font-size': '50px',
        'background-color': '#4B9BE1',
        'color': '#fff'
      });

      /* 요소 처음 위치 애니메이션 지정 */
      this.text.animate({
        'left': '1200px',
        'opacity': '1'
      });

      /* 애니메이션 실행시 입풋값 설정하기 */
      this.text.html(this.input.val())

      setTimeout(() => {
        /* 요소에 추가하기 */
        this.enqueue(this.input.val());
        // 랜더링
        this.rendering();
        // 인풋 초기화
        this.input.val("");
        // 랜덤 함수 생성
        this.randomInput();
        // 초기화
        this.text.html("");
      }, 1000);

      /* 요소 이동 위치 지정 */
      this.text.animate({
        'left': '500px',
        'opacity': '0'
      });
    })
    // 삭제 버튼을 누르는 경우 실행
    this.remove.click(() => {

      if(this.count() == 1) {
        swal({
          type: "warning",
          title: "삭제할 요소가 없어요!",
          timer: 1000,
          showConfirmButton: false
        });
        this.disabled(this.create, false);
        return;
      }

      // 현재 movebox 중 가장 앞에 있는 DOM 선택한다.
      var front = $('.movebox').eq(0);
      this.remove.attr('disabled', true);

      // 선택된 DOM에 스타일과 애니메이션 지정
      front.css({
        'background-color': '#DC143C',
        'opacity': '1'
      });

      front.animate({
        'left': '-100px',
        'opacity': '0'
      });

      this.disabled(this.remove, false);
      setTimeout(() => {
        // 요소 삭제 및 재 랜더링
        this.dequeue();
        this.rendering();
      }, 500);
    })
  },

  /* utils */
  randomInput: function() {
    var random = Math.floor(Math.random() * 99);
    this.input.val(random);
  },

  disabled: function(selector, boolean) {
    setTimeout(() => {
      selector.attr('disabled', boolean);
    }, 1000)
  },
  /* rendering */
  rendering: function() {
    this.list.html('');
    forEach(this.data, (item) => {
      this.list.append('<span class=movebox>'+item+'</span>');
    })
  }
}

export default Queue;
