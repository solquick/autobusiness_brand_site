/* 주석 */

const backToTop = document.getElementById('backtotop');

const checkScroll = () => {
    
    /* 웹페이지가 얼마나 스크롤 되어있는지를 확인하는 값 */
    let pageYOffset = window.pageYOffset;

    /* 0이이 아니면, 즉 조금이라도 내려와있으면, backtotop에 show 라는 클래스를 추가하기 */
    if (pageYOffset !== 0) {
        backToTop.classList.add('show');
    }
    /* 0이면, backtotop에 show 라는 클래스를 삭제하기 */
    else {
        backToTop.classList.remove('show');
    }

}

const moverBackToTop = () => {
    if (window.pageYOffset > 0) {
        window.scrollTo({top:0, behavior:'smooth'}); /* 맨 위로, 스무스하게 올라가기 */
    }
}


/* 브라우저에서 스크롤 할 때마다 checkScroll 함수를 호출 */
window.addEventListener('scroll', checkScroll);

/* 백투탑을 클릭 할 때마다 checkScroll 함수를 호출 */
backToTop.addEventListener('click', moverBackToTop);





/* ================================== */
function transformNext(event) {
    const slideNext = event.target;
    const slidePrev = slideNext.previousElementSibling;

    const classList = slideNext.parentElement.parentElement.nextElementSibling;
    let activeLi = Number(classList.getAttribute('data-position'));
    const liList = classList.getElementsByTagName('li');

    // 현재 위치에서 왼쪽으로 이동 가능한 경우
    if (classList.clientWidth < (liList.length * 260 + activeLi)) {
        activeLi -= 260;

        // 더 이상 왼쪽으로 이동할 수 없으면 버튼 비활성화
        if (classList.clientWidth > (liList.length * 260 + activeLi)) {
            slideNext.style.color = '#cfd8dc';
            slideNext.classList.remove('slide-next-hover');
            slideNext.removeEventListener('click', transformNext);
        }

        // 오른쪽으로 이동할 수 있으므로 이전 버튼 활성화
        slidePrev.style.color = '#2f3059';
        slidePrev.classList.add('slide-prev-hover');
        slidePrev.addEventListener('click', transformPrev);
    }

    classList.style.transition = 'transform 1s';
    classList.style.transform = 'translateX(' + String(activeLi) + 'px)';
    classList.setAttribute('data-position', activeLi);
}

function transformPrev(event) {
    const slidePrev = event.target;
    const slideNext = slidePrev.nextElementSibling;

    const classList = slidePrev.parentElement.parentElement.nextElementSibling;
    let activeLi = Number(classList.getAttribute('data-position'));
    const liList = classList.getElementsByTagName('li');

    // 현재 위치가 왼쪽으로 이동된 상태라면 오른쪽으로 되돌리기 가능
    if (activeLi < 0) {
        activeLi += 260;

        if (activeLi === 0) {
            slidePrev.style.color = '#cfd8dc';
            slidePrev.classList.remove('slide-prev-hover');
            slidePrev.removeEventListener('click', transformPrev);
        }

        slideNext.style.color = '#2f3059';
        slideNext.classList.add('slide-next-hover');
        slideNext.addEventListener('click', transformNext);
    }

    classList.style.transition = 'transform 1s';
    classList.style.transform = 'translateX(' + String(activeLi) + 'px)';
    classList.setAttribute('data-position', activeLi);
}

// 초기 버튼 설정 (슬라이드 크기 판단 후 버튼 연결)
const slidePrevList = document.getElementsByClassName('slide-prev');
const slideNextList = document.getElementsByClassName('slide-next');

for (let i = 0; i < slidePrevList.length; i++) {
    const classList = slidePrevList[i].parentElement.parentElement.nextElementSibling;
    const liList = classList.getElementsByTagName('li');

    // data-position 초기값이 없으면 0으로 설정
    if (!classList.getAttribute('data-position')) {
        classList.setAttribute('data-position', '0');
    }

    // 슬라이드 영역이 넘칠 경우에만 버튼 작동
    if (classList.clientWidth < liList.length * 260) {
        slidePrevList[i].classList.add('slide-prev-hover');
        slidePrevList[i].addEventListener('click', transformNext); // ← 방향인데 → 이동 기능
        slideNextList[i].classList.add('slide-next-hover');
        slideNextList[i].addEventListener('click', transformPrev); // → 방향인데 ← 이동 기능
    } else {
        const arrowContainer = slidePrevList[i].parentElement;
        arrowContainer.removeChild(slidePrevList[i].previousElementSibling);
        arrowContainer.removeChild(slidePrevList[i]);
        
    }
}
