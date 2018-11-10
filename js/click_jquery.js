//Click Manual SmartMiniFarm

          $(document).ready(function () {
            $('#water_pump').click(function () {
              var x = document.getElementById("water_pump");
            if(x.style.display == "none"){
              console.log('--------');
              x.style.display = "";
              $('#light-bulb2').css({ 'opacity': '0' });
        
            } else {
              console.log('11111111');
              send("on");
              $('#light-bulb2').css({ 'opacity': '1' });
              x.style.display = "none";
            }
            });
        });


// Loading Register
    $(document).ready(function () {
      $('#registerloading').on('click', function () {
        var $this = $(this);
        var loadingText = '<i class="fa fa-spinner fa-spin"></i> Loading...';
        if ($(this).html() !== loadingText) {
          $this.data('original-text', $(this).html());
          $this.html(loadingText);
        }
        setTimeout(function () {
          $this.html($this.data('original-text'));
        }, 1800);
      });
    });
  

//Popup Script Register 
    $('#BtnRegister').on('shown.bs.modal', function () {
      $('#RegisterModal').trigger('focus')
    });


//Loading login
    
      $(document).ready(function () {
        $('#loginLoading').on('click', function () {
          var $this = $(this);
          var loadingText = '<i class="fa fa-spinner fa-spin"></i> Loading...';
          if ($(this).html() !== loadingText) {
            $this.data('original-text', $(this).html());
            $this.html(loadingText);
          }
          setTimeout(function () {
            $this.html($this.data('original-text'));
          }, 1000);
        });
      });
   
  
//Popup Script
      $('#BtnLogin').on('shown.bs.modal', function () {
        $('#LoginModal').trigger('focus')
      });

      // Navbar Hide
      (function ($) {
        $(document).ready(function(){
          
        // hide .navbar first
        $(".navbar").fadeOut();
        $(".navbar").fadeIn();
        
       
      
      });
        }(jQuery));