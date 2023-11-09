var Slider = function (id, _web, _tab, _mobile, spacing) {
    var containerWidth = 0;
    var sliderItemWidth = 0;
    var totalCount = 0;
    var spacing = spacing || 10;
    var display = _web;
    var left = 0;
    var interval;

    var DOM = {
        container: function (id) {
            var dom = document.querySelector('#' + id);
            dom.className = 's-container';
            dom.style.position = 'relative';
            dom.style.overflow = 'hidden';
            return dom;
        },
        slider: function (container) {
            totalCount = container.children.length;

            var dom = document.createElement('div');
            dom.className = 'slider'
            dom.style.position = 'relative';
            dom.style.overflow = 'hidden';
            dom.style.height = '100%';
            dom.style.left = 0;
            dom.style.transition = 'left .5s';
            return dom;
        }
    }

    // DOM 만들기
    var container = DOM.container(id);
    var slider = DOM.slider(container);
    var temp = container.innerHTML;
    container.innerHTML = '';
    slider.innerHTML = temp;
    container.appendChild(slider);
    var items = document.querySelector('#' + id + ' .slider').children;
    for (var i = 0; i < items.length; i++) {
        items[i].style.float = 'left';
        items[i].style.height = '100%';
        items[i].style.width = (sliderItemWidth - spacing) + 'px';
        items[i].style['margin-right'] = spacing + 'px'; // 간격
    }

    // 화면 사이즈 수정시 발생하는 이벤트
    function resize() {
        left = 0;
        document.querySelector('#' + id + ' .slider').style.left = left + 'px';

        var innerWidth = window.innerWidth;
        if (innerWidth >= 1000) {
            setDisplayCount(_web);
        } else if (innerWidth < 1000 && innerWidth >= 768) {
            setDisplayCount(_tab);
        } else if (innerWidth < 768) {
            setDisplayCount(_mobile);
        }

        if (display === 1) {
            spacing = 0;
            var items = document.querySelector('#' + id + ' .slider').children;
            for (var i = 0; i < items.length; i++) {
                items[i].style.width = sliderItemWidth + 'px';
                items[i].style['margin-right'] = 0 + 'px'; // 간격
            }
        }
    }

    // 디스플레이 갯수 설정 함수
    function setDisplayCount(count) {
        display = count;

        containerWidth = container.offsetWidth + spacing;
        sliderItemWidth = containerWidth / display;

        document.querySelector('#' + id + ' .slider').style.width = totalCount * sliderItemWidth + spacing * totalCount + 'px';
        var items = document.querySelector('#' + id + ' .slider').children;
        for (var i = 0; i < items.length; i++) {
            items[i].style.width = (sliderItemWidth - spacing) + 'px';
        }
    }

    // 반응형 디스플레이 갯수 조절
    var isResponsive = _tab != undefined && _mobile != undefined;
    if (isResponsive) {
        window.onresize = resize;
    }
    resize();

    return {
        setDisplayCount: setDisplayCount,
        move: function (index) {
            left = (-1) * sliderItemWidth * index;
            document.querySelector('#' + id + ' .slider').style.left = left + 'px';
        },
        prev: function () {
            left += sliderItemWidth;
            var limit = 0;
            if (left > limit) {
                left = limit;
            }
            document.querySelector('#' + id + ' .slider').style.left = left + 'px';
        },
        next: function () {
            left -= sliderItemWidth;
            var limit = (-1) * sliderItemWidth * (totalCount - display);
            if (left < limit) {
                left = limit;
            }
            document.querySelector('#' + id + ' .slider').style.left = left + 'px';
        },
        stop: function () {
            clearInterval(interval);
        }
    }
}

var slider = new Slider('slider', 3, 2, 1, 10);

const skillLists = document.querySelectorAll('.skill-list');

function makeChart(percent, classname, color) {
    let i = 1;
    let chartFn = setInterval(function () {
        if (i < percent) {
            colorFn(i, classname, color);
            i++;
        }
    }, 10);
}

function colorFn(i, classname, color) {
    if (classname) { // classname이 null 또는 undefined가 아닌 경우에만 실행
        classname.style.backgroundImage = `conic-gradient(${color} 0% ${i}%, #dedede ${i}% 100%)`;
    }
}


function viewChart(event) {
    const skillList = event.currentTarget;

    // Check if the event handler is already running
    if (skillList.getAttribute('data-running') === 'true') {
        return;
    }

    skillList.setAttribute('data-running', 'true');

    const chart = skillList.querySelector('.chart');
    const $img = skillList.querySelector('img');

    $img.style.opacity = 1;
    chart.style.opacity = 0.9;

    const chart90 = skillList.querySelector('.doughnut90');
    const chart85 = skillList.querySelector('.doughnut85');
    const chart80 = skillList.querySelector('.doughnut80');
    const chart75 = skillList.querySelector('.doughnut75');
    const chart70 = skillList.querySelector('.doughnut70');

    makeChart(90, chart90, '#F7819F');
    makeChart(85, chart85, '#F7819F');
    makeChart(80, chart80, '#F7819F');
    makeChart(75, chart75, '#F7819F');
    makeChart(70, chart70, '#F7819F');

    // Reset the data-running attribute after 2 seconds to allow re-triggering
    setTimeout(() => {
        $img.style.opacity = 1;
        chart.style.opacity = 0;
        skillList.setAttribute('data-running', 'false');
    }, 2000); // 2초 후에 중복 실행 허용을 위해 데이터 속성을 재설정
}

skillLists.forEach((skillList) => {
    skillList.addEventListener('mouseover', viewChart);
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
