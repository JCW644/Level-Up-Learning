/*var qrgokuSprite = document.createElement("img");
qrgokuSprite.src = "GOKU JPEG.jpg";
document.body.appendChild(qrgokuSprite);*/
let x = Math.floor((Math.random()*7));//gives a random number rounded 1-10

prize = x;

   if (prize == 0){
    console.log("A wild Squirtle Appears!");
}else if (prize == 1){
    console.log('Goku appears ready to fight!');
}else if (prize == 2){
    console.log('Spiderman Swings in!');
}else if (prize == 3){
    console.log('The Aegis herself appears?');
}else if (prize == 4){
    console.log('Uh oh here comes a sussy baka');
}else if (prize == 5){
    console.log('is that green Mario??');
}else if (prize == 6){
    console.log("Bender is here now for some reason. ");
}else if (prize == 7){
    console.log('Hilda challenges you to a battle!');
}
// Make it so once one is chosen you cannot get another one so eliminate numbers as they are picked
//pictures need to be attached with the phrase and we need em to pop up 
