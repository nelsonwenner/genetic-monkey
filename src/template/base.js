
nav = () => {
    let dados = `
        <div class="navbar-dark fixed-top bg-dark">
            <nav class="navbar container navbar-expand-lg">
                <img class="circle" id="img" height="60" width="60" src="./src/assets/img/monkey-laptop.png"/>
                <div class="collapse navbar-collapse">
                </div>
            </nav>
        </div>
    `
    const nav = document.getElementById("nav");
    nav.innerHTML = dados;
}

