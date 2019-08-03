
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