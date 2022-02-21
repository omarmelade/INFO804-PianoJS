// Info modal

function info_modal() {
    var modal = document.getElementById('modal');

    if (modal.className == 'open') {
        document.getElementById('modal').className = 'close';
    } else {
        modal.className = 'open';
    }
}


// Wave select boxes


function changeVC01() {
    let newWave = document.querySelector('#vco1').selectedOptions[0].value;

    for (let i = 0; i < ktab.length; i++) {
        ktab[i]['man'].vco.type = newWave;
    }
}

function changeVC02() {
    let newWave = document.querySelector('#vco2').selectedOptions[0].value;

    for (let i = 0; i < ktab.length; i++) {
        ktab[i]['man'].vco2.type = newWave;
    }
}

// Slider volume controls

function changeP2Vol() {
    p2 = document.querySelector("#p2Vol").value;
}

function changePisteVal(id, piste) {
    piste = document.querySelector("#" + id).value;
    console.log(piste);
}

function changeP1Vol() {
    p1 = document.querySelector("#p1Vol").value;
}


function changeMasterVol() {
    let val = document.querySelector("#masterVol").value / 100;
    master.gain.value = val;
}