// Info modal

function info_modal() {
    var modal = document.getElementById('modal');

    if (modal.className == 'open') {
        modal.className = 'close';
    } else {
        modal.className = 'open';
    }
}

function changeMasterVol() {
    console.log(document.querySelector("#masterVol").value);
    let val = document.querySelector("#masterVol").value / 100;
    console.log(val);
    master.gain.value = val;
}