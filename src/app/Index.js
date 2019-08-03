
class Index{
    constructor(){
        this.totalPopulacao = 0;
        this.taxaMutacao = 0.01;
        this.frase = "Empty";
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
        if (this.populacao.concluido != true && this.frase != "Empty" && this.executar == true){
            this.populacao.selecaoNatural();
            this.populacao.manegerGenes();
            sopaPalavras(this.populacao.allGenes());
            infoExecucao(this.populacao.geracao, this.populacao.melhorfitness, this.populacao.melhorDNA);
        } else {
            this.executar = false;
            this.pause = true;

            if (this.populacao.melhorDNA == this.frase){
                monkeyOk();
            }
        }
    }

    div = (tag, id) => {
        const nome = document.createElement(tag);
        nome.id = id;
        document.body.appendChild(nome);
    }

    html = () => {
        this.div("div", "nav");
        nav();
        this.div("div", "body");
        body(this.totalPopulacao, this.frase);
    }

    pergandoInput = () => {
        const adicionar = document.getElementById("adicionar");
        const frase = document.getElementById("frase");
        const qntPopulacao = document.getElementById("qnt_polulacao");

        adicionar.addEventListener('click', (event) => {

            if (frase.value != "" && qntPopulacao.value != ""){
                if (frase.value.length <= 30 && qntPopulacao.value <= 1000){
                    this.frase = frase.value;
                    this.totalPopulacao = qntPopulacao.value;
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
            window.location.reload();
        });
    }
}

new Index();