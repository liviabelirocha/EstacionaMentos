function Revelar(div) {
    var display = document.getElementById(div).style.display;
    if(display == "none")
        document.getElementById(div).style.display = 'block';
    else
        document.getElementById(div).style.display = 'none';
}