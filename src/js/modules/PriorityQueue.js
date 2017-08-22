import { setData } from '../data/setData'; // 데이터 가공을 위한 랜덤데이터 생성 함수
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';

// 우선순위 핸들링을 위한 함수 모음
function Priority() {
  // 데이터 담기는 배열
  var items = [];

  // 큐 표현 노드
  var Queue = function(element, priority) {
    this.element = element;
    this.priority = priority;
  }

  // 큐 비어있나 안비어있나?
  this.isEmpty = function(){
    return items.length == 0 ? true : false;
  }


  // 추가 로직 우선순위 비교를 통해 자신의 위치를 찾아 나감. 0 ~ 9까지 가능
  // 10이상 넘어가면 이슈가 존재한다. 추후 수정 요망
	this.enqueue = function(element, priority) {
		var queue = new Queue(element, priority);

		if(this.isEmpty()) {
			items.push(queue);
		} else {
			var added = false;

			for(var i = 0; i < items.length; i++) {
				if(queue.priority < items[i].priority) {
					items.splice(i, 0, queue);
					added = true;
					break;
				}
			}

			if(!added) {
				items.push(queue);
			}
		}
	}

  this.dequeue = function() {
    return items.shift();
  }
  // 배열 데이터 반환 함수
  this.toString = function() {
    return items;
  }
}

var PriorityQueue = {
  // 돔 제어를 위한 제이쿼리 설렉터
  priority_queue_create: $('#priority_queue_create'),
  priority_queue_remove: $('#priority_queue_remove'),
  priority_queue_name: $('#priority_queue_name'),
  priority_queue_number: $('#priority_queue_number'),
  priority_queue_container: $('.priority_queue_container'),
  priority: null,
  // 함수 초기화
  init: function() {
    this.event();
    this.inputvalue(); // 초기 인풋 값 랜더링
    this.priority = new Priority(); // 객체화
    this.priority.enqueue('김민준', 2);
    this.priority.enqueue('노현정', 5);
    this.priority.enqueue('성현중', 8);
    this.rendering(this.priority.toString(), 'basic', '');
  },

  // 이벤트 핸들러
  event: function() {
    this.priority_queue_create.click(() => {
      // 추가 버튼 클릭시
      var name = this.priority_queue_name.val();
      var number = this.priority_queue_number.val();
      var renderingData = this.priority.toString(); // 랜더링할 데이터

      if(name == "" || number == "") {
        Materialize.toast(`입력해주세요!`, 3000, 'rounded');
        this.inputvalue();
        return;
      }

      if(!this.overlapName(name)) { // 배열 내에 존재하지 않는 이름이라면 추가
        this.priority.enqueue(name, number);
        Materialize.toast(`${name} 은(는) 추가되었어요!`, 3000, 'rounded')
      } else {
        // 중복으로 인해 충돌이 일어난다면?
        Materialize.toast(`${name} 은(는) 중복입니다.`, 3000, 'rounded');
      }
      this.rendering(renderingData, 'create', name);
      this.inputvalue();

    });

    this.priority_queue_remove.click(() => {
      // 삭제 버튼 클릭시
      /*
        우선 순위의 삭제는 기본과 동일하게 가장 왼쪽 요소가 사라진다.
        구현방법에 따라 달라질 수 있다.
      */


      var front = $('.priority_queue_item').eq(0); // 제일 왼쪽 데이터 선택
      var renderingData = this.priority.toString(); // 랜더링할 데이터

      if(renderingData.length < 2) {
        Materialize.toast(`더 이상 삭제할 수 없어요!`, 3000, 'rounded');
        return;
      }
      // 왼쪽으로 슬라이드 되며 사라지는 효과
      this.priority_queue_remove.attr('disabled', true);
      front.css({
        'background-color': '#f03e3e',
        'opacity': '1'
      });
      front.animate({
        'left': '-100px',
        'opacity': '0'
      }, 2000);


      setTimeout(() => {
        this.priority.dequeue();
        this.rendering(renderingData, 'basic', '');
        Materialize.toast(`삭제되었어요!`, 3000, 'rounded');
        this.priority_queue_remove.attr('disabled', false);
      }, 2000);


    });
  },

  // 추가 직전에 이름 중복 확인을 위한 함수
  overlapName: function(name) {
    var data = this.priority.toString();
    var list = data.map((item, index) => item.element);

    // 배열 데이터에 이미 중복 존재한다면 true 그렇지 않으면 false;
    return list.indexOf(name) > -1 ? true : false;
  },

  // 추가 및 삭제, 초기 랜더링시 인풋 데이터 재 랜더링을 위한 함수
  inputvalue: function() {
    var name = setData();
    var number = Math.floor(Math.random() * 10);
    this.priority_queue_name.val(name);
    this.priority_queue_number.val(number);
  },

  // 랜더링 함수
  rendering: function(data, mode, selectName) {
    var str = "";
    this.priority_queue_container.html(''); // 재 랜더링을 위한 초기화
    switch(mode) {
      case 'basic':
        forEach(data, (item) => {
          this.priority_queue_container.append(`
            <div class="priority_queue_item">
              <div class="priority_queue_number">
                ${item.priority}
              </div>
              <div class="priority_queue_name">
                ${item.element}
              </div>
            </div>
          `);
        })
        break;
      case 'create':
        var str = "";
        forEach(data, (item) => {
          str += `<div class="priority_queue_item">`;
          if(item.element === selectName) {
            str += `
              <div class="priority_queue_number">
                ${item.priority}
              </div>
              <div class="priority_queue_name">
                <h5>${item.element}</h5>
              </div>
            `;
          } else {
            str += `
              <div class="priority_queue_number">
                ${item.priority}
              </div>
              <div class="priority_queue_name">
                ${item.element}
              </div>
            `;
          }
          str += '</div>';
        })
        this.priority_queue_container.append(str);
        break;
      default:
        return;
    }

  }
}


export default PriorityQueue;
