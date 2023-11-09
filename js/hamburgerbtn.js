const openBtn = document.getElementById('open-btn');
const $menuBox = document.querySelector('.menu-box');
const closeBtn = document.getElementById('close-btn');


openBtn.addEventListener('click' , function(){
    $menuBox.style.right = 0
})


closeBtn.addEventListener('click' , function(){
    $menuBox.style.right = '-70%'
})


const pizzaSchoolButton = document.querySelectorAll('.pizzaschool button a')

pizzaSchoolButton[0].addEventListener('click', e => {
    e.preventDefault();
    alert('준비중입니다!')
});


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
