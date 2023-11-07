window.onload = function () {
        const sections = document.querySelectorAll('section');
        console.log(sections.length)
        const windowHeight = window.innerHeight;
    
        // 스크롤 시 각 섹션으로 이동하는 함수
        function scrollToSection(index) {
            window.scrollTo({
                top: index * windowHeight,
                behavior: 'smooth'
            });
        }
    
        // 마우스 휠 이벤트 처리
        let scrollEnabled = true;
        window.addEventListener("wheel", function(e) {
            if (scrollEnabled) {
                scrollEnabled = false;
                if (e.deltaY > 0) {
                    for (let i = 0; i < sections.length; i++) {
                        if (sections[i].getBoundingClientRect().top > windowHeight / 2) {
                            scrollToSection(i);
                            break;
                        }
                    }
                } else {
                    for (let i = sections.length - 1; i >= 0; i--) {
                        if (sections[i].getBoundingClientRect().top < -windowHeight / 2) {
                            scrollToSection(i);
                            break;
                        }
                    }
                }
                setTimeout(() => {
                    scrollEnabled = true;
                }, 2000); // 스크롤 이벤트 간격 조절
            }
    });

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

    const modal = document.getElementById('modal');
    const kakaoBtn = document.querySelector('.kakao-btn a');
    kakaoBtn.addEventListener('click', function(e){
        e.preventDefault;
        modal.style.display = 'block'
    })

    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none'
    })
}
        // 추가 스크롤 이벤트 및 인터랙션을 원하는 대로 추가하세요.