window.onload = function () {
    const sections = document.querySelectorAll('section');
    const aboutInfo = document.querySelectorAll('.about-me .flex-box > li');
    const aboutBox = document.querySelector('.about-me .flex-box');
    const sublists = document.querySelector('.sub-list');
    const sublistLists = document.querySelectorAll('.sub-list li a');
    const nextButton = document.querySelectorAll('.next-btn');
    const downBtns = document.querySelectorAll('.down-btn');
    const gnbLists = document.querySelectorAll('.gnb a');
    let scrollEnabled = true;
    let currentSection = 0;
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let flexBoxMovedCount = 0;

    sublistLists.forEach((link, index) => {
        link.addEventListener('click', e => {
            e.preventDefault();
            scrollToInfo(index);
        });
    });

    // 넥스트 버튼 클릭 시 다음 섹션으로 이동
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
            scrollToSection(idx+1);
        })
    })

    nextButton.forEach((button) => {
        button.addEventListener('click', () => {
            if (flexBoxMovedCount < 4) {
                scrollToInfo(flexBoxMovedCount + 1);
                flexBoxMovedCount++;
            }
        });
    });

    function scrollToSection(index, behavior = 'smooth') {
        window.scrollTo({ top: index * windowHeight, behavior });
    }

    function scrollToInfo(index, behavior = 'smooth') {
        aboutBox.style.transition = 'transform 1s';
        aboutBox.style.transform = `translateX(-${windowWidth * index}px)`;
    }

    function removeNoneClass() {
        sublists.classList.remove('none');
    }

    function addNoneClass() {
        sublists.classList.add('none');
    }

    window.addEventListener("wheel", function(e) {
        if (scrollEnabled) {
            scrollEnabled = false;

            if (e.deltaY > 0 && currentSection < sections.length - 1) {
                scrollToSection(++currentSection);
            } else if (e.deltaY < 0 && currentSection > 0) {
                scrollToSection(--currentSection);
            }

            if (currentSection === 1) {
                setTimeout(removeNoneClass, 300);
            } else {
                setTimeout(addNoneClass, 200);
            }

            if (currentSection === 3 && (window.scrollY + windowHeight) >= sections[3].offsetTop + sections[3].offsetHeight) {
                // Reached the bottom of the section, stop scrolling
                scrollEnabled = false;
            }

            setTimeout(() => {
                scrollEnabled = true;
            }, 1500);
        }
    });
};

document.addEventListener("DOMContentLoaded", function () {
    // 버튼 요소들을 선택합니다.
    const webBtn = document.querySelector('.web-btn');
    const designBtn = document.querySelector('.design-btn');

    // 클릭 이벤트 리스너를 추가합니다.
    webBtn.addEventListener('click', () => scrollToSection('.web-pofol'));
    designBtn.addEventListener('click', () => scrollToSection('.java-pofol'));

    function scrollToSection(sectionClassName) {
        // 섹션의 클래스 이름으로 해당 섹션 요소를 찾습니다.
        const section = document.querySelector(sectionClassName);
        
        if (section) {
            // 해당 섹션 내에서 h3 요소를 찾습니다.
            const h3Element = section.querySelector('h3');
            
            if (h3Element) {
                // h3 요소가 찾아졌을 경우 해당 h3 요소로 스크롤합니다.
                h3Element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }
});
