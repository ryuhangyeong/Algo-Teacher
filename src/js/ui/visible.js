var visible = {
  more: $('.more'),

  init: function() {
    this.event();
  },

  event: function() {
    this.more.hover(
      // 마우스 enter
      function() {
        $(this).addClass('animated bounce').removeClass('slideInUp');
      },

      // 마우스 out
      function() {
        $(this).removeClass('animated bounce')
      }
    );
  }
}

export default visible;
