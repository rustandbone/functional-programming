// --------------------------------------------------------------------------
import { insertLast } from "./../../../../projectJS-3/client/lib/dom/insert";
import { bindEvent } from "./../../../../projectJS-3/client/lib/dom/bindEvent";
// 📌 [프로그래밍 패러다임]
// --------------------------------------------------------------------------
// - 명령형, 선언형 프로그래밍 비교
// - 함수, 객체 지향 프로그래밍 비교
// --------------------------------------------------------------------------

// --------------------------------------------------------------------------
// 명령형 프로그래밍

const courses = [
  {
    id: 1,
    name: " imperative programming",
  },
  {
    id: 2,
    name: "declarative programming ",
  },
];

// console.log("원본 데이터\n", courses);

// 1. 과정 배열을 순환하여 각 과정 이름의 좌우 공백 제거
// 2. 과정 배열을 순환하여 각 과정 이름 대문자화

//배열 복사, 객체 복사 - spread 연산자 사용
const updateCourses = [...courses];

for (let i = 0; i < updateCourses.length; i++) {
  const course = { ...updateCourses[i] };
  course.name = course.name.trim();
  updateCourses[i] = course;
}

for (let i = 0; i < updateCourses.length; i++) {
  const course = updateCourses[i];
  course.name = course.name.toUpperCase();
}

console.log("변형된 데이터\n", updateCourses);

//3. 배열 원소의 'name' 속성의 공백을 _로 변경하는 기능 추가
for (let i = 0; i < updateCourses.length; i++) {
  const course = updateCourses[i];
  course.name = course.name.replace("/s+/g", "_");
  //course.name = course.name.replaceAll(" ", "_");
}

// --------------------------------------------------------------------------
// 선언형 프로그래밍

const subjects = [
  {
    id: 1,
    name: " imperative programming",
  },
  {
    id: 2,
    name: "declarative programming ",
  },
];

console.log("원본 데이터\n", subjects);

// 1. 객체 이름(name) 속성 좌우 공백 제거 함수 선언
function toTrim(object) {
  const o = { ...object };
  o.name = o.name.trim();
  return o;
}

// 2. 객체 이름(name) 속성 대문자화 함수 선언
function toUpperCase(object) {
  const o = { ...object };
  o.name = o.name.toUpperCase();
  return o;
}

//3. 배열 원소의 'name' 속성의 공백을 _로 변경하는 기능 추가
function convertSpaceToUnderscore(object) {
  const o = { ...object };
  o.name = o.name.replaceAll(" ", "_");
  return o;
}

/* const updateSubjects = subjects
  .map((subject) => {
    const copySubject = toTrim(subject);
    return copySubject;
  })
  .map((subject) => {
    const copySubject = toUpperCase(subject);
    return copySubject;
  }); */

const updateSubjects = subjects
  .map(toTrim)
  .map(toUpperCase)
  .map(convertSpaceToUnderscore);
// console.log("업데이트 데이터\n", updateSubjects);

// 3. 과목 이름 "좌우 공백 제거" → "대문자화" 후, 새로운 과목 배열 생성

// --------------------------------------------------------------------------
// JavaScript 프로그래밍 패러다임
// → 함수(function)를 사용해 구현합니다.

function createCountUpButton(
  container,
  { count: initialCount = 0, step = 1, max } = {}
) {
  let count = initialCount;

  if (!container || container.nodeType !== document.ELEMENT_NODE) {
    throw new Error("container가 문서의 요소가 아닙니다.");
  }

  const countUpButton = document.createElement("button");

  const render = (newCount) => {
    countUpButton.textContent = String(newCount);
  };

  const handleCountUp = (e) => {
    if (!max || count + step <= max) {
      count += step;
    } else {
      alert(`max로 설정한 ${max}을 초과할 수 없습니다.`);
      return;
    }
    render(count);
  };

  countUpButton.setAttribute("type", "button");
  countUpButton.classList.add("CountUpButton");
  countUpButton.addEventListener("click", handleCountUp);
  render(count);
  // countUpButton.textContent = String(count);

  container.append(countUpButton);
}

const demoContainer = document.querySelector("#demo");

/* 기본 옵션: {count:1, step:2, max:10} */
createCountUpButton(demoContainer);
createCountUpButton(demoContainer, { count: 1 });
createCountUpButton(demoContainer, { count: 2, max: 5 });
createCountUpButton(demoContainer, { count: 3, step: 2, max: 10 });

//과제
//max prop을 추가하고 count 값이 max보다 커지면 사용자가 더 이상 버튼을 누를 수 없도록 막는다
//화면의 카운트는 버튼을 눌러도 max 값에 머무른다.

// --------------------------------------------------------------------------
// JavaScript 프로그래밍 패러다임
// → 클래스(class)를 사용해 구현합니다. (참고: https://mzl.la/3QrTKlF)

//붕어빵틀(생성자 함수: 클래스)
class CountUpButton {
  // static field
  static version = "0.0.1-alpha";

  //
  static defaultProps = {
    count: 0,
    step: 1,
    max: 10,
  };

  //private field
  //must be declared
  #count;
  #props = {};
  #button = null;

  // 라이프 사이클 메서드
  // 생성(create, constructor) 시점
  constructor(props) {
    console.log("생성 시점");
    // 클래스가 생성한 인스턴스의 상태
    this.#count = props.count ?? 0;
    // 인스턴스가 사용할 데이터(외부에서 사용자가 전달한 데이터와 내부의 기본 데이터가 병합)
    this.#props = { ...CountUpButton.defaultProps, ...props };
  }

  // 렌더(HTMLElement Node)
  // return data type : HTMLButtonElement
  render() {
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.textContent = String(this.#count);
    this.#button = button;

    this.bindEvents();

    return button;
  }

  // 렌더(HTML String)
  // return data type : string
  renderHTML() {
    return `
    <button type="button">${String(this.#count)}</button>
    `;
  }

  bindEvents() {
    console.log(this.#button);
    this.#button.addEventListener("click", (e) => {
      console.log(e.target);
    });
  }

  // 마운트(mount) 시점 - 실제 연결
  mount(container) {
    console.log(typeof this.render(), typeof this.renderHTML());
    //container?.append?.(this.render());
    container?.insertAdjacentHTML("beforeend", this.renderHTML());
  }

  // 성장(update) 시점
  // 소멸(unmount) 시점
  unmount() {
    console.log("소멸 시점");
  }
}

// globalThis.CountUpButton = CountUpButton;

//새로운(new) 붕어빵(객체: 인스턴스) 생성
const firstCountUp = new CountUpButton({
  count: 1,
});
const secondCountUp = new CountUpButton({
  count: 2,
  step: 6,
});
const thirdCountUp = new CountUpButton({
  count: 3,
  max: 100,
});

globalThis.firstCountUp = firstCountUp; //전역 변수 설정

console.log(firstCountUp);

const demoContainer2 = document.getElementById("demo");
// firstCountUp.mount(demoContainer2);
// secondCountUp.mount(demoContainer2);
// thirdCountUp.mount(demoContainer2);

// --------------------------------------------------------------------------
// 웹 컴포넌트(Web Components) API
// → 웹 컴포넌트를 사용해 구현합니다. (참고: https://mzl.la/3YjFdu9)

class CountUpButtonComponent extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /* html */ `
      <button type="button">9</button>
    `;
  }
}

customElements.define("count-up-button", CountUpButtonComponent);
