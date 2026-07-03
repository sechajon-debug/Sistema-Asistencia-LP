const APP_URL = "https://script.google.com/macros/s/AKfycbyOU6C2jse15r6PKTIJBNsWkdrcHgksAeKzvgBkh4SC0a3PuRDNELwvMdgLVVjXLSOy/exec";

let scanner;
let procesando = false;

function iniciarScanner(){
    const mensaje = document.getElementById("mensaje");
    mensaje.innerText = "📷 Cámara activa. Apunte al QR.";

    scanner = new Html5Qrcode("reader");

    scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        function(decodedText){
            if(procesando) return;
            procesando = true;

            let codigo = decodedText;

            if(decodedText.includes("codigo=")){
                codigo = new URL(decodedText).searchParams.get("codigo");
            }

            registrarAPI(codigo);
        },
        function(errorMessage){}
    ).catch(function(){
        mensaje.innerText = "❌ No se pudo abrir la cámara.";
    });
}

function registrarAPI(codigo){
    const mensaje = document.getElementById("mensaje");
    mensaje.innerText = "⏳ Registrando " + codigo + "...";

    window.recibirRespuesta = function(data){
        mensaje.innerText = data.mensaje;

        if(data.mensaje.includes("✅")){
            mensaje.style.background = "#d9ead3";
            mensaje.style.color = "#274e13";
        } else if(data.mensaje.includes("⚠️")){
            mensaje.style.background = "#fff2cc";
            mensaje.style.color = "#7f6000";
        } else {
            mensaje.style.background = "#f4cccc";
            mensaje.style.color = "#990000";
        }

        setTimeout(function(){
            mensaje.innerText = "📷 Listo para el siguiente QR";
            mensaje.style.background = "";
            mensaje.style.color = "";
            procesando = false;
        }, 2500);
    };

    const script = document.createElement("script");
    script.src = APP_URL + "?codigo=" + encodeURIComponent(codigo) + "&callback=recibirRespuesta";
    document.body.appendChild(script);
}

function volver(){
    window.location.href = "../index.html";
}