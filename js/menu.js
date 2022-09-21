const iconMenu = document.querySelector(".icon-menu"),
        menu = document.querySelector(".menu-nav");
iconMenu.addEventListener('click',() => {
    menu.classList.toggle('spread');
})
window.addEventListener('click', e =>{
    if(menu.classList.contains('spread') && e.target != menu && e.target != iconMenu){
        menu.classList.toggle('spread');
    }
})

