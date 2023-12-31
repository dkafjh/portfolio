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
            if (idx === 0) {
                setTimeout(() => {
                    removeNoneClass()
                }, 300);
                subNext();
            } else {
                addNoneClass();
            }
            if (idx === 3) {
                scrollToSection(idx + 6);
            } else {
                scrollToSection(idx + 1);
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

    const topButton = document.getElementById('top-btn'); // 탑 버튼의 HTML 요소를 찾아야 함
    topButton.addEventListener('click', () => {
    window.scrollTo({
    top: 0,
    behavior: 'smooth' // 부드럽게 스크롤
    });
    currentSection = 0;
});

    window.addEventListener('wheel', (event) => {
        const delta = event.deltaY;
        if (delta > 0 && currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1);
        } else if (delta < 0 && currentSection > 0) {
            scrollToSection(currentSection - 1);
        }
    });


const webBtn = document.querySelector('.web-btn');
const designBtn = document.querySelector('.design-btn');

webBtn.addEventListener('click' , e => {
    scrollToSection(4);
})

designBtn.addEventListener('click' , e => {
    scrollToSection(6);
})

    

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


