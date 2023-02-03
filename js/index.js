// находим элемент в документ по ID
const cvs = document.getElementById('canvas');
// создаем игру в 2D
const ctx = cvs.getContext('2d');
// создаем все объекты, которые присутствуют в игре!
const gaston = new Image(); //  объект персонаж
const pipeUp  = new Image(); // объект препятствие: паук
const pipeBottom = new Image();// объект препятствие: цветок
const bg = new Image();// объект задний фон
const fg = new Image();// объект передний фон

// указываем путь к изображению(объекту)
gaston.src = './assets/img/gastonn.png';
pipeUp.src = './assets/img/pipeUp.png';
pipeBottom.src = './assets/img/pipeBottom.png';
bg.src = 'assets/img/bgg.png';
fg.src = './assets/img/fg.png';


//audio
let fly = new Audio();
let scoreA = new Audio();

scoreA.src = './assets/audio/zvuk.mp3'
  fly.src = './assets/audio/gaston.mp3'
// задаем расстояние между двумя элементами(pipeUp b pipeBottom)
let gap = 200;

// меняем положение объекта с помощью нажатия клавиши
//отслеживаем нажатие клавиши и выполнение функции moveUp
document.addEventListener('keydown',  moveUp);
 function moveUp() {
     yPos -= 50;
    fly.play();
 }


 //создание блоков
 let pipe = [];
 pipe[0] = {
     x : cvs.width,
     y : 0
 }

let score = 0;

// позиция gaston
let xPos = 50;
let yPos = 150;
let gravit = 1.7;


// рисуем все объекты в canvas
//создаем функцию. К объекту canvas применяем метод drowImage, что бы нарисовать 
//нужный нам объект. Рисуем задний фон,(указываем имя переменной объекта)
// и его координаты на холсте.
 function draw() {
     ctx.drawImage(bg, 0, 0); // позиция объекта

     for(let i = 0; i < pipe.length; i++) {
         ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y); // позиция  объекта ctx.drawImage(pipeUp, 450, 0);
         ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap )// добавляем к объекту высоту PipeUp + высоту между двумя объеками.
                                                                                // ctx.drawImage(pipeBottom, 450, 0 + pipeUp.height + gap )
         
         pipe[i].x--; 
         
         if(pipe[i].x == 20){
             pipe.push({  //добавляем новый элемнт в массив (это еще объект, поэтому фигурные скобки)
              x : cvs.width, // что бы объект появлялся за облостью видимостью(экраном)
             y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height    // случайное число, что бы рандомно менялось расстояние (позиция по y )
             });
            
         }
          // отслеживаем косания gaston по отношению к объектам
         if(xPos + gaston.width >= pipe[i].x 
            && xPos <= pipe[i].x + pipeUp.width
            && (yPos <= pipe[i].y  + pipeUp.height
                || yPos + gaston.height >= pipe[i].y + pipeUp.height + gap) ) {
                    location.reload() // перезагрузка игры
                }
                 if(pipe[i].x == 5) {
            score++;
            scoreA.play();
        }
     }
     // условие, при котором начисляются очки
       

     
     ctx.drawImage(fg, 0, cvs.height -fg.height); // позиция объекта
     ctx.drawImage(gaston, xPos , yPos);
        // по оси Y меняем позицию gaston на -1
     yPos += gravit;
     requestAnimationFrame(draw); //функция отображающая объект по оси y со сдвигом на -1 единицу

     ctx.fillStyle = "#000";
     ctx.font = "48px Verdana";
     ctx.fillText ("Score: " + score, 20, cvs.height -40);

     
 }

 // вызываем нашу функцию Drow, толко после того, как загрузятся все картинки.
 //(последняя картинка в списке pipeBottom)
 pipeBottom.onload  = draw;

