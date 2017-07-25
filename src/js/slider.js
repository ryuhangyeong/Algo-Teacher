class Slider {
    constructor() {
      this.leftbutton = $('#slider_left');
      this.rightbutton = $('#slider_right');
      this.sliderUl = $('.slider ul');
      this.sliderCount = $('.slider li').length;
      this.currentIndex = 0;
      this.sliderUl.css('width', 1000 * this.sliderCount);
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
            'right': this.currentIndex * 1000
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
            'right': this.currentIndex * 1000
          });
        }
      })
    }
}


export default Slider;
