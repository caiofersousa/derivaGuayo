//noprotect
/////////
//Global
var slices;

////////
// Utils
function showUp(equacao) {
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

function recortaN(slice) {
    var posExp = slice.indexOf("^") + 1;
    return slice.substring(posExp);
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
    var resolucao = "<p>Passo 1 - Separar a equação em partes menores<p>";
    for (var slice in slices) {
        resolucao += " <code>" + showUp(slices[slice]) + "</code>";
    }
     return resolucao;
}



function doit() {
   var str = document.getElementById("inputEq").value;
    
    recortaEquacao(str);
    document.getElementById("demo").innerHTML = exibeParteUm();
}