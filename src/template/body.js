
body = (totalPopulacao, frase) => {
    let dados = `
    <main class="mt-5">
        <div class="col mt-5"></div>
        <div class="col mt-5"></div>
        <div class="col mt-5"></div>
        <div class="card container mt-5">
            <div class="row ">
                <div class="col col-4 mt-2 mb-2">
                    <div class="card">
                        <div class="card-header">
                            <div class="text-center">
                                <img class="rounded-circle" id="img" height="110" width="110" src="./src/assets/img/y.gif"/>
                            </div>
                            <div class="card mt-3 pl-2">
                                <a class="pt-2" id="populacao" >Population: ${ totalPopulacao } </a>
                                <a class="pb-2" id="palavra" >Phrase: ${ frase } </a>
                            </div>
                            <div class="mt-2">
                                <input class="form-control" type="text" id="frase" placeholder="Enter the phrase">
                                <input class="form-control mt-1" type="number" id="qnt_polulacao" placeholder="Population quantity">
                                <button class="btn btn-dark btn-sm btn-block my-2" id="adicionar" type="button">Add</button>
                            </div> 
                            <div class="mt-2">
                                <button class="btn btn-success btn-sm btn-block my-2" id="executar" type="button">Execute</button>
                            </div>
                            <div class="mt-2">
                                <button class="btn btn-info btn-sm btn-block my-2" id="reload" type="button">Reload</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4 mt-2">
                    <div class="card">
                        <div class="card-header" style="height: 430px">
                            <div class="text-center" id="sopa_palavras">
                                <h3 class="pt-2 text-center" id="geracao">
                                    Word soup
                                </h3>
                                    <br><img text-center" id="macaco_louco" height="300" width="280" src="./src/assets/img/macaco_louco.gif"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-4 mt-2">
                    <div class="card">
                        <div class="card-header" style="height: 430px">
                            <div id="info">
                                <h3 class="pt-2 text-center" id="geracao">
                                    Generation <br>0
                                </h3>
                                <h3 class="pt-2 text-center" id="geracao">
                                    Fitness <br>0
                                </h3>
                                <h3 class="pt-2 text-center" id="geracao">
                                    Phrase <br>Empty
                                </h3>
                                <div class="text-center pt-5 pl-5" id="macaco_ok">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
    `
    const body = document.getElementById("body");
    body.innerHTML = dados;
}

infoExecucao = (geracao, melhorFit, melhorDna) => {
    let dados = `
        <div id="info">
            <h3 class="pt-2 text-center" id="geracao">
                Generation <br>${ geracao }
            </h3>
            <h3 class="pt-2 text-center" id="geracao">
                Fitness <br>${ melhorFit }
            </h3>
            <h3 class="pt-2 text-center" id="geracao">
                Phrase <br>${ melhorDna }
            </h3>
            <div class="text-center pt-5 pl-5" id="macaco_ok">
            </div>
        </div>
    `
    const info = document.getElementById("info");
    info.innerHTML = dados;
}

sopaPalavras = (todosGenes) =>{
    const info = document.getElementById("sopa_palavras");
    info.innerHTML = ` 
    <div class="text-center" id="sopa_palavras">
        <h3 class="pt-2 text-center" id="geracao">
            Word soup
        </h3>
        <br>${ todosGenes }
    </div>`
}

monkeyOk = () => {
    let dados = `
        <img height="130" width="150" src="./src/assets/img/macaco_legal.gif"/>
    `
    const macaco_ok = document.getElementById("macaco_ok");
    macaco_ok.innerHTML = dados;
}
