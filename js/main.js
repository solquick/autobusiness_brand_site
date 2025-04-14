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
    let activeLi = classList.getAttribute('data-position');
    const liList = classList.getElementsByTagName('li');

    // 하나의 카드라도 왼쪽으로 이동했다면 -> position 값이 0보다 작다면,
    if ( Number(activeLi) < 0) {

        activeLi = Number(activeLi) + 260; // 포지션 이동

        // 왼쪽에 있던 카드가 오른쪽으로 갔다면, 다시 왼쪽으로 갈 수 있으므로 prev 버튼 활성화
        slidePrev.style.color = '#2f3059';
        slidePrev.classList.add('slide-prev-hover');
        slidePrev.addEventListener('click', transformPrev);
        
        // 맨 왼쪽에 현재 보이는 카드가, 맨 첫번째 카드라면, 오른쪽 즉, NEXT 로 갈 수 없으므로 NEXT 버튼 비활성화
        if (Number(activeLi) === 0) {
            slideNext.style.color = '#cfd8dc';
            slideNext.classList.remove('slide-next-hover');
            slideNext.removeEventListener('click', transformNext);
        }
        
    }

    
    classList.style.transition = 'transform 1s';
    classList.style.transform = 'translateX(' +String(activeLi) + 'px)';
    classList.setAttribute('data-position', activeLi);

}



function transformPrev(event) {
    const slidePrev = event.target; // 이벤트가 발생한 요소를 가져옴. 왼쪽 버튼
    const slideNext = slidePrev.nextElementSibling; // 오른쪽 버튼 요소 가져오기

    
    const classList = slidePrev.parentElement.parentElement.nextElementSibling; // ul 태그 선택
    let activeLi = classList.getAttribute('data-position') // data-position 값 가져오기
    const liList = classList.getElementsByTagName('li') // li 요소들 모두 가져오기

    /*
    classList.clientWidth 는 ul 태그의 실질적인 너비
    liList.length * 260 에서 260은 각 li 요소의 실질 너비 (margin 포함)
    activeLi 는 data-position 에 있는 현재 위치
    즉, liList.length * 260 + Number(activeLi) 는 현재 위치부터 오른쪽으로 나열되야 하는 나머지 카드들의 너비


    classList.clientWidth < (liList.length * 260 + Number(activeLi)) 의미는
    오른쪽으로 나열될 카드들이 넘친 상태이므로, 왼쪽으로 이동이 가능함.
    */

    if (classList.clientWidth < (liList.length * 260 + Number(activeLi)) ) { // 총 리스트 길이 + 포지션이 더 크면

        activeLi = Number(activeLi) - 260; // 포지션 값 이동
        
        // 이제 더 이상 오른쪽으로 넘치지 않을 경우, 즉 왼쪽 버튼을 누르지 않아도 될 경우 -> 총 리스트 길이 + 포지션이 더 작으면
        if (classList.clientWidth > (liList.length * 260 + Number(activeLi) )) {
            slidePrev.style.color = '#cfd8dc' // 회색 변환
            slidePrev.classList.remove('slide-prev-hover'); // slide-prev-hover 속성값 삭제
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


const slidePrevList = document.getElementsByClassName('slide-prev');

for (let i=0; i < slidePrevList.length ; i++ ) {
    // ul 태그 선택
    let classList = slidePrevList[i].parentElement.parentElement.nextElementSibling;
    let liList = classList.getElementsByTagName('li'); // ul 태그 안의 리스트 개수 가져오기

    // 카드가 ul 태그 너비보다 넘치면, 왼쪽(prev) 버튼을 활성화, 오른쪽은 현재 맨 첫카드 위치이므로 비활성화 => 반대 아닌가?
    // 240, 좌우 마진 각 10
    if (classList.clientWidth < liList.length * 260) {
        slidePrevList[i].classList.add('slide-prev-hover'); // 비활성화
        slidePrevList[i].addEventListener('click', transformPrev);
    }
    else {
        // 태그 삭제시 부모 요소에서 removeChild를 통해 삭제해야 함.
        // 따라서 1. 부모 요소 찾기 -> 2. 부모 요소의 자식 요소로 있는 prev 와 next 요소를 삭제함
        const arrowContainer = slidePrevList[i].parentElement;
        arrowContainer.removeChild(slidePrevList[i].nextElementSibling);
        arrowContainer.removeChild(slidePrevList[i]);
        
    }
} 
