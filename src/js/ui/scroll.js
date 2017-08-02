var scroll = {
  ScrollWindow: () => {
    $(window).scroll(() => {
      var top = $(window).scrollTop(); // 스크롤 위치 0에 가까울수록 가장 윗쪽
      var home = $('.home').height();
      var index_modules = $('#index_modules'); // 모듈 리스트 컨테이너

      var animationCheck = (home + top) > home ? true : false; // boolean 변수

      // 스크롤 감지후에 애니메이션 추가 및 삭제
      if(animationCheck) {
        index_modules.addClass('animated zoomIn')
      } else {
        index_modules.removeClass('zoomIn')
      }
    });


  },
  ScrollMoving: () => {
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
  }
}

export default scroll;
