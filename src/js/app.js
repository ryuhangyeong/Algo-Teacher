
// 메인 스타일 시트
import '../css/main.scss';

import '../img/ryuhangyeong.jpg';
import '../img/apalsl.jpg';
import '../img/tree.jpg';

// 의존하고 있는 HTML 파일들
import '../contribution.html';
import '../hashtable.html';
import '../queue.html';
import '../graph.html';
import '../set.html';
import '../stack.html';
import '../linked.html';
import '../tree.html';
// 의존하고 있는 3rd 라이브러리 및 프레임워크 모음
import 'jquery';

/* ui 관련 자바스크립트 파일 */
import scroll from './ui/scroll';
import Slider from './ui/slider';
import visible from './ui/visible';

/* modules */
import LinearBasic from './modules/LinearBasic';
import LinearStack from './modules/LinearStack';

import Hashtable from './modules/Hashtable';
import Linearsearch from './modules/Linearsearch';
import Chaining from './modules/Chaining';
import Graph from './modules/Graph';
import { Setbasic, intersectionSet, unionSet } from './modules/Set';

import Tree from './modules/Tree';

// 모든 페이지 공통 스크롤 이벤트
scroll.ScrollMoving();
scroll.ScrollWindow();
// 모든 페이지 공통 슬라이드
new Slider($('#slider_left'), $('#slider_right'), $('#slider ul'), $('#slider li'), 1000);
// 선형 탐색법 설명 슬라이드
new Slider($('#linear_slider_left'), $('#linear_slider_right'), $('#linear_slider ul'), $('#linear_slider li'), 1000);
visible.init();

// modules

/* 스택과 큐 코드 재사용을 위한 클래스화 */
new LinearBasic($('#queue_create'), $('#queue_remove'), $('#queue_input'), $('#queue_list'), $('#queue_text'))
new LinearStack($('#stack_create'), $('#stack_remove'), $('#stack_input'), $('#stack_list'), $('#stack_text'))

Hashtable.init();
Linearsearch.init();
Chaining.init();
Graph.event();
  // 집합관련
  Setbasic.init();
  intersectionSet.init();
  unionSet.init();

Tree.init();
