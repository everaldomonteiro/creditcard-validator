document.addEventListener('DOMContentLoaded', () => {
    const cardInput = document.querySelector('#card');
    cardInput.addEventListener('keyup', validar);
});

function validar() {
    const numero = document.querySelector('#card').value.replace(/\s+/g, '');
    const resultado = validarCartaoCredito(numero);
    const res = document.querySelector('#res');
    const cardInput = document.querySelector('#card');

    if (resultado === "Número de cartão inválido" || resultado === "Bandeira desconhecida") {
        cardInput.classList.remove('valid');
        cardInput.classList.add('invalid');
    } else {
        cardInput.classList.remove('invalid');
        cardInput.classList.add('valid');
    }

    res.innerText = resultado;
}

function validarCartaoCredito(numero) {
    if (!validarLuhn(numero)) {
        return "Número de cartão inválido";
    }

    const bandeiras = {
        Visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
        Mastercard: /^(5[1-5][0-9]{14}|2(2[2-9][0-9]{2}|[3-6][0-9]{3}|7([01][0-9]{2}|20))[0-9]{12})$/,
        "American Express": /^3[47][0-9]{13}$/,
        Discover: /^(6011|65|64[4-9])[0-9]{12,15}$/,
        "Diners Club": /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        Hipercard: /^606282[0-9]{10}$/,
        JCB: /^(?:2131|1800|35\d{3})\d{11}$/,
        Aura: /^50\d{14,17}$/,
        EnRoute: /^(2014|2149)\d{11}$/,
        Voyager: /^8699\d{11,15}$/,
    };

    for (const [bandeira, regex] of Object.entries(bandeiras)) {
        if (regex.test(numero)) {
            return bandeira;
        }
    }

    return "Bandeira desconhecida";
}

function validarLuhn(numero) {
    let soma = 0;
    let alternar = false;
    for (let i = numero.length - 1; i >= 0; i--) {
        let n = parseInt(numero.charAt(i), 10);
        if (alternar) {
            n *= 2;
            if (n > 9) {
                n -= 9;
            }
        }
        soma += n;
        alternar = !alternar;
    }
    return (soma % 10) === 0;
}