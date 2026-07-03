const API_URL = "https://script.google.com/macros/s/AKfycbyasDvWfOlAcew7XZhSAkfUMiz9gAiNHoTCRqQleWVXEvoG3oXMmCRUmjA0y6yyi0tR/exec";

window.recibirCredenciales = function(datos){
    const contenedor = document.getElementById("credenciales");
    contenedor.innerHTML = "";

    datos.forEach(persona => {
        const qr = "https://quickchart.io/qr?size=240&text=" + encodeURIComponent(persona.enlace);
        const tipo = String(persona.tipo).toUpperCase();

        const claseTipo =
            tipo.includes("EMPLEADO") ||
            tipo.includes("PERSONAL") ||
            tipo.includes("MAESTRO")
            ? "personal"
            : "estudiante";

        contenedor.innerHTML += `
            <div class="gafete ${claseTipo}">
                <div class="barra-lateral"></div>

                <div class="contenido">
                    <div class="encabezado">
                        <img src="../assets/img/logo.png" class="logo">
                        <div class="titulo">
                            <h2>LA PROMESA</h2>
                            <p>${persona.tipo}</p>
                        </div>
                    </div>

                    <div class="centro">
                        <div class="datos">
                            <h3>${persona.nombre}</h3>
                            <p class="grado">${persona.grado}</p>
                            <span class="codigo">Código: ${persona.codigo}</span>
                        </div>

                        <img src="${qr}" class="qr">
                    </div>

                    <div class="versiculo">📖 Proverbios 1:7</div>
                </div>
            </div>
        `;
    });
};

function cargarCredenciales(){
    const script = document.createElement("script");
    script.src = API_URL + "?accion=credenciales&callback=recibirCredenciales";
    document.body.appendChild(script);
}

function volver(){
    window.location.href = "../index.html";
}

cargarCredenciales();