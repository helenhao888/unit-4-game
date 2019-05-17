var imgId = "";
var selectDefFlag=true;
var firstSelectFlg=false;
var fighterHp = 0; 
var defenderHp = 0;
var fighterAttP = 0;
var defenderConAtt =0;
var attackText="";
var conAttackText="";
var fighterName = "";
var defenderName = "";
var defenderId,fighterId = "";
var gameOverFlg = false;
var enemyNum = 0;
var defenderNum = 0;
var fightBaseAp = 0;
const maxEnemyNum = 3;

//define array, 1:character id, 2:health points, 3:  attack power
// 4: Counter Attack Power 5: base Attack Power
//charInitial for the initial value, never change, charUpdate for updated value
var charInitial = [["imgCap",120,5,8,"Captain",5],
            ["imgDar",100,3,7,"Darth Vader",3],
            ["imgMace",150,4,7,"Mace",4],
            ["imgYoda",180,1,6,"Yoda",1]];
var charUpdate = [["imgCap",120,5,8,"Captain",5],
            ["imgDar",100,3,7,"Darth Vader",3],
            ["imgMace",150,4,7,"Mace",4],
            ["imgYoda",180,1,6,"Yoda",1]];

$(document).ready(function() {
  

//the main logic, process all the click on characters under my character, enemies and defender
$(".imgCharacter").on("click",function(){


    imgId = $(this).attr("value");
    
    //check the character's parent div to decide to do select my character or defender function
    if ($(this).parent("div").attr("id") === "charBox"){
        selectCharFun();
    } else if ($(this).parent("div").attr("id") === "enemyBox"){        
        selectDefFun();
    } 
    //if select the character in the defender or my character box, will do nothing.
})

function selectCharFun(){
   
    if (!firstSelectFlg){
        switch(imgId){
            case "imgCap":                        
                $(".imgCharBox1").clone(true,true).appendTo("#myCharBox");
                $(".imgCharBox2").clone(true,true).appendTo("#enemyBox");
                $(".imgCharBox3").clone(true,true).appendTo("#enemyBox");
                $(".imgCharBox4").clone(true,true).appendTo("#enemyBox");     
                // clone( [withDataAndEvents] [, deepWithDataAndEvents] ), use true to add event 
                break;
             case "imgDar":      
                $(".imgCharBox2").clone(true,true).appendTo("#myCharBox");      
                $(".imgCharBox1").clone(true,true).appendTo("#enemyBox");
                $(".imgCharBox3").clone(true,true).appendTo("#enemyBox");
                $(".imgCharBox4").clone(true,true).appendTo("#enemyBox");                 
                break;
            case "imgMace": 
                $(".imgCharBox3").clone(true,true).appendTo("#myCharBox");
                $(".imgCharBox1").clone(true,true).appendTo("#enemyBox");
                $(".imgCharBox2").clone(true,true).appendTo("#enemyBox");
                $(".imgCharBox4").clone(true,true).appendTo("#enemyBox");
                break;
            case "imgYoda": 
                $(".imgCharBox4").clone(true,true).appendTo("#myCharBox");
                $(".imgCharBox1").clone(true,true).appendTo("#enemyBox");
                $(".imgCharBox2").clone(true,true).appendTo("#enemyBox");
                $(".imgCharBox3").clone(true,true).appendTo("#enemyBox");
                break;
        }
        enemyNum += maxEnemyNum;      
        $("#charBox").hide();
    }
                            
        $("#enemyBox").children().css({"border-color":"red"});
               
        firstSelectFlg = true;
}

function selectDefFun(){
    if (selectDefFlag){
        switch(imgId){
            case "imgCap":  
                $("#enemyBox").find(".imgCharBox1").detach().appendTo("#defenderBox");    
                selectDefFlag = false;                   
                break;
            case "imgDar":            
                $("#enemyBox").find(".imgCharBox2").detach().appendTo("#defenderBox");     
                selectDefFlag = false;                                 
                break;
            case "imgMace":         
                $("#enemyBox").find(".imgCharBox3").detach().appendTo("#defenderBox");  
                selectDefFlag = false;        
                break;
            case "imgYoda": 
                $("#enemyBox").find(".imgCharBox4").detach().appendTo("#defenderBox");    
                selectDefFlag = false;                  
                break;
        }
        $("#defenderBox").children().css({"border-color":"black"});
        enemyNum--;       
        defenderNum++;
        $("#attackMsg").find("span").text("");
       $("#attackMsg").find("p").text("");
    }
    
}

//attack button onclick process
$(".attackBtn").on("click",function(){

    attackText="";
    conAttackText="";   
    fightBaseAp =0;
    fighterAttP = 0;
    defenderConAtt = 0;
    
//if not game over and there is  defender, do attack process
   if ((!gameOverFlg)&&(defenderNum>0)){       
        
        defenderId = $("#defenderBox").find("div").attr("value");
        fighterId = $("#myCharBox").find("div").attr("value");

        for (i=0;i<charUpdate.length;i++){
         
            if (charUpdate[i][0] === defenderId){
                defenderHp = charUpdate[i][1];
                defenderConAtt = charUpdate[i][3];
                defenderName = charUpdate[i][4];
               
            } else if (charUpdate[i][0] === fighterId){
                fighterHp = charUpdate[i][1];
                fighterAttP = charUpdate[i][2];
                fighterName = charUpdate[i][4];
                fightBaseAp =  charUpdate[i][5];               
            } 
        }
     
        defenderHp = defenderHp - fighterAttP;
        fighterHp = fighterHp- defenderConAtt;
      
        if (fighterHp > 0){
            if (defenderHp <= 0){
                removeDefender();
               
                if (enemyNum > 0){
                    attackText = "You have defeated "+  defenderName + ". You can choose to fight another enemy";
                    selectDefFlag = true;
                } else {
                    attackText = "You Win!!! Game Over !!!";
                    gameOverFlg = true;
                    $(".restartBtn").show();
                }
            }else{
            attackText = "You attacked " + defenderName  + " for " + fighterAttP + " damage";         
            conAttackText = defenderName  + " attacked you back for " + defenderConAtt + " damage";
            }
        }else {
            attackText = "You have been defeated.... Game Over!!!"
            $(".restartBtn").show();
            gameOverFlg = true;
        }
    
        //fighter's attack power increases each attack
        fighterAttP += fightBaseAp;  
        //update charUpdate array to store the current health point, attackPower
        for (i=0;i<charUpdate.length;i++){
    
            if (charUpdate[i][0] === defenderId){
                charUpdate[i][1] = defenderHp;
            } else if (charUpdate[i][0] === fighterId){
                charUpdate[i][1] = fighterHp;
                charUpdate[i][2] = fighterAttP;
            }
        }
        
        //Display attack and counter attack information, or defeated or win message
        $("#attackMsg").find("span").text(attackText);
        $("#attackMsg").find("p").text(conAttackText);        
        //update health points
        $("#myCharBox").find("span").text(fighterHp);
        $("#defenderBox").find("span").text(defenderHp);        
   } else 
   // no defender and game not over and still have enemies to chose as defender, display message 
       if ((!gameOverFlg)&&(defenderNum<=0)&&(selectDefFlag)){
            attackText="No Enemy Here";
            $("#attackMsg").find("span").text(attackText);
            $("#attackMsg").find("p").text(conAttackText);
   }
   //if gameOverFlg is true, do nothing.
})

//remove character under defenderBox
function removeDefender(){
    
    $("#defenderBox").find("div").remove();
    defenderNum--;    
}

//restart button onclick process.
$(".restartBtn").on("click",function(){
   
    // remove all characters from imgCharBox1 to 4 under myCharBox, enemyBox and defenderBox
    $("#myCharBox").find("div").remove();
    // for (i=0;i<enemyNum;i++){

    // }
    if (enemyNum > 0 ){
        $("#enemyBox").find("div").remove();
    }
    if (defenderNum > 0 ){
        $("#defenderBox").find("div").remove();
    }
    // show the original characters in charBox
    $("#charBox").show();
    $(".restartBtn").hide();
    //clear the previous fighting message
    $("#attackMsg").find("span").text("");
    $("#attackMsg").find("p").text("");
    // initialize the flag variables
    firstSelectFlg = false;
    gameOverFlg = false;
    selectDefFlag = true;
    enemyNum = 0;
    defenderNum = 0;
    fightBaseAp = 0;
    fighterAttP = 0;
    defenderConAtt = 0;
    defenderHp = 0;
    fighterHp = 0;
    //reassign the value in array charUpdate from array charInitial
    for (i=0;i<charInitial.length;i++){
        charUpdate[i] = charInitial[i].slice();
    }
    
})

})

