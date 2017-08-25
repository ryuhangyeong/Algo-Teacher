import Linear from './Linear';
import forEach from 'lodash/forEach';
import Error from '../utils/Error'; // 에러 핸들링
import Alert from '../utils/Alert'; // Materialize 알림창

// LinearBasic 를 가지고 온 후에 오버라이딩한다. 로직 대부분이 비슷하여 재사용한다.
class LinearStack extends Linear {
  /*
    큐는 shift 메서드
    스택은 pop 메서드
  */
  dequeue() { return this.data.pop() }
  // 삭제부분 DOM 선택 및 애니메이션 변화
  removeFunction() {
    // 유효성
    try {
      if(this.count() == 1) {

        throw new Error('NOT REMOVE', '더 이상 삭제할 수 없어요!');
      }
    } catch(e) {
      if(e.name === "NOT REMOVE") {
        Alert(e.message, 3000);
        this.disabled(this.create, false);
        return;
      }
    }
    // 요소에서 가장 오른쪽 요소를 선택한다.
    var end = $('.movebox').eq(this.data.length - 1);
    this.remove.attr('disabled', true);
    // 선택된 DOM에 스타일과 애니메이션 지정
    end.css({ 'background-color': '#DC143C', 'opacity': '1' });
    end.animate({ 'left': '100px', 'opacity': '0' });
    this.disabled(this.remove, false);
    setTimeout(() => {
      // 요소 삭제 및 재 랜더링
      this.dequeue();
      this.rendering();
    }, 500);
  }
}
export default LinearStack;
