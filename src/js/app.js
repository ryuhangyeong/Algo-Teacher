// 메인 스타일 시트
import '../css/main.scss';

// 의존하고 있는 HTML 파일들
import '../stack.html';

// 의존하고 있는 3rd 라이브러리 및 프레임워크 모음
import 'jquery';

// 사용자 정의 함수 모음
import scroll from './scroll';

/* 스크롤 관련 */
scroll.ScrollMoving();
scroll.ScrollHeader();
