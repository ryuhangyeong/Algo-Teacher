import forEach from 'lodash/forEach';
import { NotItem } from '../utils/Error'; // 에러 핸들링
import Alert from '../utils/Alert'; // Materialize 알림창

// 선형 자료구조 큐(Queue) 구현
class Linear {
  constructor(create, remove, input, list, text) {
    this.create = create;
    this.remove = remove;
    this.input = input;
    this.list = list;
    this.text = text;
    this.data = [];
    // 초기값 설정
    this.init();
    // 이벤트 설정
    this.event();
  }
  init() {
    // 초기 구동시
    this.enqueue(100); // 데이터 추가
    this.rendering(); // 데이터 랜더링
    this.randomInput(); // 인풋 값 설정
  }
  event() {
    // 추가 버튼을 누르면
    this.create.click(() => this.createFunction())
    // 삭제 버튼을 누르면
    this.remove.click(() => this.removeFunction())
  }
  /* 추가 함수 */
  createFunction() {
    this.create.attr('disabled', true); // 시각화 도중에 버튼 컨트롤 불가능
    try {
      if(this.count() > 8) throw new NotItem("더 이상 추가 할 수 없어요!");
    } catch(e) {
      if(e instanceof NotItem) {
        Alert(e.message, 1000);
        this.disabled(this.create, false);
        return;
      }
    }
    // 이벤트 중복 클릭 방지를 위한 로직
    this.disabled(this.create, false);
    /* 요소 처음 위치 지정 */
    this.text.css({ 'left': '1200px', 'font-size': '50px', 'background-color': '#1c7cd6', 'color': '#fff' });
    /* 요소 처음 위치 애니메이션 지정 */
    this.text.animate({ 'left': '1200px', 'opacity': '1' });
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
    this.text.animate({'left': '500px', 'opacity': '0' });
  }

  removeFunction() {
    try {
      if(this.count() == 1) throw new NotItem("더 이상 삭제 할 수 없어요!");
    } catch(e) {
      if(e instanceof NotItem) {
        Alert(e.message, 1000);
        this.disabled(this.create, false);
        return;
      }
    }
    // 현재 movebox 중 가장 앞에 있는 DOM 선택한다.
    var front = $('.movebox').eq(0);
    this.remove.attr('disabled', true);
    // 선택된 DOM에 스타일과 애니메이션 지정
    front.css({ 'background-color': '#DC143C', 'opacity': '1' });
    front.animate({ 'left': '-100px', 'opacity': '0' });
    this.disabled(this.remove, false);
    setTimeout(() => {
      // 요소 삭제 및 재 랜더링
      this.dequeue();
      this.rendering();
    }, 500);
  }
  /* queue function */
  enqueue(value) { this.data.push(value); } // 데이터 삽입
  dequeue() { return this.data.shift(); } // 데이터 삭제
  count() { return this.data.length; } // 데이터 길이
  /* utils */
  randomInput() {
    var random = Math.floor(Math.random() * 99);
    this.input.val(random);
  }
  disabled(selector, boolean) {
    setTimeout(() => {
      selector.attr('disabled', boolean);
    }, 1000)
  }
  /* rendering */
  rendering() {
    this.list.html('');
    for(var i = 0; i < this.data.length; i++) { this.list.append(`<span class=movebox>${this.data[i]}</span>`); }
  }
}
export default Linear;
