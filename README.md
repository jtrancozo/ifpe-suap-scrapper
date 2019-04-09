# IFPE Suap Scrapper
Javascript scrapper do inventário para gerar a tabela com os tombos e nota fiscal.

Essa ferramenta roda direto no browser com o uso da extensão Tampermonkey e navegador Chrome.

## Loader
Para carregar o script adicione o seguinte código ao Tampermokey
```
// ==UserScript==
// @name         CMPA Etiqueta
// @namespace    http://tampermonkey.net/
// @version      2.3
// @description  try to take over the world!
// @author       Jonathan Trancozo - IFPE Ipojuca
// @match        https://suap.ifpe.edu.br/patrimonio/inventario_busca*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function loadJs(filename){
        let loader=document.createElement('script');
        loader.src = filename;
        document.head.appendChild(loader);
    }

    loadJs('http://jonathansilva.com.br/lab/ifpe/cmpa-latest.js');

})();
```
