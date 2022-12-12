/*Para controlar el despliegue y la ocultación del menú*/
jQuery('document').ready(function($){
    
    var menuBtn = $('.button-menu'),
        menu = $('.navigation ul');
    menuBtn.click(function() {
        if(menu.hasClass('show')) {
            menu.removeClass('show');

             
            $(".btnInicio").click(function(){
                menu.removeClass('show');
            });

            $(".btnHistoria").click(function(){
                menu.removeClass('show');
            });

            $(".btnPalmares").click(function(){
                menu.removeClass('show');
            });

            $(".btnCuestionario").click(function(){
                menu.removeClass('show');
            });

            $(".btnJuego").click(function(){
                menu.removeClass('show');
            });

        } else {
            menu.addClass('show');
            
            $(".btnInicio").click(function(){
                menu.removeClass('show');
            });

            $(".btnHistoria").click(function(){
                menu.removeClass('show');
            });

            $(".btnPalmares").click(function(){
                menu.removeClass('show');
            });

            $(".btnCuestionario").click(function(){
                menu.removeClass('show');
            });

            $(".btnJuego").click(function(){
                menu.removeClass('show');
            });
        }
    });
});