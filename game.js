var warning = document.getElementById("warning");

var contentent = document.getElementById("contentent");

var bird = document.getElementById("bird");
bird.style.left = '500px';					// pozycja ptaka
bird.style.top = '100px';

var cat = document.getElementById("cat");
cat.style.left = '500px';
cat.style.top = '200px';

var ptak = document.getElementById("ptak");
ptak.style.left = '10px';
ptak.style.top = '300px';
var x=y=15; //Prędkość ptaka polującego

var state = true;

var keysDown = [];						// przechowuje wcisniete klawisze
var keys = 
{
    left: 37,
    up: 38,
    right: 39,
    down: 40
};

var screenHeight = window.innerHeight;
var screenWidth = window.innerWidth;

function createElementIMG(id, src, width, height)
{
    var game = document.getElementById("content");
    var el = document.createElement("img");
    el.id = id;
    el.src = src;
    el.style.position = "fixed";
    el.width = width;
    el.height = height;
    el.style.top = (Math.round(Math.random() * (window.innerHeight - 80))) + "px";
    el.style.left = (Math.round(Math.random() * (window.innerWidth - 80))) + "px";
    game.appendChild(el);
}

function removeElement(id)
{
    var game = document.getElementById("content");
    var el = document.getElementById(id);
    game.removeChild(el);
}


function birdColision(idElement)
{
    var birdPositionCenterX = parseInt(bird.style.left) + 37;
    var birdPositionCenterY = parseInt(bird.style.top) + 30;

    if (document.getElementById(idElement))
    {
        var PositionX = parseInt(document.getElementById(idElement).style.left);
        var PositionXX = parseInt(document.getElementById(idElement).style.left) + parseInt(document.getElementById(idElement).width);
        var PositionY = parseInt(document.getElementById(idElement).style.top);
        var PositionYY = parseInt(document.getElementById(idElement).style.top) + parseInt(document.getElementById(idElement).height);

        if (birdPositionCenterX >= PositionX &&
                birdPositionCenterX <= PositionXX &&
                birdPositionCenterY >= PositionY &&
                birdPositionCenterY <= PositionYY)
        {
            if (idElement == "star")
            {
                var punkty = document.getElementById("punkty");
                var x = parseInt(punkty.innerHTML);
                x++;

                bird.setAttribute("class", "birdPunkt");

                punkty.innerHTML = x;
                punkty.style.color = "gold";

                //removeStar();
                //star();
                removeElement("star");
                createElementIMG("star", "img/star.gif", 80, 80);

                setTimeout(function ()
                {
                    bird.removeAttribute("class", "birdPunkt");
                    punkty.style.color = "red";
                }, 300);
            } else if (idElement == "lifePlus")
            {
                var obrazenia = document.getElementById("obrazenia").innerHTML = 0;
                bird.setAttribute("class", "birdPunkt");
                removeElement("lifePlus");

                setTimeout(function ()
                {
                    bird.removeAttribute("class", "birdPunkt");
                }, 300);
            }
        }
    }
}

function check()
{
    var birdPositionCenterX = parseInt(bird.style.left) + 37;
    var birdPositionCenterY = parseInt(bird.style.top) + 30;

    var lifePositionTop = parseInt(cat.style.top);
    var lifePositionBottom = parseInt(cat.style.top) + cat.height;
    var lifePositionLeft = parseInt(cat.style.left);
    var lifePositionRight = parseInt(cat.style.left) + cat.width;

    var ptakPositionTop = parseInt(ptak.style.top);
    var ptakPositionBottom = parseInt(ptak.style.top) + ptak.height;
    var ptakPositionLeft = parseInt(ptak.style.left);
    var ptakPositionRight = parseInt(ptak.style.left) + ptak.width;


    if (
    		(birdPositionCenterY >= lifePositionTop &&
            birdPositionCenterY <= lifePositionBottom &&
            birdPositionCenterX >= lifePositionLeft &&
            birdPositionCenterX <= lifePositionRight) ||
            (birdPositionCenterY >= ptakPositionTop &&
            birdPositionCenterY <= ptakPositionBottom &&
            birdPositionCenterX >= ptakPositionLeft &&
            birdPositionCenterX <= ptakPositionRight)
       )
    {
        var obrazenia = document.getElementById("obrazenia");
        var xx = parseInt(obrazenia.innerHTML);
        xx++;

        bird.src = "img/pp.gif";

        content.style.opacity = "0.6";
        warning.style.display = "block";
        warning.innerHTML = xx + "%";
        if (xx > 100)
        {
            obrazenia.innerHTML = 0;
            var zycia = document.getElementById("zycia");
            var z = parseInt(zycia.innerHTML);
            z--;
            zycia.innerHTML = z;
            if (z <= 0)
            {
                var punkty = document.getElementById("punkty");
                var x = parseInt(punkty.innerHTML);
                alert("Koniec gry - zebrałeś punktów: "+x+ " w czasie: "+min+":"+sec);
                location.reload();
            }
        } else
        {
            obrazenia.innerHTML = xx;
        }
    } else
    {
        content.style.opacity = "";
        warning.style.display = "none";
        bird.src = "img/p.gif";
    }
}

function controlInit() {

    window.addEventListener('keydown', function (e) {
        keysDown[e.keyCode] = true;
        // if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        //     e.preventDefault();
        // } 
    });

    window.addEventListener('keyup', function (e) {
        delete keysDown[e.keyCode];
    });
}

function moveBird()
{
    if (keys.left in keysDown)
    {
        if (bird.style.transform != "")
            bird.style.transform = "";
        if (parseInt(bird.style.left) != 0)
        {
            bird.style.left = parseInt(bird.style.left) - 10 + 'px';
        }

    }

    if (keys.right in keysDown)
    {
        if (bird.style.transform == "")
            bird.style.transform = "rotateY(180deg)";
        if (parseInt(bird.style.left) + 75 <= screenWidth)
        {
            bird.style.left = parseInt(bird.style.left) + 10 + 'px';
        }
    }

    if (keys.up in keysDown)
    {
        if (parseInt(bird.style.top) != 0)
        {
            bird.style.top = parseInt(bird.style.top) - 10 + 'px';
        }

    }

    if (keys.down in keysDown)
    {
        if (parseInt(bird.style.top) + 60 <= screenHeight)
        {
            bird.style.top = parseInt(bird.style.top) + 10 + 'px';
        }
    }
    birdColision("star");
    birdColision("lifePlus");
    check();
}

function move()
{
    document.getElementsByTagName("body")[0].style.height = window.innerHeight - 20 + "px";

    controlInit();

    setInterval(moveBird, 25);
}

function moveCat()
{
    if (state)
    {
        cat.style.top = (parseInt(cat.style.top) + 10) + "px";
        if (parseInt(cat.style.top) >= 1200)
        {
            var positionX = Math.round(Math.random() * (window.innerWidth - 110));
            cat.style.left = positionX + "px";
            state = false;
        }
    } else
    {
        cat.style.top = (parseInt(cat.style.top) - 10) + "px";
        if (parseInt(cat.style.top) <= 50)
        {
            state = true;
        }
    }
}

function movePtak()
{  
		              
        if ( (parseInt(ptak.style.top) < -500) || (parseInt(ptak.style.top)+ptak.height > window.innerHeight) )
        {
            y = -y;
        }
     	else if( (parseInt(ptak.style.left) < -500) || (parseInt(ptak.style.left)+ptak.width > window.innerWidth+500) )
    	{
       		x = -x;
       		if(x>0)
       			ptak.style.transform = "";
       		else 
            	ptak.style.transform = "rotateY(180deg)";
   		}
   		ptak.style.top = (parseInt(ptak.style.top) + y) + "px";
       	ptak.style.left = (parseInt(ptak.style.left) + x) + "px";
}

var sec = min = "00";

function Timer()
{
	var timer = document.querySelector("#timer");


	sec++;
	if(sec == 60)
	{
		sec = 0;
		min++;
		if (min<10)
		min = "0"+min;
	}
	if (sec<10)
		sec = "0"+sec;
	
	timer.innerHTML = min+":"+sec;
}

window.onload = function ()
{
    startC = document.getElementById("startContainer");
    start = document.getElementById("start");
    start.addEventListener('click', function(){
        startC.style.display = 'none';

        createElementIMG("star", "img/star.gif", 80, 80);
    var lifeInterval = setInterval(function(){
        if(!document.getElementById("lifePlus"))
        createElementIMG("lifePlus", "img/apteczka.png", 60, 60);
    }, 60000);

    move();
    var catInterval = setInterval(moveCat, 15);
    var ptakInterval = setInterval(movePtak,50);
    var timerInterval = setInterval(Timer, 1000);
    
    var reg = /pause.png/;
    var pause = document.getElementById("pause");
    pause.addEventListener('click', function(){
        if(reg.test(pause.src))
        {
            pause.src = "img/play.ico";
            clearInterval(catInterval);
            clearInterval(ptakInterval); 
            clearInterval(lifeInterval);
            clearInterval(timerInterval);
        }
        else
        {
            pause.src = "img/pause.png";
            catInterval = setInterval(moveCat, 15);
            ptakInterval = setInterval(movePtak,50);
            timerInterval = setInterval(Timer, 1000);

                lifeInterval = setInterval(function(){
                if(!document.getElementById("lifePlus"))
                createElementIMG("lifePlus", "img/apteczka.png", 60, 60);
                }, 30000);
        }
        
    });
    })
};