var contexto =  document.getElementById("lienzoJuego")
var ctx = contexto.getContext("2d")
var WIDTH = 300;
var HEIGHT = 530;
var CANVAS_WIDTH = 300;
var CANVAS_HEIGTH = 530;
contexto.width = WIDTH;
contexto.height = HEIGHT;

//VARIABLES
var score = 0
var FPS = 60
var gravedad = 1.5
var personaje = {
    x : 50,
    y : 150,
    w : 50,
    h : 50
}
var tuberias = new Array()
tuberias[0] = {
    x:contexto.width,
    y:0
}
//VARIABLES AUDIOS

var punto = new Audio()
punto.src = "audios/punto.mp3"

//VARIABLES IMAGENES

var bird = new Image()
bird.src = "imagenes/bird.png"

var fondo = new Image()
fondo.src = "imagenes/fondo.png"

var suelo = new Image()
suelo.src = "imagenes/suelo.png"

var tuberiaSur = new Image()
tuberiaSur.src = "imagenes/tuberiaSur.png"

var tuberiaNorte = new Image()
tuberiaNorte.src = "imagenes/tuberiaNorte.png"

//CONTOL
function presionar(){
    personaje.y -= 35
}
resize()
function resize(){
    CANVAS_HEIGTH = window.innerHeight;
    CANVAS_WIDTH = window.innerWidth;

    contexto.width = WIDTH;
    contexto.height = HEIGHT;

    contexto.style.height = ""+CANVAS_HEIGTH+ "px";
    
}

//BUCLE
setInterval(loop, 1000/FPS)

function loop(){
    ctx.clearRect(0, 0, 300, 700)

    //FONDO
    ctx.drawImage(fondo, 0,0)
    ctx.drawImage(suelo, 0, contexto.height - suelo.height)
    
    //PERSONAJE
    ctx.drawImage(bird, personaje.x, personaje.y)
   
    //TUBERIAS
    for(var i = 0; i < tuberias.length; i++){
        var constante = tuberiaNorte.height + 80
        ctx.drawImage(tuberiaNorte, tuberias[i].x, tuberias[i].y)
        ctx.drawImage(tuberiaSur, tuberias[i].x, tuberias[i].y + constante)
        tuberias[i].x-- 
        
        if(tuberias[i].y + tuberiaNorte.height < 80){
            tuberias[i].y = 0
        }
        
        if(tuberias[i].x == 150){
            tuberias.push({
                x:contexto.width,
                y:Math.floor(Math.random()*tuberiaNorte.height) -tuberiaNorte.height 
            })

        }

        //COLISIONES
        if(personaje.x + bird.width>= tuberias[i].x &&
            personaje.x <= tuberias[i].x + tuberiaNorte.width &&
            (personaje.y <= tuberias[i].y + tuberiaNorte.height ||
                personaje.y + bird.height >= tuberias[i].y + constante)
                || personaje.y + bird.height >= contexto.height - suelo.height){
            location.reload()       
        } 

        if(tuberias[i].x == personaje.x){
            score++
            punto.play()
        }
    }


    //CONDICIONES
    personaje.y += gravedad    
    ctx.fillStyle = "rgba(0, 0, 0, 1)"
    ctx.font = "25px Arial"
    ctx.fillText("score: "+score, 10, contexto.canvas.height-40)
}

//EVENTOS
window.addEventListener("resize", resize)
window.addEventListener("keydown", presionar)