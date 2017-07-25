class Slider {
    constructor(left, right, ul, li, width) {
      this.leftbutton = left;
      this.rightbutton = right;
      this.sliderUl = ul;
      this.sliderCount = li.length;
      this.currentIndex = 0;
      this.sliderUl.css('width', 1000 * this.sliderCount);
      this.width = width;
    }

    event() {
      this.leftbutton.click(() => {
        if(this.currentIndex < 1) {
          swal({
            type: "warning",
            title: "첫 페이지",
            timer: 1000,
            showConfirmButton: false
          });
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
          swal({
            type: "warning",
            title: "마지막 페이지",
            timer: 1000,
            showConfirmButton: false
          });
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
