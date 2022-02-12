// ==UserScript==
// @name         Suap patrimônio scrapper
// @namespace    http://tampermonkey.net/
// @version      2.34
// @description  try to take over the world!
// @author       Jonathan Trancozo - IFPE
// @match        https://suap.ifpe.edu.br/patrimonio/inventario_busca*
// @grant        none
// ==/UserScript==


(function() {
    'use strict';

    let toolHtml = '<style>';
    toolHtml += '#tool-scrap {position: fixed; bottom: 0; right: 0; z-index: 10; background: #fff; padding: 10px}';
    toolHtml += '.t_btn {display: inline-block; padding: 5px 10px; margin: 0 5px; cursor: pointer; background: #1c59ab; border-radius: 3px; color: #fff}';
    toolHtml += '.start {background: #1dc168}';
    toolHtml += '.pause {background: #f58e43}';
    toolHtml += '.delete {background: #fd5151; margin-top: 15px}';
    toolHtml += '.form {margin: 10px 5px}';
    toolHtml += '.form label {margin-bottom: 5px}';
    toolHtml += '.loader {display: block; position: absolute; top: 10px; right: 15px; width: 20px; height: 20px; background-size: cover; background-image: url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTcuMS4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDMxOS4wMzUgMzE5LjAzNSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzE5LjAzNSAzMTkuMDM1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCI+CjxnPgoJPHBhdGggZD0iTTMxOC4zODIsMjI1LjE4MWwtMTAuMzM1LTM5LjU5OWMtMS44NTgtNy4xMjMtNi42OTctMTIuOTI0LTEzLjI3NS0xNS45MTdzLTE0LjEzMS0yLjgzLTIwLjcyNCwwLjQ0OWwtNDAuMTg4LDE5Ljk5MiAgIGMtOS44OSw0LjkyLTEzLjkxOCwxNi45MjUtOC45OTksMjYuODE0YzMuNjM1LDcuMzA2LDExLjEzNiwxMS4zOTksMTguNzk0LDExLjA2NGMtMTkuOTM4LDI2LjE5LTUxLjIyLDQyLjI2Ni04NS44MjIsNDIuMjY2ICAgYy00Ny44MzIsMC04OS4zMzMtMzAuNzA0LTEwMy4yNzEtNzYuNDA0Yy0zLjIyMi0xMC41NjUtMTQuMzk4LTE2LjUxOC0yNC45NjQtMTMuMjk1Yy0xMC41NjUsMy4yMjItMTYuNTE4LDE0LjM5OS0xMy4yOTUsMjQuOTY0ICAgYzkuMDUzLDI5LjY4NiwyNy43NjQsNTYuMzU1LDUyLjY4Myw3NS4wOTVjMjUuNzg1LDE5LjM5MSw1Ni41MDcsMjkuNjQsODguODQ3LDI5LjY0czYzLjA2My0xMC4yNDksODguODQ3LTI5LjY0ICAgYzE0LjIyNS0xMC42OTgsMjYuNDE2LTIzLjk4NiwzNS45NTMtMzguOTM3YzMuNzA4LDUuMzEzLDkuODMyLDguNTYzLDE2LjM4NCw4LjU2M2MxLjY3MSwwLDMuMzcyLTAuMjExLDUuMDY0LTAuNjUzICAgQzMxNC43NjgsMjQ2Ljc5NSwzMjEuMTcxLDIzNS44NjksMzE4LjM4MiwyMjUuMTgxeiIgZmlsbD0iIzAwMDAwMCIvPgoJPHBhdGggZD0iTTI0LjI2MywxNDkuMzY5YzMuMTI5LDEuNDI0LDYuNDc4LDIuMTMzLDkuODM5LDIuMTMzYzMuNzA2LDAsNy40MjgtMC44NjMsMTAuODg1LTIuNTgybDQwLjE4OC0xOS45OTIgICBjOS44OS00LjkyLDEzLjkxOC0xNi45MjUsOC45OTktMjYuODE0Yy0zLjYzNC03LjMwNS0xMS4xMzYtMTEuNC0xOC43OTQtMTEuMDY0YzE5LjkzOC0yNi4xOSw1MS4yMTktNDIuMjY2LDg1LjgyMi00Mi4yNjYgICBjNDcuODMyLDAsODkuMzMzLDMwLjcwNCwxMDMuMjcxLDc2LjQwNGMyLjYyOSw4LjYyMiwxMC41NTQsMTQuMTcxLDE5LjEyMywxNC4xNzFjMS45MzIsMCwzLjg5Ny0wLjI4Myw1Ljg0MS0wLjg3NSAgIGMxMC41NjUtMy4yMjIsMTYuNTE4LTE0LjM5OSwxMy4yOTUtMjQuOTY0Yy05LjA1My0yOS42ODYtMjcuNzY0LTU2LjM1NS01Mi42ODMtNzUuMDk1Yy0yNS43ODUtMTkuMzkxLTU2LjUwNy0yOS42NC04OC44NDctMjkuNjQgICBTOTguMTQsMTkuMDMzLDcyLjM1NSwzOC40MjRjLTE0LjIyOSwxMC43MDEtMjYuNDIzLDIzLjk5NC0zNS45NjEsMzguOTVjLTQuNjU0LTYuNjcxLTEzLjExMS0xMC4wOTgtMjEuNDQxLTcuOTIzICAgQzQuMjY2LDcyLjI0LTIuMTM2LDgzLjE2NiwwLjY1Myw5My44NTNsMTAuMzM1LDM5LjU5OUMxMi44NDcsMTQwLjU3NSwxNy42ODUsMTQ2LjM3NiwyNC4yNjMsMTQ5LjM2OXoiIGZpbGw9IiMwMDAwMDAiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K)}';
    toolHtml += '.loading {animation:spin 1s linear infinite;}';
    toolHtml += '.scanning {border: 3px solid #10508e}';
    toolHtml += '@keyframes spin { 100% { transform:rotate(360deg); } }';
    toolHtml += '</style>';
    toolHtml += '<span class="loader"></span>';
    toolHtml += '<div class="info">';
    toolHtml += '</div>';
    toolHtml += '<span class="t_btn start">Start</span>';
    toolHtml += '<span class="t_btn pause">Pause</span>';
    toolHtml += '<span class="t_btn save">Salvar CSV</span>';
    toolHtml += '<div class="form"></div>';
    toolHtml += '<span class="t_btn delete">Limpar dados</span>';


    // toolHtml +=;

    let t = document.createElement('div');
    t.id = 'tool-scrap';
    document.querySelector('body').appendChild(t);
    document.querySelector('#tool-scrap').innerHTML = toolHtml

    let $pagination = document.querySelector('.pagination');
    let $before = document.querySelector('.pagination li:first-child a');

    let mode = 1;

    let $start = document.querySelector('.start');
    let $pause = document.querySelector('.pause');

    let lastPage = $pagination.querySelectorAll('li')[$pagination.querySelectorAll('li').length - 2].children[0].innerText;
    let pages = lastPage;
    let pageActive = $pagination.querySelector('li.active a').innerText;

    let $trs = document.querySelectorAll('table tr');

    if (!localStorage.getItem('etiqueta')) {
        localStorage.setItem('etiqueta', JSON.stringify([]));
    }

    if (!localStorage.getItem('navigator')) {
        localStorage.setItem('navigator', JSON.stringify({
            lastPage: 1,
            lastItemIndex: 0,
            itemID: 1,
            start: false,
            autostart: false
        }));
    }

    let loadData = function (path) {
        const myRequest = new Request(path);

        return fetch(myRequest)
            .then(response => response.json())
            .then((data) => {
            return data;
        })
            .catch(console.error);
    }


// Etiqueta
    let storage = JSON.parse(localStorage.getItem('etiqueta'));

    let saveItem = (item) => {
        if (Array.isArray(item)) {
            storage = [].concat(storage,item);
        } else {
            storage.push(item);
        }

        localStorage.setItem('etiqueta', JSON.stringify(storage));
    }

// navigator
    function navigator () {
        let getInfo = () => JSON.parse(localStorage.getItem('navigator'))

        let updateNavigator = (data) => {
            let nav = getInfo();
            nav = Object.assign(nav, data);
            localStorage.setItem('navigator', JSON.stringify(nav))
        }

        let showLatestNavigator = () => {
            let navInfo = getInfo();
            let htmlInfo = `<p>Última página pesquisada ${navInfo.lastPage}</p>`;
            let checked = navInfo.autostart ? 'checked' : '';
            let htmlForm = `<label><input class="input autostart" type="checkbox" name="autostart" ${checked} /> Autostart</label>`;

            document.querySelector('#tool-scrap .info').innerHTML = htmlInfo;
            document.querySelector('#tool-scrap .form').innerHTML = htmlForm;
        }

        let toggleAutostart = () => {
            let value = !getInfo().autostart
            updateNavigator({autostart: value})
        }

        let setPage = (lastPage) => {
            updateNavigator({lastPage: lastPage})
        }

        let setLastItem = (item) => {
            console.log('last item', item)
            updateNavigator({lastItemIndex: item})
        }

        let clearStorage = () => {
            localStorage.removeItem('navigator');
            localStorage.removeItem('etiqueta');
            document.location.reload(true);
        }

        return {
            getInfo: getInfo,
            showLatestNavigator: showLatestNavigator,
            toggleAutostart: toggleAutostart,
            setPage: setPage,
            setLastItem: setLastItem,
            clearStorage: clearStorage
        }
    }

    let _navigator = navigator();

    // convert json to csv
    // recebe json e separator (json, '|')
    let convertJsonToCsv = (arr, separator) => {
        let header = Object.keys(arr[0]).join(separator) + '\n';
        let text = arr.reduce((acc, item) => {
            let line = Object.values(item).join(separator) + '\n';
            return acc + line
        }, header)

        return text;
    }

// export CSV

    function click(node) {
        try {
            node.dispatchEvent(new MouseEvent('click'));
        } catch (e) {
            let evt = document.createEvent('MouseEvents');
            evt.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
            node.dispatchEvent(evt);
        }
    }

    function download(url, name, opts) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'blob';

        xhr.onload = function () {
            saveAs(xhr.response, name, opts);
        };

        xhr.onerror = function () {
            console.error('could not download file');
        };

        xhr.send();
    }

    function corsEnabled(url) {
        let xhr = new XMLHttpRequest(); // use sync to avoid popup blocker

        xhr.open('HEAD', url, false);
        xhr.send();
        return xhr.status >= 200 && xhr.status <= 299;
    } // `a.click()` doesn't work for all browsers

    let saveAs = (blob, name, opts) => {
        var a = document.createElement('a');
        name = name || blob.name || 'download';
        a.download = name;
        a.rel = 'noopener'; // tabnabbing

        if (typeof blob === 'string') {
            // Support regular links
            a.href = blob;

            if (a.origin !== location.origin) {
                corsEnabled(a.href) ? download(blob, name, opts) : click(a, a.target = '_blank');
            } else {
                click(a);
            }
         } else {
            // Support blobs
            a.href = URL.createObjectURL(blob);
            setTimeout(function () {
                URL.revokeObjectURL(a.href);
            }, 4E4); // 40s

            setTimeout(function () {
                click(a);
            }, 0);
         }
    }

    const fileDownloadButton = document.querySelector('.save');

    function localStorageToFile() {
        let external = [];

        let etiquetas = JSON.parse(localStorage.getItem('etiqueta'));

        etiquetas = [...etiquetas, ...external];

        let arr = filterDuplicatedObjectInArray(etiquetas,'numero');

        const blob = '\ufeff';
        let planilha = {planilha: arr};
        const csv = JSON.stringify(planilha);
        const csvAsBlob = new Blob([blob + csv], {type: 'text/plain'});
        const fileName = 'tabela.json';

        saveAs(csvAsBlob, fileName)
    }

    window.localStorageToFile = localStorageToFile;
// export CSV

    let unique = (arr) => {
        // array of objects
        return Object.values(arr.reduce((acc, el) => Object.assign(acc, {[el.numero]: el}), {}))
    }

    let previousPage = () => $before.click()

    let scrapItemInfo = (line) => {

        try {
            let numero = line.querySelector('td:nth-child(2) a').innerText;
            let ed = line.querySelector('td:nth-child(3)').innerText;
            let descricao = line.querySelector('td:nth-child(4)').innerText;
            let empty = 'Não disponível';
            
            return {numero, ed, descricao};

        } catch (e) {
           console.log(e, line.querySelector('td:nth-child(1)'));
       }
    }

    let parseOneHtmlInfo = (fragment, query) => {
        let html = document.createElement( 'html' );
        html.innerHTML = fragment;

        return html.querySelector(query);
    }

    let openInventory = async (url) => {
        let href = await fetch(url)
        .then(function(response){
            return response.text();
        }).then((data) => {
            // faz o parse do html e busca o link para 'Detalhes da entrada'
            return parseOneHtmlInfo(data, '#content table tr:last-child a').href;
        });

        return href;
    }

    let openDetails = async (url) => {
        let nota = 'Não disponível';
        let dataNota = 'Não disponível';
        let empenho = 'Não disponível';

        let urlNumber = url.split('/')[4];

        if (urlNumber > 68) {
            await fetch(url)
                .then(function(response){
                return response.text();
            }).then(async (data) => {
                // faz o parse do html e busca as infos da nota
                let table = parseOneHtmlInfo(data, '#content table');
                let tipo = table.querySelector('tr:nth-child(3) td').innerText.toLowerCase();

                if (!tipo.match('doacao') || !tipo.match('doação')) {
                    nota = await table.querySelector('tr:nth-child(4) td').innerText;
                    dataNota = await table.querySelector('tr:nth-child(5) td').innerText;
                    empenho = await table.querySelector('tr:nth-child(12) td').innerText.trim();
                } else {
                    empenho = 'Doação'
                }

            });
        }

        return await {nota, dataNota, empenho}
    }

    let scraper = () => {
        let trsLen = $trs.length - 1;

        let lastItemBeforePause = parseInt(_navigator.getInfo().lastItemIndex) || 0;
        let lastPage = parseInt(_navigator.getInfo().lastPage);
        let pauseNumber = 0;

        console.log('start scrapper', pauseNumber);

        let compareRows = (prev, actual) => {
            return (
                prev.ed == actual.ed &&
                prev.descricao == actual.descricao &&
                prev.cargaAtual == actual.cargaAtual &&
                prev.cargaContabil == actual.cargaContabil &&
                prev.dataEntrada == actual.dataEntrada &&
                prev.dataCarga == actual.dataCarga &&
                prev.fornecedor == actual.fornecedor &&
                prev.valor == actual.valor)
        }

        let lastScrapedInfo = {};
        let itens = [];

        let loop = () => {
            let i = pauseNumber;

            if (i >= 1) {
                new Promise(async (resolve, reject) => {
                    let scrapedItem = {};

                    // pega os valores da tabela
                    let firstScrapInfo = await scrapItemInfo($trs[i]);

                    // remover
                    scrapedItem = Object.assign(firstScrapInfo, {});

                    lastScrapedInfo = scrapedItem;

                    if (Object.keys(scrapedItem).length > 0) {
                        itens.push(scrapedItem);
                    }

                    if (i == 2) {

                        _navigator.setPage(pageActive - 1)
                        _navigator.setLastItem(0)
                        //previousPage()
                        saveItem(itens);
                        console.log('save itens');
                        // console.log(itens);

                        setTimeout( () => {
                            previousPage()
                        }, 1000);

                    }

                    pauseNumber = pauseNumber - 1;

                    await resolve();

                }).then(loop.bind(null, 1));
            }
        }

        return {
            pause: function() {
                trsLen = pauseNumber;
                _navigator.setPage(pageActive)
                _navigator.setLastItem(pauseNumber - 1)
                document.querySelector('.loader').classList.remove('loading');

                pauseNumber = 0;
            },

            start: function(lastPage) {
                pauseNumber = lastItemBeforePause && (lastPage == pageActive) ? lastItemBeforePause : trsLen;
                loop();
                _navigator.setPage(pageActive);
                document.querySelector('.loader').classList.add('loading');

                console.log('start click', pauseNumber);
            }
        }
    }

    const filterDuplicatedObjectInArray = function (arr, key) {
        const seen = new Set();

        const filteredArr = arr.filter(el => {
            const duplicate = seen.has(el[key]);
            seen.add(el[key]);
            return !duplicate;
        });

        return filteredArr;
    }

    function init () {
        let scrap = scraper();
        _navigator.showLatestNavigator();

        let $auto = document.querySelector('.autostart');
        let $delete = document.querySelector('.t_btn.delete');

        $pause.addEventListener('click', () => scrap.pause());
        $start.addEventListener('click', () => scrap.start(pageActive));
        $auto.addEventListener('click', () => _navigator.toggleAutostart());
        $delete.addEventListener('click', () => _navigator.clearStorage());
        // file download button event listener
        fileDownloadButton.addEventListener('click', localStorageToFile);

        if (_navigator.getInfo().autostart) {
            $start.click()
        }
    }

    init()

})();
