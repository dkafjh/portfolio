const openBtn = document.getElementById('open-btn');
const $menuBox = document.querySelector('.menu-box');
const closeBtn = document.getElementById('close-btn');
<<<<<<< HEAD
const topBtn = document.getElementById('top-btn');

topBtn.addEventListener('click' , function() {
    window.scrollTo({top : 0 , behavior : 'smooth'});
})
=======
>>>>>>> fc8fd0bc86e8e637d38caedf874c67ff4d3751a1

openBtn.addEventListener('click' , function(){
    $menuBox.style.right = 0
})

closeBtn.addEventListener('click' , function(){
    $menuBox.style.right = '-70%'
})