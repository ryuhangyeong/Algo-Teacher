// 슬라이드 재사용을 위한 클래스 선언

class Slider {
    constructor(left, right, ul, li, width) {
      this.leftbutton = left;
      this.rightbutton = right;
      this.sliderUl = ul;
      this.sliderLi = li;
      this.sliderCount = li.length;
      this.currentIndex = 0;
      this.sliderUl.css('width', width * this.sliderCount);
      this.width = width;
      this.sliderLi.css('width', width);
      this.event();
    }

    event() {
      this.leftbutton.click(() => {
        if(this.currentIndex < 1) {
          Materialize.toast('첫 슬라이드예요!', 1000, 'rounded')
          return;
        } else {
          this.currentIndex--;
          this.sliderUl.animate({
            'right': this.currentIndex * this.width
          })
        }
      });

      this.rightbutton.click(() => {
        if(this.currentIndex == this.sliderCount - 1) {
          Materialize.toast('마지막 슬라이드예요!', 1000, 'rounded')
          return;
        } else {
          this.currentIndex++;
          this.sliderUl.animate({
            'right': this.currentIndex * this.width
          });
        }
      })
    }
}


export default Slider;
