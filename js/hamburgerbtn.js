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
