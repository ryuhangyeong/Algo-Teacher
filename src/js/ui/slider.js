import Alert from '../utils/Alert';

// 슬라이드 재사용을 위한 클래스 선언
class Slider {
    constructor(left, right, ul, li, width) {
      this.leftbutton = left; // Left 버튼
      this.rightbutton = right; // Right 버튼
      this.sliderUl = ul;
      this.sliderLi = li;
      this.sliderCount = li.length;
      this.currentIndex = 0;
      this.sliderUl.css('width', width * this.sliderCount); // 슬라이드 전체 길이 계산
      this.width = width;
      this.sliderLi.css('width', width);
      this.event();
    }

    event() {
      this.leftbutton.click(() => {
        if(this.currentIndex < 1) {
          Alert('첫 슬라이드입니다!', 1000);
          return;
        } else {
          this.currentIndex--;
          this.sliderUl.animate({ 'right': this.currentIndex * this.width })
        }
      });

      this.rightbutton.click(() => {
        if(this.currentIndex == this.sliderCount - 1) {
          Alert('마지막 슬라이드입니다!', 1000);
          return;
        } else {
          this.currentIndex++;
          this.sliderUl.animate({ 'right': this.currentIndex * this.width });
        }
      })
    }
}

export default Slider;
