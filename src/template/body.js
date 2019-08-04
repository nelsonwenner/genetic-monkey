
body = (lengthPopulation, phrase) => {
    let data = `
    <main class="mt-5">
        <div class="col mt-5"></div>
        <div class="col mt-5"></div>
        <div class="col mt-5"></div>
        <div class="card container mt-5">
            <div class="row ">
                <div class="col col-lg-4 col-sm-6 mt-2 mb-2">
                    <div class="card">
                        <div class="card-header">
                            <div class="text-center">
                                <img class="rounded-circle" id="img" height="110" width="110" src="./src/assets/img/monkeyChild.gif"/>
                            </div>
                            <div class="card mt-3 pl-2">
                                <a class="pt-2" id="useNewFont" >Population: ${ lengthPopulation } </a>
                                <a class="pb-2" id="useNewFont" >Phrase: ${ phrase } </a>
                            </div>
                            <div class="mt-2">
                                <input class="form-control" type="text" id="phrase" placeholder="Enter the phrase">
                                <input class="form-control mt-1" type="number" id="lengthPoputation" placeholder="Population quantity">
                                <button class="btn btn-dark btn-sm btn-block my-2" id="add" type="button">Add</button>
                            </div> 
                            <div class="mt-2">
                                <button class="btn btn-success btn-sm btn-block my-2" id="run" type="button">Execute</button>
                            </div>
                            <div class="mt-2">
                                <button class="btn btn-info btn-sm btn-block my-2" id="reload" type="button">Reload</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col col-lg-4 col-sm-6 mt-2">
                    <div class="card">
                        <div class="card-header" style="height: 430px">
                            <div class="text-center" id="soupWord">
                                <h3 class="pt-2 text-center" id="useNewFont">
                                    Word soup
                                </h3>
                                    <br><img text-center" height="300" width="280" src="./src/assets/img/monkeyCrazy.gif"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col col-lg-4 col-sm-12 mt-2">
                    <div class="card">
                        <div class="card-header" style="height: 430px">
                            <div id="info">
                                <h3 class="pt-2 text-center" id="useNewFont">
                                    Generation <br>0
                                </h3>
                                <h3 class="pt-2 text-center" id="useNewFont">
                                    Fitness <br>0
                                </h3>
                                <h3 class="pt-2 text-center" id="useNewFont">
                                    Phrase <br>Empty
                                </h3>
                                <div class="text-center pt-5 pl-5" id="monkeyCool">
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
    body.innerHTML = data;
}

informationRun = (generation, bestFitness, bestDna) => {
    let data = `
        <div id="info">
            <h3 class="pt-2 text-center" id="useNewFont">
                Generation <br>${ generation }
            </h3>
            <h3 class="pt-2 text-center" id="useNewFont">
                Fitness <br>${ bestFitness }
            </h3>
            <h3 class="pt-2 text-center" id="useNewFont">
                Phrase <br>${ bestDna }
            </h3>
            <div class="text-center pt-5 pl-5" id="monkeyCool">
            </div>
        </div>
    `
    const info = document.getElementById("info");
    info.innerHTML = data;
}

soupWords = (allGenes) =>{
    const data = ` 
    <div class="text-center" id="soupWord">
        <h3 class="pt-2 text-center" id="useNewFont">
            Word soup
        </h3>
        <br>${ allGenes }
    </div>
    `
    const soupWord = document.getElementById("soupWord");
    soupWord.innerHTML = data;
}

monkeyCool = () => {
    let data = `
        <img height="130" width="150" src="./src/assets/img/monkeyCool.gif"/>
    `
    const monkeyCool = document.getElementById("monkeyCool");
    monkeyCool.innerHTML = data;
}
