
class Population{
    constructor(lengthPopulation, rateMutation, phrase){
        this.population = [];
        this.poolMating = [];
        this.rateMutation = rateMutation;
        this.lengthPopulation = lengthPopulation;
        this.phrase = phrase;
        this.bestFitness = 0;
        this.bestDna;
        this.generation = 0;
        this.completed = false;
        this.startPopulation();
    
    }

    startPopulation = () => {
        for (let i=0; i < this.lengthPopulation; i++){
            this.population.push(new Dna(this.phrase));
        }
    }

    calcBestFitness = () => {
        for (let i=0; i < this.lengthPopulation; i++){
            if (this.population[i].fitness() > this.bestFitness){
                this.bestFitness = this.population[i].fitness();
                this.bestDna = this.population[i].fenotipo();
            }
        }
        return this.bestFitness;
    }
    
    manegerGenes = () => {
        for (let i=0; i < this.population.length; i++){
            let indexA = this.randomForInterval(0, this.poolMating.length);
            let indexB = this.randomForInterval(0, this.poolMating.length);
            
            let partnerA = this.poolMating[indexA];
            let partnerB = this.poolMating[indexB];
     
            let child = partnerA.crossover(partnerB);

            child.mutation(this.rateMutation);
            
            this.population[i] = child;
        }
        this.generation += 1;

        if (this.bestDna == this.phrase){
            this.completed = true;
        }
    }

    randomForInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min) + min);
    }

    selectNatural = () => {
        let bestFitness = this.calcBestFitness();
        for (let i=0; i < this.population.length; i++){
            let fitness = this.newMap(this.population[i].fitnes, 0, bestFitness, 0, 1);
            let index = Math.floor(fitness * 100);
            for (let j=0; j < index; j++){
                this.poolMating.push(this.population[i]);
            }
        }
    }

    newMap = (value, start1, stop1, start2, stop2, limit) => {
        let newValue = (value - start1) / (stop1 - start1) * (stop2 - start2) + start2; 

        if (!limit){
            return newValue;
        } 
        if (start2 < stop2){
            return this.restrictValueBetweenMinimumAndMaximum(newValue, start2, stop2);
        } else {
            return this.restrictValueBetweenMinimumAndMaximum(newValue, stop2, start2);
        }
    }

    restrictValueBetweenMinimumAndMaximum = (value, valueMinimum, valueMaximum) => {
        return Math.max(Math.min(value, valueMaximum), valueMinimum);
    }

    allGenes = () => {
        let data = "";
        for (let i = this.population.length - 1; i >= this.population.length - 10; i--){
            data += `<h6 class="text-sm-center"> ${this.population[i].fenotipo()} </h6>`
        }
        return data;
    }
}