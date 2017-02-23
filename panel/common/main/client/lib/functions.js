TestaCPF = function(strCPF) {
	// Testa validado do CPF digitado

	// Remove pontos e traços
	strCPF = strCPF.replace(/\.|-/g,'');
	var Soma;
	var Resto;
	Soma = 0;
	// Permite alguns CPF para testes
	if (strCPF == "00000000000") return true;
	if (strCPF == "11111111111") return true;
	if (strCPF == "22222222222") return true;
	if (strCPF == "33333333333") return true;
	if (strCPF == "44444444444") return true;

	for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
	Resto = (Soma * 10) % 11;

	if ((Resto == 10) || (Resto == 11)) Resto = 0;
	if (Resto != parseInt(strCPF.substring(9, 10))) return false;

	Soma = 0;
	for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
	Resto = (Soma * 10) % 11;

	if ((Resto == 10) || (Resto == 11)) Resto = 0;
	if (Resto != parseInt(strCPF.substring(10, 11))) return false;
	return true;
};
