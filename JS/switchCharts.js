function toggleDiv(divid) {

    varon = divid + 'id';
    varoff = divid + 'Zoomid';

    if (document.getElementById(varon).style.display == 'block') {
        document.getElementById(varon).style.display = 'none';
        document.getElementById(varoff).style.display = 'block';
    } else {
        document.getElementById(varoff).style.display = 'none';
        document.getElementById(varon).style.display = 'block'
    }
}