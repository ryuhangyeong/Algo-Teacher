// 해시테이블 구현시 데이터 반환

function Randompeople() {
  var list = [
      {
        name: '류한경',
        email: '류한경@gmail.com'
      },
      {
        name: '하하',
        email: '하하@gmail.com'
      },
      {
        name: '김혜지',
        email: '김혜지@gmail.com'
      },
      {
        name: '정다정',
        email: '정다정@gmail.com'
      },
      {
        name: '나매력',
        email: '나매력@gmail.com'
      },

      {
        name: '김미영',
        email: '김미영@gmail.com'
      },
      {
        name: '박지수',
        email: '박지수@gmail.com'
      },
      {
        name: '김나나',
        email: '김나나@gmail.com'
      },
      {
        name: '류수진',
        email: '류수진@gmail.com'
      },
      {
        name: '김지영',
        email: '김지영@gmail.com'
      },
      {
        name: '윤미인',
        email: '윤미인@gmail.com'
      },
      {
        name: '나민',
        email: '나민@gmail.com'
      },
      {
        name: '김수영',
        email: '김수영@gmail.com'
      },
      {
        name: '하동훈',
        email: '하동훈@gmail.com'
      },
      {
        name: '박한이',
        email: '박한이@gmail.com'
      },
      {
        name: '김태훈',
        email: '김태훈@gmail.com'
      },
      {
        name: '박한별',
        email: '박한별@gmail.com'
      },
      {
        name: '박다빈',
        email: '박다빈@gmail.com'
      },
      {
        name: '류한이',
        email: '류한이@gmail.com'
      },
    ];

    var random = Math.floor(Math.random() * (list.length));
    return list[random];
}

export default Randompeople;
