var refreshIntervalId;
var refreshIntervalSearchProviderId;

function listaDrivers()         
            // Capturar o clique no botão #btnClientes...

            {
                // Limpar todos os itens da lista...
                $("#listaDrivers").empty();
         
                // Exibe a mensagem 'Carregndo clientes'
                $("#situacao").html("<center>Buscando Drivers no banco de dados (API)...</center>");
         
                $.ajax({
                    type: "GET",
                    url: getURL()+"relatorio.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
         
                        // JSON return...
                        var drivers = JSON.parse(result);
         
                        $.each(drivers,function(i, driver){
                            var item = "<li><h2>"+driver.NAME+"</h2><p><b>Mobile.:</b> "+driver.MOBILE+"</p><p><b>Email:</b> "+driver.EMAIL+"</p></li>";
                            $("#listDrivers").append(item);
                        });
         
                        $("#situacao").html("<center>Found "+drivers.length+" Driver(s)</center>");
         
                    },
                    error: function (jqXHR, status) {
                        // Exibir mensagem de erro, caso aconteça...
                        $("#situacao").html("<center>Server busy try again later...  "+status+"</center>");
                    },
                });
         
    }

   function getURL()         
 
            {
//             return 'http://www.be1worldservices.com/maxima/';
             return 'http://fortune.lmcomercial.com.br/webservice/';
         
    } 	



function loginUsr()         
            {
//                $("#message-login").html("<center>Finding email information....</center>");
                var $email = document.getElementById('email').value;
                var $password = document.getElementById('password').value;
                console.log(getURL());
                $.ajax({
                    type: "GET",
                    url: getURL()+"login.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"email":$email, "password":$password},
                    success: function (result, jqXHR) {
					   var userData = JSON.parse(result);
                       if (userData.MESSAGE == "OK"){
							$("#iduser").val(userData.ID);
							$("#message-login").html('<center><b>'+userData.MESSAGE+'</center>');
							listServices() ;                           
							activate_page("#pg-services");
                       }
                       else
                       {
                           $("#message-login").html('<center><b>'+userData.MESSAGE+'</center>');

                       }                   
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-login").html("<center>Server busy try again later...  "+status+"</center>");
                        console.log(jqXHR.responseText);
                        console.log(jqXHR.status);
 
                    },
                });
         
    }
function getUserDetails()         

            {
         
                var uid = document.getElementById('iduser').value;
                console.log(getURL());
                $.ajax({
                    type: "GET",
                    url: getURL()+"get-userdetail.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"uid":uid},
                    success: function (result, jqXHR) {
					   var userData = JSON.parse(result);
                       if (userData.MESSAGE == "OK"){
							             $("#app-address").val(userData.ADDRESS);
                       }
                       else
                       {
                           $("#app-address").val('');

                       }                   
         
                        $("#message-login").html("<center>Found "+userData.length+" Driver(s)</center>");
         
                    },
                    error: function (jqXHR, status) {
                        // error message...
                        $("#app-address").val("");
 
                    },
                });
         
    }

   function listServices()         

            {
                // clean list div...
               $("#listServ").empty();
         
 
               $.ajax({
                    type: "GET",
                    url: getURL()+"list-services.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
         
                        var services = JSON.parse(result);
         
                        $.each(services,function(i, service){
							
                            var item = "<table width='100%'><tr><td><a href='#' onclick='detailService("+service.ID+")'><img src='"+service.IMG+"' height='100px' /></a></td><td>";
                                
                                item = item + "<p align='right'><button class='btn-success' onclick='detailService("+service.ID+")'>Selecionar</button></p></li>";
                                item = item + "</td></tr></table>";
                                item = item + "<p><hr width=100%></hr>";

                            $("#listServ").append(item); 
                        });
         
                        activate_page("#pg-services");
         
                    },
                    error: function (jqXHR, status) {
                        $("#msgListServ").html("<center>Servidor sobrecarrecado tente mais tarde...  "+status+"</center>");
                    },
                });
         
    } 
	
	
   function detailService(idserv)         

            {
 

               


                $.ajax({
                    type: "GET",
                    url: getURL()+"list-mais.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
                    data: {"idserv":idserv},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
                       console.log(userData.MESSAGE);
                       console.log(result);
 
                          console.log(userData[0]);
                          $("#serviceImg").html('<center><h1>Lotofácil</h1></center>');
                          $("#nrmais1").val(userData[0]);
                          $("#nrmais2").val(userData[1]);
                          $("#nrmais3").val(userData[2]);
                          $("#nrmais4").val(userData[3]);
                          $("#nrmais5").val(userData[4]);
                           
                           var item = "<table with='100%'><tr><td colspan=5><h2> Os 15 mais dos últimos 10 sorteios </h2> </td</tr>";
                                item = item + "<tr><td align='center' >" + userData[0] + "</td>";
                                item = item + "<td  align='center'>" + userData[1] + "</td>";
                                item = item + "<td align='center'>" + userData[2] + "</td>";
                                item = item + "<td align='center'>" + userData[3] + "</td>";
                                item = item + "<td align='center'>" + userData[4] + "</td></tr>";
                                item = item + "<tr><td align='center'>" + userData[5] + "</td>";
                                item = item + "<td align='center'>" + userData[6] + "</td>";
                                item = item + "<td align='center'>" + userData[7] + "</td>";
                                item = item + "<td align='center'>" + userData[8] + "</td>";
                                item = item + "<td align='center'>" + userData[9] + "</td></tr>";
                                item = item + "<tr><td align='center'>" + userData[10] + "</td>";
                                item = item + "<td align='center'>" + userData[11] + "</td>";
                                item = item + "<td align='center'>" + userData[12] + "</td>";
                                item = item + "<td align='center'>" + userData[13] + "</td>";
                                item = item + "<td align='center'>" + userData[14] + "</td></tr>";

                                item = item + "</table>";
                                item = item + "<p><hr width=100%></hr>";           





                         $("#serviceName").html(item);
                          $("#serviceFare").html('<center><b><button class="btn-success" onclick="gerarPalpite()">Sem Palpite? Tente aqui.</button></center>');
                          $("#serviceFare").append('<p><center><b><button class="btn-success" onclick="gerarPalpiteFixo5()">Gerar com 5 mais sorteados</button></center>');
                           $("#serviceDescription").html('');
                           $("#serviceDescription2").html('');
                           activate_page("#srv-detail");
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#serviceImg").html("<center>Problema com o servidor tente novamente... "+status+"</center>");
                    },
                });
         
    } 	


function gerarPalpite()         

            {
                $("#serviceImg").html("<center><h1>Lotofácil - Buscando palpite...</h1></center>");

               


                $.ajax({
                    type: "GET",
                    url: getURL()+"lfacil-list-palpite.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
                       
                       console.log(result);
 
                          console.log(userData[0]);
                           $("#serviceImg").html('<center><h1>Lotofácil</h1></center>');
                           
                           var item = "<table width='100%'><tr><td colspan=5><h2>Palpite Gerado, Boa Sorte! </h2> </td></tr>";
                                item = item + "<tr><td>" + userData[0] + "</td>";
                                item = item + "<td>" + userData[1] + "</td>";
                                item = item + "<td>" + userData[2] + "</td>";
                                item = item + "<td>" + userData[3] + "</td>";
                                item = item + "<td>" + userData[4] + "</td></tr>";
                                item = item + "<tr><td>" + userData[5] + "</td>";
                                item = item + "<td>" + userData[6] + "</td>";
                                item = item + "<td>" + userData[7] + "</td>";
                                item = item + "<td>" + userData[8] + "</td>";
                                item = item + "<td>" + userData[9] + "</td></tr>";
                                item = item + "<tr><td>" + userData[10] + "</td>";
                                item = item + "<td>" + userData[11] + "</td>";
                                item = item + "<td>" + userData[12] + "</td>";
                                item = item + "<td>" + userData[13] + "</td>";
                                item = item + "<td>" + userData[14] + "</td></tr>";

                                item = item + "</table>";
                                item = item + "<p><hr width=100%></hr>";                           
                         $("#serviceDescription").html(item);
                           activate_page("#srv-detail");
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#serviceImg").html("<center>Server busy try again later... "+status+"</center>");
                    },
                });
         
    }   

  function gerarPalpiteFixo5()
  {

                $("#serviceImg").html("<center><h1>Lotofácil - Buscando palpite...</h1></center>");

               var nrmais1 = document.getElementById('nrmais1').value;
               var nrmais2 = document.getElementById('nrmais2').value;
               var nrmais3 = document.getElementById('nrmais3').value;
               var nrmais4 = document.getElementById('nrmais4').value;
               var nrmais5 = document.getElementById('nrmais5').value;


                $.ajax({
                    type: "GET",
                    url: getURL()+"lfacil-list-palpite-fixo5.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
                    data: {"nr1":nrmais1, "nr2":nrmais2, "nr3":nrmais3, "nr4":nrmais4,"nr5":nrmais5},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
                       
                       console.log(result);
 
                          console.log(userData[0]);
                           
                           
                           var item = "<table width='100%'><tr><td colspan=5><h2>Palpite Gerado(5 fixos), Boa Sorte! </h2> </td></tr>";
                                item = item + "<tr><td>" + userData[0] + "</td>";
                                item = item + "<td>" + userData[1] + "</td>";
                                item = item + "<td>" + userData[2] + "</td>";
                                item = item + "<td>" + userData[3] + "</td>";
                                item = item + "<td>" + userData[4] + "</td></tr>";
                                item = item + "<tr><td>" + userData[5] + "</td>";
                                item = item + "<td>" + userData[6] + "</td>";
                                item = item + "<td>" + userData[7] + "</td>";
                                item = item + "<td>" + userData[8] + "</td>";
                                item = item + "<td>" + userData[9] + "</td></tr>";
                                item = item + "<tr><td>" + userData[10] + "</td>";
                                item = item + "<td>" + userData[11] + "</td>";
                                item = item + "<td>" + userData[12] + "</td>";
                                item = item + "<td>" + userData[13] + "</td>";
                                item = item + "<td>" + userData[14] + "</td></tr>";

                                item = item + "</table>";
                                item = item + "<p><hr width=100%></hr>";                           
                         $("#serviceDescription2").html(item);
                           activate_page("#srv-detail");
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#serviceImg").html("<center>Server busy try again later... "+status+"</center>");
                    },
                });
         

    


  }

  function gerarPalpiteFixoCombina()
  {


    CombineElements([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25], 10);



  }



   function showServices()         

            {
                // clean list div...
                $("#message-showserv").empty();
         
                $("#message-showserv").html("<center><h1>Buscando...</h1></center>");
 
               $.ajax({
                    type: "GET",
                    url: getURL()+"list-services.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
         
                        var services = JSON.parse(result);
         
                        $.each(services,function(i, service){
							
                            var item = "<table width='100%'><tr><td><img src='"+service.IMG+"' height='100px' /></td><td>";
                                item = item + "<p><h4 class='list-group-item-heading'>"+service.NAME+"</h4><p><b>$ </b> "+service.FARE+"</p>";
                                item = item + "<p align='right'><button class='btn-success' onclick='showDetailService("+service.ID+")'>Detail</button></p></li>";
                                item = item + "</td></tr></table>";
                                item = item + "<p><hr width=100%></hr>";
                            $("#listShowServ").append(item); 
                        });
         
                        $("#message-showserv").html("<center>Select Service: </center>");
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-showserv").html("<center>Server busy try again later...  "+status+"</center>");
                    },
                });
         
    } 

   function fechaNumeros()         

            {

        var nrfixo1 = parseInt(document.getElementById('nr1').value);
        var nrfixo2 = parseInt(document.getElementById('nr2').value);
        var nrfixo3 = parseInt(document.getElementById('nr3').value);
        var nrfixo4 = parseInt(document.getElementById('nr4').value);
        var nrfixo5 = parseInt(document.getElementById('nr5').value);

        var totalNumeros = parseInt(document.getElementById('totalnumeros').value);         
                
        var qtnumjogo = parseInt(document.getElementById('qtnumjogo').value);  

        for (i=0;i<=totalNumeros; i++){




        }



}



function GenerateCombinations(totalElements, elementCount) {

    console.debug('Total de elementos: ' + totalElements);
    console.debug('Elementos por combinação: ' + elementCount);

    var res = [];

    for (i = 0; i < Math.pow(2, totalElements); i++) { 

        var probe = i.toString(2).replace(new RegExp('0', 'g'), '');

        if(probe.length == elementCount)
            res.push(i);
    }    

    console.debug(res.length + ' combinações encontradas.');
    $("#qttotalapostas").html("<center>Quantidade de apostas: "+ res.length +"</center><p><center>Quantidade de Números: "+ totalElements +"</center>");

    return res;
}


function CombineElements(collection, elementCount) {
    var combinations = GenerateCombinations(collection.length, elementCount);

    var res = [], warItem;
   var fx1 = document.getElementById('fx1').value;
   var fx2 = document.getElementById('fx2').value;
   var fx3 = document.getElementById('fx3').value;
   var fx4 = document.getElementById('fx4').value;
   var fx5 = document.getElementById('fx5').value;
   var numeros = [],fixos , qtfixos = 0;
   var p=1;
   fixos = '';
console.log ('fx1:'+fx1+' fx3:'+ fx3 +' fixos:'+ fixos);
   if ( fx1 != '') {
      fixos += fx1 + ' ';
      p++;
   }
   if ( fx2 != '') {
      fixos+=  fx2 + ' ';
      p++;
   }
   if ( fx3 != '') {
      fixos+= fx3 + ' ';
      p++;
   }
   if ( fx4 != '') {
      fixos+= fx4 + ' ';
      p++;
   }
   if ( fx5 != '') {
      fixos+= fx5 + ' ';
      p++;
   }
   qtfixos = --p;


    for(i = 0; i < combinations.length; i++) {

        bitmapIndex = combinations[i].toString(2).split("").reverse().join("");
        console.debug(i + ':' + bitmapIndex);
        var arItem = '';

        for(j = 0; j < bitmapIndex.length + 1; j++)
        {
            if (bitmapIndex.substring(j,j+1) == '1'){
                warItem = collection[j];
               
                if (parseInt(warItem) < 10){
                  arItem += ' 0' + collection[j];
                }
                else { 
                  arItem += ' ' + collection[j];
                }

              }
        }

        $("#listapostas").append('<center><h3>'+ fixos + ' ' +arItem + ' #</h3></center>');

        res.push(arItem);
        console.log(arItem);

    }
    
    return res;

}

function gerarApostas() {

   var qtNumAposta = parseInt(document.getElementById('qtnumaposta').value);
   var wqtNumAposta = document.getElementById('qtnumaposta').value;


   if (wqtNumAposta == ''){
    alert ('Qdte números por aposta deve ser preenchido!');
    return false;
   }

   var fx1 = document.getElementById('fx1').value;
   var fx2 = document.getElementById('fx2').value;
   var fx3 = document.getElementById('fx3').value;
   var fx4 = document.getElementById('fx4').value;
   var fx5 = document.getElementById('fx5').value;
   var ncheck = document.getElementsByName("ncheck"); 
   var numeros = [],fixos = [], qtfixos = 0;
   var p=1;

console.log ('fx1:'+fx1+' fx3:'+ fx3);
   if ( fx1 != '') {
      fixos += fx1 + ' ';
      p++;
   }
   if ( fx2 != '') {
      fixos+=  fx2 + ' ';
      p++;
   }
   if ( fx3 != '') {
      fixos+= fx3 + ' ';
      p++;
   }
   if ( fx4 != '') {
      fixos+= fx4 + ' ';
      p++;
   }
   if ( fx5 != '') {
      fixos+= fx5 + ' ';
      p++;
   }
   qtfixos = --p;

    for (var i=0, x=0;i<ncheck.length;i++){ 
        if (ncheck[i].checked == true){ 
            // CheckBox Marcado... Faça alguma coisa...
            numeros[x++] = (i+1);

        }
    }

    if (qtNumAposta > i){
        alert ('Quantidade de insuficiente de Números selecionados!');
        return false;

    }

    var qtNrCombinar = qtNumAposta - qtfixos;


//    console.log('Numeros:'+numeros  + ' qtNumAposta:' + qtNumAposta + 'qtfixos:' + qtfixos);

   // collection  [1,2,3,4,5,6,...]
    $("#listapostas").empty();
    CombineElements(numeros, qtNrCombinar);
    $("#numselecionados").html("Números Selecionados: "+ '( ' + fixos + ' ) ' + numeros);
    activate_page("#numeros-gerados");



}
	
   function showDetailService($ids)         

            {
                $("#message-showserv").html("<center>Fetching Details...</center>");

                $.ajax({
                    type: "GET",
                    url: getURL()+"serv-detail.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
					data: {"ids":$ids},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
                       
 
                       if (userData.MESSAGE == "OK"){
                           $("#idservice").val(userData.ID);
                           $("#serviceImgShow").html('<center><img src="'+userData.IMG+'" height="200px"></center>');
                           $("#serviceNameShow").html('<center><b>'+userData.NAME+'</center>');
                           $("#serviceFareShow").html('Fare: $<b>'+userData.FARE+'</b>');
                           $("#serviceDescriptionShow").html('<center><b>'+userData.DETAILS+'</center>');
                            activate_page("#show-detail");
                       }
                       else
                       {
                           $("#message-showserv").html('<center><b>'+userData.MESSAGE+'</center>');

                       }                   
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-showserv").html("<center>Server busy try again later... "+status+"</center>");
                    },
                });
         
    } 	

   function addBooking()         
            {
				
					var idUser = document.getElementById('iduser').value;
					var idService = document.getElementById('idservice').value;
					var timeService = document.getElementById('app-time').value;
					var dateService = document.getElementById('datepicker').value;
					var address = document.getElementById('app-address').value;
					var error = true;
                $.ajax({
                    type: "GET",
                    url: getURL()+"add-booking.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
					data: {"ids": idService, "uid":idUser, "time":timeService, "date":dateService, "address":address},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
 
                       if (userData.MESSAGE == "OK"){
                           $("#cardbid").val(userData.BID);
                           $("#cardfare").val(userData.FARE);
						   $("#message-conf").html('<center><b>'+userData.MESSAGE+'</center>');
						   activate_page("#pg-credit-card");
						   error = true;
                       }
                       else
                       {
                           $("#message-conf").html('<center><b>'+userData.MESSAGE+'</center>');
                           error = false;
                       }                   
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-conf").html("<center>Server busy try again later... "+status+"</center>");
                        error = false;
					
					},
                });
				
				return error;
         
    } 	

   function makeStripePayment()         
            

    {
				var ccName = document.getElementById('cardholdername').value,
				ccNum = document.getElementById('cardnumber').value,
				cvcNum = document.getElementById('cvv').value,
				expMonth = document.getElementById('exp-month').value,
				expYear = document.getElementById('exp-year').value;	
				
					// Get the Stripe token:
					Stripe.card.createToken({
						number: ccNum,
						cvc: cvcNum,
						exp_month: expMonth,
						exp_year: expYear
					}, stripeResponseHandler);
				
				
	}
	
	function stripeResponseHandler(status, response) {

			if (response.error) {
				$("#message-card").html('<center><b>'+response.error.message+'</center>');
			} else { 
			   var f = $("#payment-form");
				var token = response.id;
				var fare = document.getElementById('cardfare').value;				 
				var bid = document.getElementById('cardbid').value;				 
				var ccName = document.getElementById('cardholdername').value,
				ccNum = document.getElementById('cardnumber').value,
				cvcNum = document.getElementById('cvv').value,
				expMonth = document.getElementById('exp-month').value,
				expYear = document.getElementById('exp-year').value;	
				$.ajax({
                    type: "GET",
                    url: getURL()+"charge-card.php",
                    timeout: 20000,
                    contentType: "application/json; charset=utf-8",
					data: {"stripeToken": token, "fare":fare, "bid":bid,"ccname":ccName,"ccnum":ccNum,"cvcnum":cvcNum,"expmonth":expMonth, "expyear":expYear },
                    //dataType: "jsonp",
                    success: function (result, jqXHR) {  
	                   var userData = JSON.parse(result);
                        $("#message-card").html("<center>"+userData.MESSAGE+"</center>");
						document.getElementById("btconfirmpay").disabled = true;
						bookingSuccess();
                    },
                    error: function (jqXHR, status) {
                        $("#message-card").html("<center>Payment was not made... "+status+"</center>");
                        console.log(jqXHR.responseText);
                        console.log(jqXHR.status);
 
                        error = false;
					
					},
					
				});		
				
			}
	
	}
	
   function bookingSuccess()         
            

            {
               
				
				var bid = document.getElementById('cardbid').value;
                var retorno = true;

                $.ajax({
                    type: "GET",
                    url: getURL()+"bookingSuccess.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
					data: {"bid": bid},
                    //dataType: "jsonp",
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
 
						   refreshIntervalId = setInterval(checkBookingUser,10000);	
						   refreshIntervalBookNotSchedId = setInterval(checkBookingNotSchedUser,10000);	
						   activate_page("#bookings");
                           retorno = true;
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-conf").html("<center>Server busy try again later... "+status+"</center>");
                        retorno = false;
					
					},
                });
				
				return retorno;
         
    } 	


function checkBookingUser()         
            

            {
                // check bookings not scheduled yet ...
                var uid = document.getElementById('iduser').value; 
				uid = 39;
				console.log('checkBookingUser'+uid);
                var tembooking = 'OK';
                $.ajax({
                    type: "GET",
                    url: getURL()+"check-bookinguser.php",
                    timeout: 8000,
					data: {"uid": uid},
                    contentType: "application/json; charset=utf-8",
                    //dataType: "jsonp",
                    success: function (result, jqXHR) {
						console.log('result:'+result.trim());
							var bookings = JSON.parse(result);

			 
							$.each(bookings,function(i, book){
								if (book.MESSAGE === "OK") {
								var item = "BOOKING SCHEDULED \n";
								item = item + book.SERVICE+"\n";
								item = item + "DATE.: "+book.DATE+" TIME.: "+book.TIME+"\n";
								item = item + "PROVIDER.: "+book.PROVIDER+"\n";
								item = item + "MOBILE.:"+book.MOBILE+"\n";
								item = item + "DISTANCE.:"+book.DISTANCE+"\n";
								alert(item);
                                tembooking = 'OK';
								}
                                else {
									tembooking = 'NOK';
									clearInterval(refreshIntervalId);
								}
							});
                            if (tembooking === "OK") 
							   activate_page("#new-booking-confirm");
                    },
                    error: function (jqXHR, status) {
                        $("#message-listbook").html("<center>Server busy try again later...  "+status+"</center>");
                    },
                });
  } 
	

function checkBookingNotSchedUser()         
            

            {
                // check bookings not scheduled yet ...
                var uid = document.getElementById('iduser').value; 
				console.log('checkBookingUser'+uid);
                var tembooking = 'OK';
                $.ajax({
                    type: "GET",
                    url: getURL()+"check-bookingnotscheduser.php",
                    timeout: 8000,
					data: {"uid": uid},
                    contentType: "application/json; charset=utf-8",
                    //dataType: "jsonp",
                    success: function (result, jqXHR) {
						console.log('result:'+result.trim());
							var bookings = JSON.parse(result);

			 
							$.each(bookings,function(i, book){
								if (book.MESSAGE === "OK") {
								var item = "BOOKING SCHEDULED \n";
								item = item + book.SERVICE+"\n";
								item = item + "DATE.: "+book.DATE+" TIME.: "+book.TIME+"\n";
								item = item + "MOBILE.:"+book.MOBILE+"\n";
								item = item + "ADDRESS.:"+book.ADDRESS+"\n";
								item = item + "LATITUDE.:"+book.LATITUDE+"\n";
								item = item + "LONGITUDE.:"+book.LONGITUDE+"\n";
								alert(item);
                                tembooking = 'OK';
								getNearestProvider(book.ID);
								
								}
                                else {
									tembooking = 'NOK';
									clearInterval(refreshIntervalSearchProviderId);
								}
							});
                            if (tembooking === "OK") 
							   activate_page("#new-booking-confirm");
                    },
                    error: function (jqXHR, status) {
                        $("#message-listbook").html("<center>Server busy try again later...  "+status+"</center>");
                    },
                });
  } 
	
	function getNearestProvider(bid)
	{
				console.log('getNearestProvider'+bid);
                $.ajax({
                    type: "GET",
                    url: getURL()+"get-nearestprovider.php",
                    timeout: 8000,
					data: {"bid": bid},
                    contentType: "application/json; charset=utf-8",
                    //dataType: "jsonp",
                    success: function (result, jqXHR) {
						console.log('result:'+result.trim());
							var provider = JSON.parse(result);

			 
								if (provider.MESSAGE === "OK") {
								var item = "BOOKING SCHEDULED \n";
								item = item + provider.NAME+"\n";
								item = item + "MOBILE.:"+provider.MOBILE+"\n";
								item = item + "LATITUDE.:"+provider.LATITUDE+"\n";
								item = item + "LONGITUDE.:"+provider.LONGITUDE+"\n";
								alert(item);
								
								}
                    },
                    error: function (jqXHR, status) {
                        console.log("<center>Server busy try again later...  "+status+"</center>");
                    },
                });	
	
	}
	



	function addUser()         

            {
				
					var email = document.getElementById('emailuser').value;
					var mobile = document.getElementById('mobileuser').value;
					var pwd = document.getElementById('passworduser').value;
					var error = true;
					console.log('addUser');
                $.ajax({
                    type: "GET",
                    url: getURL()+"add-user.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
					data: {"email": email, "mobile":mobile, "pwd":pwd},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
 
                       if (userData.MESSAGE == "OK"){
                           $("#iduser").val(userData.UID);

        						   $("#message-signup1").html('<center><h1>'+userData.MESSAGE+'</h1></center>');
        						   activate_page("#signup-final");
        						   error = true;
                       }
                       else
                       {
                           $("#message-signup1").html('<center><h1>'+userData.MESSAGE+'</h1></center>');
                           error = false;
                       }                   
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-conf").html("<center><h1>Problema em nosso servidor, tente novamente... "+status+"<h1></center>");
                        error = false;
					
					},
                });
				
				return error;
         
    } 	
  function updateUser()         

            {
				
					var uid = document.getElementById('iduser').value;
					var name = document.getElementById('name').value;
					var address = document.getElementById('address').value;
					var gender = document.getElementById('gender').value;
					var height = document.getElementById('height').value;
					var weight = document.getElementById('weight').value;
					console.log('addUser');
                $.ajax({
                    type: "GET",
                    url: getURL()+"update-user.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
					data: {"uid": uid, "name":name, "address":address , "gender":gender, "height":height, "weight":weight},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
 
                       if (userData.MESSAGE == "OK"){
                           $("#uid").val(userData.UID);
						   $("#message-signup-2").html('<center><b>'+userData.MESSAGE+'</center>');
                           sendText(userData.UID);
						   activate_page("#signup2");
                       }
                       else
                       {
                           $("#message-signup-2").html('<center><b>'+userData.MESSAGE+'</center>');
                       }                   
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-conf").html("<center><h1>Problema em nosso servidor, tente novamente... "+status+"<h1></center>");
					
					},
                });
				
         
    }	

	
	
  function sendText(uid)         

            {
				
					console.log('sendText');
                $.ajax({
                    type: "GET",
                    url: getURL()+"send-text.php",
                    timeout: 3000,
                    contentType: "application/json; charset=utf-8",
					data: {"uid": uid},
                    success: function (result, jqXHR) {
         
                       var userData = JSON.parse(result);
 
         
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-signup-3").html("<h1>Problema em nosso servidor, tente novamente... "+status+"<h1></center>");
					
					},
                });
				
         
    }	
   function listBookings()         
            

            {
                $("#listbook").empty();
 
                $("#message-listbook").html("<center>Fetching Bookings...</center>");
                var uid = document.getElementById('iduser').value; 
                console.log('listBookings'+uid);
                $.ajax({
                    type: "GET",
                    url: getURL()+"list-bookings.php",
                    timeout: 8000,
					data: {"uid": uid},
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
         
                        var bookings = JSON.parse(result);
         
                        $.each(bookings,function(i, book){
							
                            var item = "<p><h4 class='list-group-item-heading'>"+book.SERVICE+"</h4>";
							item = item + "<p><b>DATE.:</b> "+book.DATE+"<b> TIME.:</b> "+book.TIME+"</p>";
							item = item + "<p><b>FARE.:</b> "+book.FARE+"</p>";
								var wStatus;
								switch (book.STATUS){
									case "0":
									  wStatus = "Not Confirmed";
									  break;
									case "1":
									  wStatus = "Booked - not scheduled yet";
									  break;
									case "2":
									  wStatus = "Booked - Scheduled";
									  item = item + "<p><b>PROVIDER.:</b> "+book.PROVIDER+"</p>";
									  item = item + "<p><b>PROVIDER MOBILE.:</b> "+book.PROVIDERMOBILE+"</p>";
									  break;
									case "3":
									  wStatus = "Booked - Job started";
									  item = item + "<p><b>JOB STARTED AT.:</b> "+book.STARTJOB+"</p>";
									  break;
									case "4":
									  wStatus = "Booked - Completed";
									  item = item + "<p><b>PROVIDER.:</b> "+book.PROVIDER+"</p>";
									  item = item + "<p><b>JOB STARTED AT.:</b> "+book.STARTJOB+"</p>";
									  item = item + "<p><b>JOB ENDED AT...:</b> "+book.ENDJOB+"</p>";
									  break;
								}
								item = item + "<p><b>STATUS.:</b> "+wStatus+"</p>";
								if (book.STATUS === "4" && book.FEEDBACK !== "1"){
								item = item + "<p><button class='btn-success' value='feedback' onclick='showFeedbackPage("+book.BID+",4)'>Leave Feedback</button></p>";
								}


							item = item + "<p><hr width=100%></hr>";
                            $("#listbook").append(item); 
							 
                        });
         
                        $("#message-listbook").html("<center>"+ bookings.length+" BOOKINGS FOUND </center>");
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-listbook").html("<h1>Problema em nosso servidor, tente novamente... "+status+"<h1></center>");
                    },
                });
         
    } 

function showFeedbackPage(bid)         
{
	console.log("showFeedback"+bid);
	$("#idbooking").val(bid);
	activate_page("#feedback");
	
}            
function saveStar(star)         
{
	console.log("saveStar"+star);
	$("#starselect").val(star);
	
}            
	
	
function sendFeedback(bid)         
            

            {
                // clean message div
                $("#message-feed").html("<center></center>");
                var star = document.getElementById('starselect').value; 
                var comment = document.getElementById('comment-feedback').value; 
                console.log('sendFeedback'+bid+'star:'+star+' Comment:'+comment);
                $.ajax({
                    type: "GET",
                    url: getURL()+"add-feedback.php",
                    timeout: 8000,
					data: {"bid": bid,"star": star,"bid": bid,"comment": comment,"origin": "1"},
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
         
                        var feed = JSON.parse(result);
         
							
                        
									
                        $("#message-feed").html("<center>Thank you for your feedback.</center>");
						listBookings();
						activate_page("#bookings");
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-feed").html("<center>Problema em nosso servidor, tente novamente...  "+status+"</center>");
                    },
                });
         
    } 
	
function profile()         
            {
                $("#message-profile").html("<center>Finding profile information....</center>");
                var $uid = document.getElementById('iduser').value;
                $.ajax({
                    type: "GET",
                    url: getURL()+"profile.php",
                    timeout: 5000,
                    contentType: "application/json; charset=utf-8",
                    data: {"uid":$uid},
                    success: function (result, jqXHR) {
                       console.log(result);
						var userData = JSON.parse(result);
                       
                       
                       if (userData.MESSAGE == "OK"){
							$("#message-profile").html('<center><b>PROFILE</center>');
							$("#profileName").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Name:</b></td><td class="text-left">'+userData.NAME.trim()+'</td></tr></table>');
							$("#profileEmail").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Email: </b></td><td  class="text-left"">'+userData.EMAIL.trim()+'</td></tr></table>');
							$("#profileMobile").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Mobile: </b></td><td  class="text-left">'+userData.MOBILE.trim()+'</td></tr></table>');
							$("#profileAddress").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Address: </b></td><td  class="text-left">'+userData.ADDR.trim()+'</td></tr></table>');
							$("#profileGender").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Gender: </b></td><td  class="text-left">'+userData.GENDER.trim()+'</td></tr></table>');
							$("#profileHeight").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Height: </b></td><td  class="text-left">'+userData.HEIGHT.trim()+'</td></tr></table>');
							$("#profileWeight").html('<table class="table table-sm"><tr><td style="width: 30%;"> <b>Weight: </b></td><td  class="text-left">'+userData.WEIGHT.trim()+'</td></tr></table>');
							activate_page("#profile");
                       }
                       else
                       {
                           $("#message-profile").html('<center><b>'+userData.MESSAGE+'</center>');

                       }                   
         
//                        $("#message-login").html("<center>Foram encontrado "+drivers.length+" Driver(s)</center>");
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-login").html("<center>Problema em nosso servidor, tente novamente....  "+status+"</center>");
                        console.log(jqXHR.responseText);
                        console.log(jqXHR.status);
 
                    },
                });
         
    }

	
	
function sendEmail()         
            

            {
                $("#message-contact").html("<center></center>");
                var uid = document.getElementById('iduser').value; 
                var subject = document.getElementById('subject').value; 
                var email = document.getElementById('emailtext').value; 
                console.log('sendEmail'+uid+'text:'+ email);
                $.ajax({
                    type: "GET",
                    url: getURL()+"send-emailcontact.php",
                    timeout: 8000,
					data: {"uid": uid,"subject": subject,"email": email},
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
						        console.log('resultado email: '+result);
                        var feed = JSON.parse(result);
                        $("#message-contact").html("<center>Sua mensagem foi enviada, agradecemos o contato.</center>");
//						listServices();
//						activate_page("#pg-services");
//            uib_sb.toggle_sidebar($("#menu"));
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-contact").html("<center>Problema em nosso servidor, tente novamente....  "+status+"</center>");
                    },
                });
         
    } 

function sendEmailApostas()         
            

            {
                var subject = 'FORTUNE - Apostas Geradas'; 
                var uid = document.getElementById('iduser').value; 
                var email = document.getElementById('emailapostas').value; 
                var apostas = $('#listapostas').text(); 
                console.log('sendEmail acct:'+ email);
                console.log('Email text:'+ apostas);
                $("#message-email").empty();
                $.ajax({
                    type: "GET",
                    url: getURL()+"send-emailapostas.php",
                    timeout: 8000,
                    data: {"uid": uid,"subject": subject,"email": email, "apostas" : apostas},
                    contentType: "application/json; charset=utf-8",
                    success: function (result, jqXHR) {
                    console.log('resultado email: '+result);
                        var feed = JSON.parse(result);
                        $("#message-email").html("<center>Suas apostas foram enviadas, BOA SORTE!.</center>");

//            listServices();
//            activate_page("#pg-services");
//            uib_sb.toggle_sidebar($("#menu"));
         
                    },
                    error: function (jqXHR, status) {
                        $("#message-email").html("<center>Problema em nosso servidor, tente novamente....  "+status+"</center>");
                    },
                });
         
    } 


