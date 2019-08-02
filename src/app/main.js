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

}

class Index{
    constructor(totalPopulacao, taxaMutacao, frase){
        this.totalPopulacao = totalPopulacao;
        this.taxaMutacao = taxaMutacao;
        this.frase = frase;
        this.largura = 0;
        this.altura = 0;
        this.frame = 0;
        this.contexto = this.createCanvas();
        this.populacao = new Populacao(this.totalPopulacao, this.taxaMutacao, this.frase);
        this.pause = false;
        this.html();
        this.init = this.start();

    }   

    start = () => {
        this.loop();
    }

    createCanvas = () => {
        let canvas = document.createElement("canvas");
        canvas.width = this.largura;
        canvas.height = this.altura;
        let contexto = canvas.getContext("2d");
        document.body.appendChild(canvas);
        return contexto;
    }

    loop = () => {
        this.update();
        //this.desenhar();
        //this.html();
        this.algoritmoGenetico();

        if (this.pause){
            return;
        } else {
            window.requestAnimationFrame(this.loop);
        }
    }

    update = () => {
        this.frame++;
    }

    desenhar = () => {
        this.background();
    }

    background = () => {
        this.contexto.fillStyle = "black";
        this.contexto.fillRect(0, 0, this.largura, this.altura);
    }

    algoritmoGenetico = () => {
        if (this.populacao.concluido != true){
            this.populacao.selecaoNatural();
            this.populacao.manegerGenes();
            this.info();
        } else {
            this.result();
            this.pause = true;
        }
    }

    result = () => {
        console.log("\n############### SUCESSO ################");
        console.log("GERACAO: ", this.populacao.geracao);
        console.log("MELHOR INDIVIDUO: ", this.populacao.melhorDNA);
        console.log("MELHOR FITNESS: ", this.populacao.melhorfitness);
        console.log("RESULTADO: ", this.populacao.melhorDNA);
    }

    info = () => {
        let dados = `
            <h2> GERAÇÃO: ${this.populacao.geracao} </h2>
            <h2> EXECUTANDO: ${this.populacao.melhorDNA} </h2>
        `   
        const nome = document.getElementById("nome");
        nome.innerHTML = dados;
    }
    
    div = (tag, id) => {
        const nome = document.createElement(tag);
        nome.id = id;
        document.body.appendChild(nome);
    }

    html = () => {
        this.div("div", "nome");
        //this.container();
        //this.info();
    }
}

new Index(1000, 0.01, "nelson dias");