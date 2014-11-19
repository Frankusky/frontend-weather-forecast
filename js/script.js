$.fn.exBounce = function(){
    var self = this;
    (function runEffect(){
        self.effect("bounce", { times:3 }, 1200, runEffect);
    })();
   return this;
};

$(document).ready(function(){
	$(".tituloInput").exBounce();
	$(".button").click(function(){
		var tempType = ($('input[name="temp"]:checked').val());
		var pais = $("input[name=pais]").val();
		var depto = $("input[name=depto]").val();
		if (depto.length!=0 && pais.length!=0){
			jQuery(document).ready(function($) { 
				var codPais = "";
				$.ajax({ 
					url : "paises.json", dataType : "json",
					success : function(parsed_json) {
						for (var i = 0; i <= 242; i++) { //recorrer el json de paises para encontrar su codigo
							if (((parsed_json[i]["name"]).toLowerCase()) == pais.toLowerCase()){
								codPais = parsed_json[i]["code"];
							};
						};
						//Codigo para el departamento

						if (codPais.length==0) { //error si no encontro el codigo para el pais ingresado
							alert("Ops! Looks like your country doesn't exist! Try again.");
						}else{
							var direccion = "http://api.wunderground.com/api/0a3dd826c5ddd6ff/conditions/q/"+codPais+"/"+depto+".json";
							$(document).ready(function(){
								jQuery(document).ready(function($) { 
									$.ajax({ url : direccion, dataType : "jsonp",
										success : function(parsed_json2) {
											if(parsed_json2["current_observation"]){ //revisar si el departamento tiene esta llave
												var location = parsed_json2['current_observation']['display_location']['full']; 
												var lastUpdate = parsed_json2['current_observation']['observation_time']; 
												var actualTemp;
												if (tempType==="Fahrenheit"){
													actualTemp = parsed_json2['current_observation']['temp_f']; 
													actualTemp = actualTemp + "F";
												}else{
													actualTemp = parsed_json2['current_observation']['temp_c']; 
													actualTemp = actualTemp + "C";
												}
												var weather = parsed_json2['current_observation']['weather']; 
												var weatherImg = parsed_json2['current_observation']['icon_url']; 
												$(".resultParagraph").empty();
												$(".resultParagraph").append("Current temperature in " + location + " is: " + actualTemp +"<br/>Weather: "+ weather + "<br/><img src=\""+weatherImg+"\"><br/>" + lastUpdate);
											}else{//error si no tiene esa llave
												alert("Ops! The city you entered doesn't exist or we don't have any data of this city!");
											}
										}
									});
								});
							});
						};
					}
				});
			});
			$("input[type=\"text\"]").val("");
		}else if (depto.length==0 && pais.length==0){
			alert("You must input something in both boxes!");
		}else if(depto.length==0){
			alert("You forgot to input something in city box!");
		}else if(pais.length==0){
			alert("You forgot to input something in country box!");
		}
		
	});
});
/*
jQuery(document).ready(function($) { 
	var pais = prompt("Ingrese pais: ").toLowerCase();
	var nombrePais = "";
	$.ajax({ 
		url : "paises.json", dataType : "json",
		success : function(parsed_json) {
			for (var i = 0; i <= 242; i++) { //recorrer el json de paises para encontrar su codigo
				if (((parsed_json[i]["name"]).toLowerCase()) == pais.toLowerCase()){
					nombrePais = parsed_json[i]["name"];
					var codPais = parsed_json[i]["code"];
					alert(nombrePais);
					alert(codPais);
				};
			};
			//Codigo para el departamento
			if (nombrePais.length==0) { //error si no encontro el codigo para el pais ingresado
				alert("No encontrado");
			}else{
				var departamento = prompt("Ingrese departamento: ");
				var direccion = "http://api.wunderground.com/api/0a3dd826c5ddd6ff/conditions/q/"+codPais+"/"+departamento+".json";
				alert(direccion);
				$(document).ready(function(){
					jQuery(document).ready(function($) { 
						$.ajax({ url : direccion, dataType : "jsonp",
							success : function(parsed_json2) {
								if(parsed_json2["current_observation"]){ //revisar si el departamento tiene esta llave
									var location = parsed_json2['current_observation']['display_location']['city']; 
									var actualTemp = parsed_json2['current_observation']['temp_c']; 
									alert("Current temperature in " + location + " is: " + actualTemp +"C");
								}else{//error si no tiene esa llave
									alert("Error!");
								}
							}
						});
					});
				});
			};
		}
	});
});
*/