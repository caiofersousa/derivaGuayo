//noprotect
/////////
//Global
var slices;

////////
// Utils
function showUp(equacao) {
  
    if (!isNaN(equacao))
      return equacao;
    
    if (equacao[0] == "+")
      equacao = equacao.substring(1);
      
    var posExp = equacao.indexOf("^");
  
    if (posExp != -1 && equacao[posExp + 1] == 1 && isNaN(equacao[posExp + 2]))
        equacao = equacao.replace("^1", "");        
    else
      equacao = equacao.replace("^", "<sup>") + "</sup>";
      
    console.log(equacao);
    return equacao; 
}

function showUpMod(equacao) {
  
    if (!isNaN(equacao))
      return equacao;
      
    var posExp = equacao.indexOf("^");
  
    if (posExp != -1 && equacao[posExp + 1] == 1 && isNaN(equacao[posExp + 2]))
        equacao = equacao.replace("^1", "");        
    else
      equacao = equacao.replace("^", "<sup>") + "</sup>";
      
    console.log(equacao);
    return equacao; 
}

function recortaN(slice) {
    var posExp = slice.indexOf("^") + 1;
    return slice.substring(posExp);
}

function recortaK(slice) {
    var posX = slice.indexOf("x");
    
    if (posX != -1)
      return slice.substring(0, posX);
}

/////////
//Organiza a equação e retira os espaços em branco
function organizaEquacao(equacao) {	
  if (equacao[0] != "+" && equacao[0] != "-") //Acrescenta sinal se necessário
		equacao = "+" + equacao;
  
  equacao = equacao.toLowerCase(); //caixa baixa
  equacao = equacao.replace(/ /g, ""); //retira espaços
  console.log(equacao);
  
  equacao = equacao.replace(/\+x/g, "+1x"); //regex 
  equacao = equacao.replace(/\-x/g, "-1x"); //regex
  
  for (var i = 0; i<equacao.length; i++) {
      if (equacao[i] == "x" && equacao[i+1] != "^" && i < equacao.length)
          equacao = equacao.substr(0, i+1) + "^1" + equacao.substr(i+1);
  }//endfor
  
  return equacao; //Remove todos os espaços em branco
}

/////////
//Recorta a equação nas partes a serem derivada
function recortaEquacao(equacao) {
    slices = [];
  
    equacao = organizaEquacao(equacao);
    console.log(equacao);
  
    for (var i = 0; i < equacao.length; i++) {
        if (equacao[i] == "x") {
            
            //Procura pela pos incial do corte
            var posInicial = i-1;
            while (equacao[posInicial] != '+' && equacao[posInicial] != '-') {
                posInicial--;
            }
          
           //Pega a posição final do corte
            var posFinal = i + 1;
	        while (equacao[posFinal] != '+' && equacao[posFinal] != '-' && posFinal < equacao.length) {
	            posFinal++;
	        } 
          
            recorte = equacao.substring(posInicial, posFinal);
	        slices.push(recorte);
        } //endif
    } //endfor
  
    for (var j = 0; j < slices.length; j++) {   
	      equacao = equacao.replace(slices[j], "");
	}

	if (equacao.length > 0)
	    slices.push(equacao); 
} 

function exibeParteUm() {
    //Exibe infor
    console.log("Partes: " + slices);
    var resolucao = "<h2>Resolução</h2><h3>Passo 1 - Separar a equação em partes menores</h3> <p>";
    for (var slice in slices) {
        resolucao += " <span class='exemplo'>" + showUp(slices[slice]) + "</span>";
    }
     return resolucao + "</p>";
}

function encontraDerivada(slice) {
  
    if (slice.indexOf("x") == -1) {//constante (não tem X)
      return 0; 
    }
    else {
      var k = recortaK(slice);
      var n = recortaN(slice);
      
      if (n == 1)
        return (k * n);
      else
        return (k * n) + "x^" + (n - 1);
    }
      
}

function derivaSlices() {
    var resultante = "";
    var equacaoFinal = "";
  
    for (var i in slices) {
       resultante = encontraDerivada(slices[i]);
       
      if (resultante !== 0) {
        
        if (resultante[0] != '-' && resultante[0] != '+' && i > 0)
            resultante = "+" + resultante;
        
        equacaoFinal += showUpMod(resultante); 
      }
    }
  
  return equacaoFinal;
}

function exibeParteDois() {
  
  var resolucao = "<h3>Passo 2 - Derivar cada parte menor utilizando da fórmula k*n*x<sup>n-1</sup></h3>";
  
   for (var i in slices) {
      var k = recortaK(slices[i]);
      var n = recortaN(slices[i]);
     
      if (slices[i].indexOf("x") == -1) {
         resolucao += "<p><span class='exemplo'>" + slices[i] + "</span> resulta em <span class='exemplo'>0</span> pois é constante.</p>";
         console.log(slices[i] + " -> resulta em <strong>0</strong> pois é constante."); 
      }
      else if (n == 1) {
        resolucao += "<p><span class='exemplo'>" + showUp(slices[i]) + "</span> resulta em <span class='exemplo'>" + encontraDerivada(slices[i]) +  "</span> já que derivada de <strong>kx</strong> é igual a <strong>k</strong>.</p>";
        console.log(slices[i] + " -> retorna o K de 'x'" + encontraDerivada(slices[i]));
      }
      else {
        resolucao += "<p><span class='exemplo'>" + showUp(slices[i]) + "</span> resulta em <span class='exemplo'>" + (showUp(encontraDerivada(slices[i]))) +  "</span> aplicando a fórmula <strong>" + k + "*" + n + "*x<sup>" + n + "-1</sup></strong>.</p>";
        console.log(slices[i] + " -> retorna 'k*n*x<sup>n-1</sup> que resulta " + encontraDerivada(slices[i]));
      }
   } //enfor
  
    return resolucao;
}

function doit() {
   var str = document.getElementById("inputEq").value;

   if (str.length <= 0) {
   	   alert("É necessário uma equação para continuar :-)")
   }
   else {
   		recortaEquacao(str);
	    document.getElementById("parte1").innerHTML = exibeParteUm();
	    document.getElementById("parte2").innerHTML = exibeParteDois();

	    if (str.indexOf("x") == -1)
	    	document.getElementById("final").innerHTML = "<p> y' <span class='igual'>= 0</span></p>";
	    else
	    	document.getElementById("final").innerHTML = "<p> y' <span class='igual'>=</span> " + derivaSlices() + "</p>";
	  	
	  	document.getElementById("resol").style.visibility = "inherit";
   }
    
    
}

var exibindo = false;

function toggleResolucao() {
	
	if (!exibindo) {
		document.getElementById("rewrap").style.visibility = "inherit";
		document.getElementById("rewrap").style.display = "inherit";
		document.getElementById("resol").innerHTML = "Ocultar resolução";
		exibindo = true;
	}
	else {
		document.getElementById("rewrap").style.visibility = "hidden";
		document.getElementById("rewrap").style.display = "none";
		document.getElementById("resol").innerHTML = "Exibir resolução";
		exibindo = false;
	}
	


}