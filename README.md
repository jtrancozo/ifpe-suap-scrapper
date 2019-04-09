# IFPE Suap Scrapper
Javascript scrapper do inventário para gerar a tabela com os tombos e nota fiscal.

Essa ferramenta roda direto no browser com o uso da extensão Tampermonkey e navegador Chrome.

## Loader
Para carregar o script adicione o seguinte código ao Tampermokey
```
// ==UserScript==
// @name         CMPA Etiqueta
// @namespace    http://tampermonkey.net/
// @version      2.31
// @description  try to take over the world!
// @author       Jonathan Trancozo - IFPE Ipojuca
// @match        https://suap.ifpe.edu.br/patrimonio/inventario_busca*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let loadScript = (data) => {
        let loader = document.createElement('script');
        loader.setAttribute('type', 'text/javascript');
        loader.textContent = data;
        document.head.appendChild(loader);
    }

    fetch('https://raw.githubusercontent.com/jonathantsilva/ifpe-suap-scrapper/master/cmpa-latest.js')
    .then((response) => response.text())
    .then((data) => {
        loadScript(data)
    });

})();
```
