/*
  모든 자바스크립트와 HTML 번들링 시작점

  프로젝트 이름 : Teacher

  프로젝트 개요
    자바스크립트와 제이쿼리를 이용한 자료구조 및 알고리즘 시각화 프로젝트

  프로젝트 특징
    현대적 자바스크립트 웹 개발을 위한 webpack 개발 환경 및 개발 서버 운용
    모듈 시스템을 적극이용하여 체계적인 개발 코드 작성 및 scss를 이용한 스타일 체계적 작성

  프로젝트 공헌자
    ryuhangyeong(류한경, 웹 프론트 엔드 개발자)
    apalsl

  프로젝트 공헌하는 방법
  프로젝트 Fork 및 자신이 작성 원하는 시각화 알고리즘 및 자료구조 선정
  app.js 에서 [의존하고 있는 HTML 파일] 에 의존성 추가
    ex) import '../tree.html'
    반드시 src 폴더에 HTML 추가할 것

  스타일 파일 작성후 의존성 추가
    ex) import '../css/plus.scss';

  사용 원하는 서브파티 라이브러리 추가가능
    ex) lodash 등등

*/
// 메인 스타일 시트
import '../css/main.scss';

// 의존하고 있는 HTML 파일들
import '../queue.html';
import '../hashtable.html';
import '../graph.html';
import '../set.html';

// 의존하고 있는 3rd 라이브러리 및 프레임워크 모음
import 'jquery';

// 사용자 정의 함수 모음
import scroll from './scroll';
import fixed from './fixed';
import Slider from './Slider';
import Queue from './Queue';
import Hashtable from './Hashtable';
import Chaining from './Chaining';
import Linear from './Linear';
import Graph from './Graph';
import { Setbasic, unionSet } from './Set';

// 사용자 정의 클래스 선언 및 초기화
/* 모든 페이지에서 사용하는 공통 슬라이드 */
var slider = new Slider($('#slider_left'), $('#slider_right'), $('.slider ul'), $('.slider li'), 1000);

// 선형 탐색을 섦여하기 위한 슬라이드
var linearslider = new Slider($('#hashtable_slider_left'), $('#hashtable_slider_right'), $('.hashtable_slider ul'), $('.hashtable_slider li'), 972);
var graph = new Slider($('#graph_slider_left'), $('#graph_slider_right'), $('.graph_slider ul'), $('.graph_slider li'), 1000);
var set = new Slider($('#set_slider_left'), $('#set_slider_right'), $('.set_slider ul'), $('.set_slider li'), 1000);
// var adjacency = new Slider($('#adjacency_slider_left'), $('#adjacency_slider_right'), $('.adjacency_slider ul'), $('.adjacency_slider li'), 1000);
/* 스크롤 관련 */

scroll.ScrollMoving();
scroll.ScrollHeader();

// 슬라이드 클래스 사용
slider.event();
linearslider.event();
graph.event();
set.event();
// adjacency.event();
// fixed 버튼 함수 사용
fixed.event();

// queue
Queue.init();
Queue.event();

// hashtable

Hashtable.init();
Hashtable.event();

// Chaining 관련

Chaining.init();
Chaining.event();

// Linear
Linear.init();
Linear.event();

// Matrix

Graph.event();

// set
Setbasic.init();
Setbasic.event();

// unionset
unionSet.init();
unionSet.event();
