const openBtn = document.getElementById('open-btn');
const $menuBox = document.querySelector('.menu-box');
const closeBtn = document.getElementById('close-btn');

openBtn.addEventListener('click' , function(){
    $menuBox.style.right = 0
})

closeBtn.addEventListener('click' , function(){
    $menuBox.style.right = '-70%'
})