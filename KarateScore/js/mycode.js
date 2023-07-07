function getSenshu(id) {
    var p = document.getElementById(id);
    var anotherP;
    anotherP = document.getElementById('senshu-aka');

    if (id === 'senshu-aka')
        anotherP = document.getElementById('senshu-ao');

    if (p.style.visibility === 'visible')
        p.style.visibility = 'hidden';
    else if (anotherP.style.visibility != 'visible')
        p.style.visibility = 'visible';

}

//===============NAME CORRECTION==================

// function correctName(id) {

//     var e = document.getElementById(id);

//     if (e.clientWidth < e.scrollWidth)
//         e.style.fontSize = "8vh";
//     else
//         e.style.fontSize = '10vh';
// }

//========================================================


//==============Penalty===========================
function getPenalty(id) {
    var arr = ['C1', 'C2', 'C3', 'HC', 'H'];
    var type = id.split('-');
    var element = document.getElementById(id);

    if (element.innerText === '')
        for (var i = 0; i < 5; ++i) {

            element = document.getElementById(type[0] + "-" + arr[i]);

            element.innerHTML = arr[i];

            if (type[1] === arr[i])
                return;
        }
    else {
        var ok = false;

        for (var i = 0; i < 5; ++i) {
            var type = id.split('-');

            if (type[1] == arr[i])
                ok = true;

            if (ok) {
                var subElement = document.getElementById(type[0] + "-" + arr[i]);
                subElement.innerHTML = '';
            }

        }

    }
}
//================REDIRECT======================
function redirect(page) {
    if (confirm("CHUYỂN CHẾ ĐỘ"))
        window.location = page;
}
//==============================================

//===========RELOAD=====================
function reload() {
    if (confirm("RESET SYSTEM")) {
        location.reload();
    }
}

function setTime(time) {
    var arr = time.split(":");

    document.getElementById('minute').value = arr[0];
    document.getElementById('second').value = arr[1];

}

//====================================

//=================TIME============================

var timeout = null; // Timeout

function getVictory() {

    var akaScore = document.getElementById('aka-score').value;
    var aoScore = document.getElementById('ao-score').value;

    if (parseInt(akaScore) < parseInt(aoScore))
        return 'ao';
    if (parseInt(akaScore) > parseInt(aoScore))
        return 'aka';

    if (document.getElementById('senshu-aka').style.visibility === 'visible')
        return 'aka';
    if (document.getElementById('senshu-ao').style.visibility === 'visible')
        return 'ao';

    return null;
}

function setTimeEffect(effectTime, s, victory) {
    var victorySide = document.getElementById(victory + '-' + 'score');
    var color = 'blue';

    if (victory === 'aka') 
        color = 'red';

    if (s == 0) {
        document.getElementById('minute').style.color = 'yellow';
        document.getElementById('second').style.color = 'yellow';
        if (victory != null)
            document.getElementById(victory + '-' + 'score').style.color = color;
        
        clearTimeout(effectTime);
    }

    else {
        effectTime = setTimeout(function () {
            s--;
            if (document.getElementById('minute').style.color != 'white') {
                document.getElementById('minute').style.color = 'white';
                document.getElementById('second').style.color = 'white';
                
                if (victory != null)
                    document.getElementById(victory + '-' + 'score').style.color = 'white';
            }
            else {
                document.getElementById('minute').style.color = 'yellow';
                document.getElementById('second').style.color = 'yellow';

                if (victory != null)
                    document.getElementById(victory + '-' + 'score').style.color = color;
            }

            setTimeEffect(effectTime, s, victory);
        }, 200);
    }
}

function start(m, s) {
    if (s === -1) {
        m -= 1;
        s = 59;
    }

    //TIMEOUT
    if (m == -1) {
        document.getElementById('start-button').innerHTML = 'START';
        var victory = getVictory();
        setTimeEffect(null, 40, victory);

        stop();
        return false;
    }

    document.getElementById('minute').value = m.toString();

    if (0 <= s && s < 10)
        document.getElementById('second').value = '0' + s.toString();
    else
        document.getElementById('second').value = s.toString();

    timeout = setTimeout(function () {
        s--;
        start(m, s);
    }, 1000);
}


function stop() {
    clearTimeout(timeout);
}

function pressStartButton() {

    var element = document.getElementById('start-button');

    var minuteElement = document.getElementById('minute');
    var secondElement = document.getElementById('second');

    var m = parseInt(minuteElement.value);
    var s = parseInt(secondElement.value);

    if (element.innerText === 'START') {
        element.innerHTML = 'PAUSE';
        start(m, s);
    }
    else {
        element.innerHTML = 'START';
        stop();
    }
}
//================TIME=========================