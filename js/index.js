window.onload = function () {
	const logo = document.querySelector('h1')
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

    logo.addEventListener('click', function(){
        scrollToSection(0);
    })
	
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
			if(idx === 0) {
				setTimeout(() => {
					removeNoneClass()
				}, 300);
			}else{
				addNoneClass();
			}
			if(idx === 3) {
				scrollToSection(6)
			}
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
        aboutBox.style.transition = 'transform 1s cubic-bezier(0.5, 0, 0.5, 1)';
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

            setTimeout(() => {
                scrollEnabled = true;
            }, 1500);
        }
		console.log(currentSection);
		console.log(window.scrollY + windowHeight);
		console.log(sections[3].offsetTop);
    });
		document.addEventListener("DOMContentLoaded", function () {
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
		});
};



