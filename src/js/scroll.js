// /* 해시값에 의한 스크롤 이동 함수 */
// function ScrollMoving() {
//   $('a[href*=\\#]:not([href=\\#])').click(function() {
//     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
//     && location.hostname == this.hostname) {
//       var $target = $(this.hash);
//       $target = $target.length && $target
//       || $('[name=' + this.hash.slice(1) +']');
//       if ($target.length) {
//         var targetOffset = $target.offset().top;
//         $('html,body')
//         .animate({scrollTop: targetOffset}, 1000);
//        return false;
//       }
//     }
//   });
// }
//
// /* 스크롤 높이에 따른 클래스 추가,삭제 함수 */
// function ScrollHeader() {
//   $(window).scroll(function() {
//     if($(document).scrollTop() > 10) {
//       $('#logo').addClass('shrink');
//     } else {
//       $('#logo').removeClass('shrink');
//     }
//   })
// }

var scroll = {
  ScrollMoving: function() {
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
