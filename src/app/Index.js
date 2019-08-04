
class Index{
    constructor(){
        this.lengthPopulation = 0;
        this.rateMutation = 0.01;
        this.phrase = "Empty";
        this.width = 0;
        this.height = 0;
        this.frame = 0;
        this.pause = false;
        this.buttonRunClicked = false;
        this.population = new Population(this.lengthPopulation, this.rateMutation, this.phrase);
        this.html();
        this.eventInputButtonAdd();
        this.start();
    }   

    start = () => {
        this.loop();
    }

    loop = () => {
        this.update();
        this.eventButtonRun();
        this.eventButtonReload();
        this.runAlgorithmGenetic();
       
        if (this.pause == true){
            return;
        } else {
            window.requestAnimationFrame(this.loop);
        }
    }

    update = () => {
        this.frame++;
    }

    runAlgorithmGenetic = () => {
        if (this.population.completed != true && this.phrase != "Empty" && this.buttonRunClicked  == true){
            this.population.selectNatural();
            this.population.manegerGenes();
            soupWords(this.population.allGenes());
            informationRun(this.population.generation, this.population.bestFitness, this.population.bestDna);
        } else {

            this.buttonRunClicked  = false;
            if (this.population.bestDna == this.phrase){
                this.pause = true;
                monkeyCool();
            }
        }
    }

    div = (tag, id) => {
        const name = document.createElement(tag);
        name.id = id;
        document.body.appendChild(name);
    }

    html = () => {
        this.div("div", "nav");
        nav();
        this.div("div", "body");
        body(this.lengthPopulation, this.phrase);
    }

    eventInputButtonAdd = () => {
        const add = document.getElementById("add");
        const phrase = document.getElementById("phrase");
        const lengthPopulation = document.getElementById("lengthPoputation");

        add.addEventListener('click', (event) => {

            if (phrase.value != "" && lengthPopulation.value != ""){
                if (phrase.value.length <= 30 && lengthPopulation.value <= 1000){
                    this.phrase = phrase.value;
                    this.lengthPopulation = lengthPopulation.value;
                    this.html(); // Renderiza toda a pag novamente.
                } else {
                    alert("The length of the sentence cannot exceed 30 characters.");
                    event.preventDefault();
                }
            } else {
                alert("Empty fields!!");
                event.preventDefault();
            }
        });
    }
    
    eventButtonRun = () => {
        const eventButton = document.getElementById("run");
        eventButton.addEventListener('click', (event) => {

            if (this.phrase.length != 0 && this.lengthPopulation > 0){
                this.buttonRunClicked  = true;
                this.population = new Population(this.lengthPopulation, this.rateMutation, this.phrase);
            } else {
                event.preventDefault();
            }
        });
    }

    eventButtonReload = () => {
        const buttonReload = document.getElementById("reload");
        buttonReload.addEventListener('click', (event) => {
            window.location.reload();
        });
    }
}

new Index();