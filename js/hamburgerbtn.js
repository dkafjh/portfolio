const openBtn = document.getElementById('open-btn');
const $menuBox = document.querySelector('.menu-box');
const closeBtn = document.getElementById('close-btn');
const topBtn = document.getElementById('top-btn');

topBtn.addEventListener('click' , function() {
    window.scrollTo({top : 0 , behavior : 'smooth'});
})

openBtn.addEventListener('click' , function(){
    $menuBox.style.right = 0
})

closeBtn.addEventListener('click' , function(){
    $menuBox.style.right = '-70%'
})