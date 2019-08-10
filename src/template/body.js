
body = (lengthPopulation, phrase) => {
    let data = `
    <main class="margin-top-110">
		<div class="my-container-flex ">
			<div class="card-style">
				<div class="container-flex-com-wrap">
					<div class="card-item-flex">
						<div class="monkey">
							<img class="rounded-circle perfil-monkey" id="img" height="110" width="110" src="./src/assets/img/monkeyChild.gif"/>
						</div>
						<div class="margin-button">
							<div class="card-style margin-10 fontSizeLow">
								<a class="" id="useNewFont" >Population: ${ lengthPopulation } </a><br>
								<a class="" id="useNewFont" >Phrase: ${ phrase } </a>
							</div>
						</div>
						<div class="margin-input">
							<input class="input" type="text" id="phrase" placeholder="Enter the phrase">
						</div>
						<div class="margin-input">
							<input class="input" type="number" id="lengthPoputation" placeholder="Population quantity">
							<button class="buttonn btn-dark margin-button-10" id="add" type="button">Add</button>
							<button class="buttonn btn-success" id="run" type="button">Execute</button>
							<button class="buttonn btn-info" id="reload" type="button">Reload</button>
						</div>
					</div>
					<div class="card-item-flex">
						<div class="wordSoup" id="soupWord">
							<h3 id="useNewFont">
								Word soup
							</h3>
							<br><img height="300" width="280" src="./src/assets/img/monkeyCrazy.gif"/>
						</div>
					</div>
					<div class="card-item-flex">
						<div class="info" id="info">
							<h3 id="useNewFont">
								Generation <br>0
							</h3>
							<h3 id="useNewFont">
								Fitness <br>0
							</h3>
							<h3 id="useNewFont">
								Phrase <br>Empty
							</h3>
                            <div class="monkeyCool" id="monkeyCool">
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
    <div class="info" id="info">
        <h3 id="useNewFont">
            Generation <br>${ generation }
        </h3>
        <h3 id="useNewFont">
            Fitness <br>${ bestFitness }
        </h3>
        <h3 id="useNewFont">
            Phrase <br>${ bestDna }
        </h3>
        <div id="monkeyCool">
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
    <div class="monkeyCool" id="monkeyCool">
        <img height="130" width="150" src="./src/assets/img/monkeyCool.gif"/>
	</div> 
    `
    const monkeyCool = document.getElementById("monkeyCool");
    monkeyCool.innerHTML = data;
}
