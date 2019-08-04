class Dna{
    constructor(phrase){
        this.phrase = phrase;
        this.fitnes = 0;
        this.genes = [];
        this.startDna();
    }

    startDna = () => {
        for (let i=0; i < this.phrase.length; i++){
            this.genes.push(this.newCaracter());
        }
    }

    newCaracter = () => {
        return this.convertASCII(this.randomForInterval(32, 128));
    }

    fitness = () => {
        let score = 0;
        for (let i=0; i < this.phrase.length; i++){
            if (this.genes[i] == this.phrase[i]){
                score++;
            }
        }
        this.fitnes = this.calcFit(score, this.genes.length);
        return this.fitnes;
    }

    calcFit = (scores, length) => {
        return Math.pow((scores / length), 3);
    }

    crossover = (objPartner) => {
        let child = new Dna(this.phrase);
        let slice = this.randomForInterval(0, this.genes.length);
        for (let i=0; i < this.genes.length; i++){
            if (i > slice){
                child.genes[i] = this.genes[i];
            } else {
                child.genes[i] = objPartner.genes[i];
            }
        }
        return child;
    }
    
    fenotipo = () => {
        return this.genes.join('');
    }
    
    mutation = (rateMutation) => {
        for (let i=0; i < this.genes.length; i++){
            if (Math.random(1) < rateMutation){
                this.genes[i] = this.newCaracter();
            }
        }
    }
    
    convertASCII = (value) => {
        return String.fromCharCode(value);
    }

    randomForInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

}