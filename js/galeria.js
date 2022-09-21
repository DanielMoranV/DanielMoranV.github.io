const iconMenu1 = document.querySelector(".icon-menu"),
        imagenes = document.querySelectorAll('.img-galeria'),
        imagenesLigth = document.querySelector('.add-img'),
        contenedorLigth = document.querySelector('.image-light');

imagenes.forEach( imagen => {
    imagen.addEventListener('click', () => {
        showImg(imagen.getAttribute('src'))
    })
})
contenedorLigth.addEventListener('click', (e) => {
    if (e.target != imagenesLigth){
        contenedorLigth.classList.toggle('show')
        imagenesLigth.classList.toggle('showImg')
        iconMenu1.style.opacity = '1'
    }
})
const showImg = (imagen) => {
    imagenesLigth.src = imagen
    contenedorLigth.classList.toggle('show')
    imagenesLigth.classList.toggle('showImg')
    iconMenu1.style.opacity = '0'
}