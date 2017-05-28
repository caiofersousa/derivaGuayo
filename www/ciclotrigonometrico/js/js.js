$(document).ready(function() {

        (function() {
            
            var infoElem = $('.info');
                
            infoElem.each(function() {
                var self = $(this),
                    selfTooltipText = self.data('tooltip-text');
                if ( selfTooltipText ) $('<span/>', {class: 'tooltip', text: selfTooltipText}).appendTo(self);
            });
                
            
        })();
        
	$("#btnCalcular").click(function(){
		var angulo = $("#txtAngulo").val();
		if(angulo == "")
		{	
			$("#txtAngulo").css("border","2px solid #f00");
			$("#txtSeno").val("");
			$("#txtCosseno").val("");
			$("#txtSecante").val("");
			$("#txtCossecante").val("");
			$("#txtTangente").val("");
			$("#txtCotagente").val("");
			$(".erro").html("<br/>"+"Você deixou o espaço em branco. Corriga por favor.")
			return false;
			
		}
		else if( angulo < 0 || angulo > 359)
		{
			$("#txtAngulo").css("border","2px solid #f00");
			$("#txtSeno").val("");
			$("#txtCosseno").val("");
			$("#txtSecante").val("");
			$("#txtCossecante").val("");
			$("#txtTangente").val("");
			$("#txtCotagente").val("");
			$(".erro").html("<br/>"+"Digite angulos entre 0 e 359º. Corriga por favor.")
			return false;
		}
		else if (isNaN(angulo) === true) {
    		$("#txtAngulo").css("border","2px solid #f00");
			$("#txtSeno").val("");
			$("#txtCosseno").val("");
			$("#txtSecante").val("");
			$("#txtCossecante").val("");
			$("#txtTangente").val("");
			$("#txtCotagente").val("");
			$(".erro").html("<br/>"+"Você digitou letras ou números com virgulas. Corriga por favor.")
			return false;
		}
		else
		{
			$(".erro").html("")
			$("#txtAngulo").css("border","2px solid #000");
			seno = Math.sin(angulo * 2.0 * Math.PI / 360);
			$("#txtSeno").val(seno);
			
			cosseno = Math.cos(angulo * 2.0 * Math.PI / 360);
			$("#txtCosseno").val(cosseno);
			
			tagente = seno/cosseno;
			$("#txtTangente").val(tagente);
			
			cotangente = (1 / tagente);
			$("#txtCotagente").val(cotangente); 
			
			secante = 1 / cosseno;
			$("#txtSecante").val(secante); 
			
			cossecante = 1 / seno;
			$("#txtCossecante").val(cossecante); 
		}
		
	});
	
});


