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
}
        // 추가 스크롤 이벤트 및 인터랙션을 원하는 대로 추가하세요.