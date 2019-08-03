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