 var chart;

 function iniciar(){
   carregarRam();
   carregarUsuario();
   //selecionarCaixa();
   carregarhd();
}
 setInterval(iniciar,5000);



 function selecionarCaixa(evt, caixaNr) {
   // Declare all variables
   var i, tabcontent, tablinks;

   // Get all elements with class="tabcontent" and hide them
   tabcontent = document.getElementsByClassName("tabcontent");
   for (i = 0; i < tabcontent.length; i++) {
     tabcontent[i].style.display = "none";
   }

   // Get all elements with class="tablinks" and remove the class "active"
   tablinks = document.getElementsByClassName("tablinks");
   for (i = 0; i < tablinks.length; i++) {
     tablinks[i].className = tablinks[i].className.replace(" active", "");
   }

   // Show the current tab, and add an "active" class to the button that opened the tab
 document.getElementById(caixaNr).style.display = "block";
 evt.currentTarget.className += " active";
 };

 
 function carregarUsuario() {
   $.ajax({
     cache: false,
     method: "get",
     url: "/dados/nomeBanco",
     done: function (data) {
       console.log('sera se aparece o nome dele?');
       $('#spUser').html(data.nomeBanco);
       $('#spUser').show();
     },
     error: function (e) {
       window.location.href = 'login.html';
     }
   });
 }

 function carregarRam(){
   console.log('ram ram')
   $.ajax({
     cache: false,
     method: "get",
     url: "/dados/ram",
     done: function (data) {
       //console.log("cade a ram")
       $('#idRam').html(data.ram);
     },
     error: function (e) {
      //console.log("errou");
     }
 });
}

function carregarhd(){
   //console.log('cade o hd?')
   $.ajax({
     cache: false,
     method: "get",
     url: "/dados/hd",
     done: function (data) {
      // console.log("se chegar aqui, pegou hd")
       $('#idHd').html(data.hd);
     },
     error: function (e) {
      //console.log("errou");
     }
 });
}

function carregarComp(){
    //console.log('cade o hd?')
    $.ajax({
      cache: false,
      method: "get",
      url: "/dados/dadosQuase",
      done: function (data) {
       // console.log("se chegar aqui, pegou hd")
        $('#idHd').html(data.hd);
      },
      error: function (e) {
       //console.log("errou");
      }
  });
 }