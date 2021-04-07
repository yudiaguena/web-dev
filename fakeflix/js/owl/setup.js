$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:false,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
})

$("#video").hover(
    ()=>{ $(this).get(0).play(); },
    ()=>{ $(this).get(0).pause(); }
);