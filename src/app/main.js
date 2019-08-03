class Dna{
    constructor(frase){
        this.frase = frase;
        this.genes = [];
        this.fitnes = 0;
        this.gerarDna();
    }

    gerarDna = () => {
        for (let i=0; i < this.frase.length; i++){
            this.genes.push(this.newCaracter());
        }
    }

    newCaracter = () => {
        return this.converterASCII(this.randomParaIntervalo(32, 128));
    }

    fitness = () => {
        let pontos = 0;
        for (let i=0; i < this.frase.length; i++){
            if (this.genes[i] == this.frase[i]){
                pontos++;
            }
        }
        this.fitnes = this.calcFit(pontos, this.genes.length);
        return this.fitnes;
    }

    calcFit = (pontos, tamanho) => {
        return Math.pow((pontos / tamanho), 3);
    }

    crossover = (objParceiro) => {
        let filho = new Dna(this.frase);
        let corte = this.randomParaIntervalo(0, this.genes.length);
        for (let i=0; i < this.genes.length; i++){
            if (i > corte){
                filho.genes[i] = this.genes[i];
            } else {
                filho.genes[i] = objParceiro.genes[i];
            }
        }
        return filho;
    }

    fenotipo = () => {
        return this.genes.join('');
    }
    
    mutacao = (taxaMutacao) => {
        for (let i=0; i < this.genes.length; i++){
            if (Math.random(1) < taxaMutacao){
                this.genes[i] = this.newCaracter();
            }
        }
    }
    
    converterASCII = (valor) => {
        return String.fromCharCode(valor);
    }

    randomParaIntervalo = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

}

class Populacao{
    constructor(qntPopulacao, taxaMutacao, frase){
        this.populacao = [];
        this.piscinaAcasalamento = [];
        this.taxaMutacao = taxaMutacao;
        this.qntPopulacao = qntPopulacao;
        this.frase = frase;
        this.melhorfitness = 0;
        this.melhorDNA;
        this.geracao = 0;
        this.concluido = false;
        this.gerarPopulacao();
    
    }

    gerarPopulacao = () => {
        for (let i=0; i < this.qntPopulacao; i++){
            this.populacao.push(new Dna(this.frase));
        }
    }

    calculandoMaiorFitness = () => {
        for (let i=0; i < this.qntPopulacao; i++){
            if (this.populacao[i].fitness() > this.melhorfitness){
                this.melhorfitness = this.populacao[i].fitness();
                this.melhorDNA = this.populacao[i].fenotipo();
            }
        }
        return this.melhorfitness;
    }
    
    manegerGenes = () => {
        for (let i=0; i < this.populacao.length; i++){
            let indiceA = this.randomParaIntervalo(0, this.piscinaAcasalamento.length);
            let indiceB = this.randomParaIntervalo(0, this.piscinaAcasalamento.length);
            
            let parceiroA = this.piscinaAcasalamento[indiceA];
            let parceiroB = this.piscinaAcasalamento[indiceB];
     
            let filho = parceiroA.crossover(parceiroB);

            filho.mutacao(this.taxaMutacao);
            
            this.populacao[i] = filho;
        }
        this.geracao += 1;

        if (this.melhorDNA == this.frase){
            this.concluido = true;
        }
    }

    randomParaIntervalo = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    selecaoNatural = () => {
        let maiorFitness = this.calculandoMaiorFitness();
        for (let i=0; i < this.populacao.length; i++){
            let fitness = this.newMap(this.populacao[i].fitnes, 0, maiorFitness, 0, 1);
            let index = Math.floor(fitness * 100);
            for (let j=0; j < index; j++){
                this.piscinaAcasalamento.push(this.populacao[i]);
            }
        }
    }

    newMap = (valor, start1, stop1, start2, stop2, limite) => {
        let newValor = (valor - start1) / (stop1 - start1) * (stop2 - start2) + start2; 

        if (!limite){
            return newValor;
        } 
        if (start2 < stop2){
            return this.restringeValorEntreMinimoEMaximo(newValor, start2, stop2);
        } else {
            return this.restringeValorEntreMinimoEMaximo(newValor, stop2, start2);
        }
    }

    restringeValorEntreMinimoEMaximo = (valor, valorMinimo, valorMaximo) => {
        return Math.max(Math.min(valor, valorMaximo), valorMinimo);
    }

    allGenes = () => {
        let dados = "";
        for (let i = this.populacao.length - 1; i >= this.populacao.length - 10; i--){
            dados += `<h6 class="text-sm-center"> ${this.populacao[i].fenotipo()} </h6>`
        }
        return dados;
    }
}

class Index{
    constructor(){
        this.totalPopulacao = 0;
        this.taxaMutacao = 0.01;
        this.frase = "Vazio";
        this.largura = 0;
        this.altura = 0;
        this.frame = 0;
        this.populacao = new Populacao(this.totalPopulacao, this.taxaMutacao, this.frase);
        this.pause = false;
        this.executar = false;
        this.info = 0;
        this.html();
        this.pergandoInput();
        this.start();
    }   

    start = () => {
        this.loop();
    }

    loop = () => {
        this.update();
        this.buttonExecutar();
        this.reload();
        this.algoritmoGenetico();

        if (this.pause == false){
            return;
        } else {
            window.requestAnimationFrame(this.loop);
        }
    }

    update = () => {
        this.frame++;
    }

    algoritmoGenetico = () => {
        if (this.populacao.concluido != true && this.frase != "Vazio" && this.executar == true){
            this.populacao.selecaoNatural();
            this.populacao.manegerGenes();
            this.sopaPalavras();
            this.infoExecucao();
        } else {
            this.executar = false;
            this.pause = true;
        }
    }

    div = (tag, id) => {
        const nome = document.createElement(tag);
        nome.id = id;
        document.body.appendChild(nome);
    }

    html = () => {
        this.div("div", "navBar");
        this.navBar();
        this.div("div", "body");
        this.body();
    }

    pergandoInput = () => {
        const adicionar = document.getElementById("adicionar");
        const frase = document.getElementById("frase");
        const qntPopulacao = document.getElementById("qnt_polulacao");

        adicionar.addEventListener('click', (event) => {

            if (frase.value != "" && qntPopulacao.value != ""){
                if (frase.value.length <= 30 && qntPopulacao.value <= 10000){
                    this.frase = frase.value;
                    this.totalPopulacao = qntPopulacao.value;
                    this.html(); // Renderiza toda a pag novamente.
                } else {
                    alert("O tamanho da frase não pode ultrapassar os 30 caracteres.");
                    event.preventDefault();
                }
            } else {
                alert("Campos vazios!!");
                event.preventDefault();
            }
        });
    }
    
    buttonExecutar = () => {
        const buttonExecutar = document.getElementById("executar");
        buttonExecutar.addEventListener('click', (event) => {

            if (this.frase.length != 0 && this.totalPopulacao > 0){
                this.executar = true;
                this.populacao = new Populacao(this.totalPopulacao, this.taxaMutacao, this.frase);
            } else {
                event.preventDefault();
            }
        });
    }

    reload = () => {
        const buttonReload = document.getElementById("reload");
        buttonReload.addEventListener('click', (event) => {
            this.html();
            window.location.reload();
        });
    }

    navBar = () => {
        let dados = `
            <div class="navbar-dark fixed-top bg-dark">
                <nav class="navbar container navbar-expand-lg">
                    <img class="circle" id="img" height="60" width="60" src="./src/assets/img/monkey-laptop.png"/>
                    <div class="collapse navbar-collapse">
                    </div>
                </nav>
            </div>
        `
        const nome = document.getElementById("navBar");
        nome.innerHTML = dados;
    }

    sopaPalavras = () =>{
        const info = document.getElementById("sopa_palavras");
        info.innerHTML = ` 
        <div class="text-center" id="sopa_palavras">
            <h3 class="pt-2 text-center" id="geracao">
                Sopa de palavras
            </h3>
            <br>${ this.populacao.allGenes() }
        </div>`
    }
    
    body = () => {
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
                                    <a class="pt-2" id="populacao" >Populacao: ${ this.totalPopulacao } </a>
                                    <a class="pb-2" id="palavra" >Frase: ${ this.frase } </a>
                                </div>
                                <div class="mt-2">
                                    <input class="form-control" type="text" id="frase" placeholder="Digite a frase">
                                    <input class="form-control mt-1" type="number" id="qnt_polulacao" placeholder="Quantidade populacao">
                                    <button class="btn btn-dark btn-sm btn-block my-2" id="adicionar" type="button">Adicionar</button>
                                </div> 
                                <div class="mt-2">
                                    <button class="btn btn-success btn-sm btn-block my-2" id="executar" type="button">Executar</button>
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
                                        Sopa de palavras
                                    </h3>
                                        <br><img text-center" height="300" width="280" src="./src/assets/img/macaco_louco.gif"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-4 mt-2">
                        <div class="card">
                            <div class="card-header" style="height: 430px">
                                <div id="info">
                                    <h3 class="pt-2 text-center" id="geracao">
                                        Geracao <br>0
                                    </h3>
                                    <h3 class="pt-2 text-center" id="geracao">
                                        Fitness <br>0
                                    </h3>
                                    <h3 class="pt-2 text-center" id="geracao">
                                        Frase <br>Vazio
                                    </h3>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
	    </main>
        `
        const nome = document.getElementById("body");
        nome.innerHTML = dados;
    }

    infoExecucao = () => {
        let dados = `
            <div id="info">
                <h3 class="pt-2 text-center" id="geracao">
                    Geracao <br>${ this.populacao.geracao }
                </h3>
                <h3 class="pt-2 text-center" id="geracao">
                    Fitness <br>${ this.populacao.melhorfitness }
                </h3>
                <h3 class="pt-2 text-center" id="geracao">
                    Frase <br>${ this.populacao.melhorDNA }
                </h3>
            </div>
        `
        const geracao = document.getElementById("info");
        geracao.innerHTML = dados;
    }
}

new Index();