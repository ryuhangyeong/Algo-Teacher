var scroll = {
  ScrollMoving: function() {
    // 해시 값을 인식하여 원하는 id값으로 이동하는 함수
    $('a[href*=\\#]:not([href=\\#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
      && location.hostname == this.hostname) {
        var $target = $(this.hash);
        $target = $target.length && $target
        || $('[name=' + this.hash.slice(1) +']');
        if ($target.length) {
          var targetOffset = $target.offset().top;
          $('html,body')
          .animate({scrollTop: targetOffset}, 1000);
         return false;
        }
      }
    });
  },
  ScrollHeader: function() {
    // 스크롤 높이를 계산하여 특정 높이 이상일 경우 스타일 클래스 추가하는 함수
    $(window).scroll(function() {
      if($(document).scrollTop() > 10) {
        $('#logo').addClass('shrink');
      } else {
        $('#logo').removeClass('shrink');
      }
    })
  }
}

export default scroll;
