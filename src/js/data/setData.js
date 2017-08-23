// 집합과 관련된 데이터 모음

function setData() {
  var list = ['류한경','하하','김혜지','정다정','나매력','김미영','박지수','김나나','류수진','김지영','윤미인','나민','김수영','하동훈','박한이','김태훈','박태훈','박한별','박다빈','류한이','정준하','정형돈','양세형','유재석','노홍철','최홍'];

  var random = Math.floor(Math.random() * (list.length));

  return list[random];
}

function setArray() {
  var list = [
    ['류한경', '하하', '김혜지', '정준하', '매화', '김경영', '김하루'],
    ['하하', '김혜지', '최홍', '김자바'],
    ['노홍철', '유재석', '정준하', '박한이', '하동훈', '나민', '류수진'],
    ['하하', '노홍철', '유재석', '김혜지'],
    ['윤미인', '김수영', '박한별', '노홍철', '류한아', '한명'],
    ['유재석', '정형돈', '노홍철', '정준하', '박명수', '길', '전진', '양세형', '하하'],
    ['박다빈', '김태훈', '박준서', '김민준']
  ];

  var random = Math.floor(Math.random() * (list.length));

  return list[random];
}

function setRandomArray(idxSize, range) {
	/* 랜덤 수를 가진 배열을 반환하는 메서드.
	 * idxSize : 반환받을 배열 사이즈,
	 * range : 랜덤 수의 범위
	 */
	var indexs = new Array(); // 랜덤 인덱스 배열
	var hasValue = false; //같은 값이 있는지 확인하기 위한 변수

	if(idxSize > range) {
		console.error('index size > range');
		return indexs;
	}

	while(indexs.length < idxSize) {
		hasValue = false;
		var temp = parseInt(Math.random() * range);
		for(var c = 0; c < indexs.length; c++) {
			if(temp == indexs[c]) {
				hasValue = true;
				break;
			}
		}
		if(hasValue == false) {
			indexs.push(temp);
		}
	}
	return indexs;
}

export {
  setData,
  setArray,
  setRandomArray
}
