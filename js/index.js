window.onload = function () {

    

    let touchStartY = null;
    const logo = document.querySelector('h1')
    const sections = document.querySelectorAll('section');
    const aboutBox = document.querySelector('.about-me .flex-box');
    const sublists = document.querySelector('.sub-list');
    const sublistLists = document.querySelectorAll('.sub-list li');
    const nextButton = document.querySelectorAll('.next-btn');
    const downBtns = document.querySelectorAll('.down-btn');
    const gnbLists = document.querySelectorAll('.gnb a');
    let scrollEnabled = true;
    let currentSection = 0;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let flexBoxMovedCount = 0;
    const aboutInfo = document.querySelector('.info');

    logo.addEventListener('click', function () {
        addNoneClass();
        scrollToSection(0);
    })

    sublistLists.forEach((link, index) => {
        link.addEventListener('click', e => {
            e.preventDefault();
            scrollToInfo(index);
            subNext(index);
        });
    });

    // 다운 버튼 클릭 시 다음 섹션으로 이동
    downBtns.forEach((button) => {
        button.addEventListener('click', () => {
            if (currentSection < sections.length - 1) {
                currentSection++;
                scrollToSection(currentSection);
            }
        });
    });

    gnbLists.forEach((link, idx) => {
        link.addEventListener('click', e => {
            e.preventDefault();
            scrollToSection(idx + 1);
            if (idx === 0) {
                setTimeout(() => {
                    removeNoneClass()
                }, 300);
                subNext();
            } else {
                addNoneClass();
            }
            if (idx === 3) {
                scrollToSection(6)
            }
        })
    })

    function subNext(idx) {
        nextButton.forEach((button) => {
            button.addEventListener('click', () => {
                if (idx < 3) {
                    scrollToInfo(idx + 1);
                    idx ++;
                } else {
                    return idx = 0
                }
            });
        });
    }
    subNext(0);

    function scrollToInfo(index, behavior = 'smooth') {
        aboutBox.style.transition = 'transform 1s cubic-bezier(0.5, 0, 0.5, 1)';
        aboutBox.style.transform = `translateX(-${windowWidth * index}px)`;
    }

    function removeNoneClass() {
        sublists.classList.remove('none');
    }

    function addNoneClass() {
        sublists.classList.add('none');
    }

    document.addEventListener("DOMContentLoaded", function () {
        const modal = document.getElementById('modal');
        const kakaoBtn = document.querySelector('.kakao-btn a');
        kakaoBtn.addEventListener('click', function (e) {
            e.preventDefault;
            modal.style.display = 'block'
        })

        const closeBtn = document.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none'
        })
    });

    let isScrolling = false;
    const scrollDuration = 1000; // 애니메이션 지속 시간(ms)


    function scrollToSection(sectionIndex) {
        if (sectionIndex < 0 || sectionIndex >= sections.length || isScrolling) return;
    
        isScrolling = true;
        const targetY = sectionIndex * window.innerHeight;
        const startY = window.scrollY;
        const distance = targetY - startY;
        const startTime = performance.now();
    
        function step(currentTime) {
            const elapsedTime = currentTime - startTime;
            if (elapsedTime < scrollDuration) {
                const nextPosition = easeInOutCubic(elapsedTime, startY, distance, scrollDuration);
                window.scrollTo(0, nextPosition);
                requestAnimationFrame(step);
            } else {
                window.scrollTo(0, targetY);
                currentSection = sectionIndex;
                isScrolling = false;
            }
        }
    
        requestAnimationFrame(step);
    }
    
    function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }
    
    window.addEventListener('wheel', (event) => {
        const delta = event.deltaY;
        if (delta > 0 && currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1);
        } else if (delta < 0 && currentSection > 0) {
            scrollToSection(currentSection - 1);
        }
    });
    
    let isTouching = false;

    window.addEventListener('pointerdown', (event) => {
        if (isTouching) return;
        isTouching = true;
        touchStartY = event.clientY; // 사용자 입력의 Y 좌표를 가져옴
    });
    
    window.addEventListener('pointermove', (event) => {
        if (touchStartY === null) return;
    
        const touchEndY = event.clientY;
        const deltaY = touchEndY - touchStartY;
    
        if (deltaY > 50 && currentSection > 0) {
            scrollToSection(currentSection - 1);
        } else if (deltaY < -50 && currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1);
        }
    
        // 사용자 입력이 종료되면 초기화
        touchStartY = null;
        isTouching = false;
    });
    
    window.addEventListener('pointerup', () => {
        // 사용자 입력이 종료되면 초기화
        touchStartY = null;
        isTouching = false;
    });
    
    

    const section1 = document.querySelector('.about-me');

    // Intersection Observer 생성
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // section1이 화면에 나타났을 때 실행할 함수
                removeNoneClass();
            } else {
                addNoneClass();
            }
        });
    }, { threshold: 0.7 }); // threshold는 얼마나 많은 부분이 화면 안에 들어왔을 때 감지할지를 결정합니다.

    // section1 요소를 감시
    observer.observe(section1);
}


