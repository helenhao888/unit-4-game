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
const maxEnemyNum = 3;
//define array, 1:character id, 2:health points, 3:  attack power
// 4: Counter Attack Power 5: base Attack Power
//charInitial for the initial value, never change, charUpdate for updated value
var charInitial = [["imgCap",120,8,8,"Captain",8],
            ["imgDar",100,9,10,"Darth Vader",9],
            ["imgMace",150,7,7,"Mace",7],
            ["imgYoda",180,6,7,"Yoda",6]];
var charUpdate = [["imgCap",120,8,8,"Captain",8],
            ["imgDar",100,3,7,"Darth Vader",3],
            ["imgMace",150,7,7,"Mace",7],
            ["imgYoda",180,6,10,"Yoda",10]]

$(document).ready(function() {
  


$(".imgCharacter").on("click",function(){


    imgId = $(this).attr("id");
    console.log("parent",$(this).parent("div"));
    console.log("parent",$(this).parent());
    
    if ($(this).parent("div").attr("id") === "charBox"){
        selectCharFun();
    } else if ($(this).parent("div").attr("id") === "enemyBox"){
        console.log("enemy");
        selectEmyFun();
    } 
    //if select the character in the defender box, will do nothing.
})

function selectCharFun(){

    console.log("selectfun",imgId, firstSelectFlg);
    if (!firstSelectFlg){
        switch(imgId){
            case "imgCap":           
                console.log("imgcap")  ;    
                $(".imgCharBox2").detach().appendTo("#enemyBox");
                $(".imgCharBox3").detach().appendTo("#enemyBox");
                $(".imgCharBox4").detach().appendTo("#enemyBox");     
                $('#your_modal_id').clone().prop("id", "new_modal_id").appendTo("target_container");         
                break;
             case "imgDar":            
                $(".imgCharBox1").detach().appendTo("#enemyBox");
                $(".imgCharBox3").detach().appendTo("#enemyBox");
                $(".imgCharBox4").detach().appendTo("#enemyBox");                 
                break;
            case "imgMace": 
                $(".imgCharBox1").detach().appendTo("#enemyBox");
                $(".imgCharBox2").detach().appendTo("#enemyBox");
                $(".imgCharBox4").detach().appendTo("#enemyBox");
                break;
            case "imgYoda": 
                $(".imgCharBox1").detach().appendTo("#enemyBox");
                $(".imgCharBox2").detach().appendTo("#enemyBox");
                $(".imgCharBox3").detach().appendTo("#enemyBox");
                break;
        }
        enemyNum += maxEnemyNum;
        console.log("enemy number ",enemyNum);
    }
                            
        $("#enemyBox").children().css({"border-color":"red"});
               
        firstSelectFlg = true;
}

function selectEmyFun(){
    if (selectDefFlag){
        switch(imgId){
            case "imgCap":           
                console.log("imgcap")  ;    
                $(".imgCharBox1").detach().appendTo("#defenderBox");    
                selectDefFlag = false;                   
                break;
            case "imgDar":            
                $(".imgCharBox2").detach().appendTo("#defenderBox");     
                selectDefFlag = false;                                 
                break;
            case "imgMace":         
                $(".imgCharBox3").detach().appendTo("#defenderBox");  
                selectDefFlag = false;        
                break;
            case "imgYoda": 
                $(".imgCharBox4").detach().appendTo("#defenderBox");    
                selectDefFlag = false;                  
                break;
        }
        $("#defenderBox").children().css({"border-color":"black"});
        enemyNum--;
        console.log("enemy number second ",enemyNum);
        defenderNum++;
        $("#attackMsg").find("span").text("");
       $("#attackMsg").find("p").text("");
    }
    
}

$(".attackBtn").on("click",function(){

    attackText="";
    conAttackText="";   

   if ((!gameOverFlg)&&(defenderNum>0)){       
        
        defenderId = $("#defenderBox").find("div").attr("id");
        fighterId = $("#charBox").find("div").attr("id");

        for (i=0;i<charUpdate.length;i++){
            console.log("array",charUpdate[i]);
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

        // defenderHp = parseInt($("#defenderBox").find("div").attr("value"));
        // defenderConAtt = parseInt($("#defenderBox").find("div").attr("conAttack"));
        // defenderName = $("#defenderBox").find(".characterName").text();
        console.log("defender", defenderName);
    
        

        defenderHp = defenderHp - fighterAttP;
        fighterHp = fighterHp- defenderConAtt;
        //fighter's attack power increases each attack
        fighterAttP += fightBaseAp;  

        for (i=0;i<charUpdate.length;i++){
    
            if (charUpdate[i][0] === defenderId){
                charUpdate[i][1] = defenderHp;
            } else if (charUpdate[i][0] === fighterId){
                charUpdate[i][1] = fighterHp;
                charUpdate[i][2] = fighterAttP;
            }
        }
        
        if (fighterHp > 0){
            if (defenderHp <= 0){
                removeDefender();
                console.log("enemy number third",enemyNum);
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
    
        $("#attackMsg").find("span").text(attackText);
        $("#attackMsg").find("p").text(conAttackText);
        
        $("#charBox").find("div").attr("attack",fighterAttP);
        $("#charBox").find("span").text(fighterHp);
        $("#defenderBox").find("span").text(defenderHp);
   } else if ((!gameOverFlg)&&(defenderNum<=0)&&(selectDefFlag)){
       attackText="No Enemy Here";
       $("#attackMsg").find("span").text(attackText);
       $("#attackMsg").find("p").text(conAttackText);
   }
})

function removeDefender(){
    console.log("remove defender");
    $("#defenderBox").find("div").detach().appendTo("#bkBox");
    defenderNum--;
    $("#bkBox").hide();
}

$(".restartBtn").on("click",function(){
    console.log(" add restart logic");
    // recreate the initial characters' layout, detach all imgCharBox1 to 4 from enemyBox and defenderBox
    // append to charBox in the initial order

    $(".charBox").

    // initialize the flag variables
    firstSelectFlg = false;
    gameOverFlg = false;
    selectDefFlag = true;
    enemyNum = 0;
    defenderNum = 0;
})

})

