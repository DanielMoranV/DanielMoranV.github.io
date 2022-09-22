/**
 * Cargando..
 */

window.onload = function() {
    let contenedor = document.querySelector('.contenedor-carga')
    contenedor.style.visibility = 'hidden'
    contenedor.style.opacity = '0'
    console.log(contenedor)
}
/*
 * Ver mas...
 */
let textHide1 = document.querySelector('#textHide1')
let textHide2 = document.querySelector('#textHide2')
let textHide1_link = document.querySelector('#textHide1_link')
let textHide2_link = document.querySelector('#textHide2_link')

textHide1_link.addEventListener('click', toggleText1 )
function toggleText1(){
    textHide1.classList.toggle('noticia-show')
    if(textHide1.classList.contains('noticia-show')){
        textHide1_link.innerHTML="Mostrar menos"
    } else {
        textHide1_link.innerHTML="Mostrar mas"
    }
}

textHide2_link.addEventListener('click', toggleText2)
function toggleText2(){
    textHide2.classList.toggle('noticia-show')
    if(textHide2.classList.contains('noticia-show')){
        textHide2_link.innerHTML="Mostrar menos"
    } else {
        textHide2_link.innerHTML="Mostrar mas"
    }
}

/**
 * Scroll animado
 */

let scrollShow = document.querySelectorAll(".scroll-show")
function showScroll(){
    let scrollTop = document.documentElement.scrollTop
    scrollShow.forEach(element => {
        let alturaScroll = element.offsetTop
        if(alturaScroll - 600 < scrollTop){
            element.style.opacity = 1
            element.classList.add("mostrarArriba")
        }
    });
}
window.addEventListener('scroll',showScroll)