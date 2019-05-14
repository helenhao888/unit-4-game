var capChar;
var characterArray= ["imgCap","imgDar","imgMace","imgYoda"];
var firstSelectFlg=false;

$(document).ready(function() {

     function initializeFun(){
      
        firstSelectFlg = false;
        $(".imgEnemyBox1").hide();
        $(".imgEnemyBox2").hide();
        $(".imgEnemyBox3").hide();
     }

    initializeFun();


$(".imgCharacter").on("click",function(){


   
    console.log($(this).attr("src"));
    console.log($(this).attr("id"));
   

    if (!firstSelectFlg){
        switch($(this).attr("id")){
            case "imgCap": 
                capChar = $(".imgCharBox2").clone();
                console.log("cap",capChar.children());           
                // $(".imgEnemyBox1").append($(capChar));;
                $(".imgCharBox2").clone().appendTo(".imgEnemyBox1");

                // $("#imgDar").clone().appendTo(".imgEnemyBox1");
                // $("#darName").clone().appendTo(".imgEnemyBox1");
                // $("#darHp").clone().appendTo(".imgEnemyBox1");                 

                // $("#imgMace").clone().appendTo(".imgEnemyBox2");
                // $("#maceName").clone().appendTo(".imgEnemyBox2");
                // $("#maceHp").clone().appendTo(".imgEnemyBox2");                 

                // $("#imgYoda").clone().appendTo(".imgEnemyBox3");
                // $("#yodaName").clone().appendTo(".imgEnemyBox3");
                // $("#yodaHp").clone().appendTo(".imgEnemyBox3"); 
               
                break;
             case "imgDar":            
                $("#imgCap").clone().appendTo(".imgEnemyBox1");
                $("#capName").clone().appendTo(".imgEnemyBox1");
                $("#capHp").clone().appendTo(".imgEnemyBox1");                

                $("#imgMace").clone().appendTo(".imgEnemyBox2");
                $("#maceName").clone().appendTo(".imgEnemyBox2");
                $("#maceHp").clone().appendTo(".imgEnemyBox2");                 

                $("#imgYoda").clone().appendTo(".imgEnemyBox3");
                $("#yodaName").clone().appendTo(".imgEnemyBox3");
                $("#yodaHp").clone().appendTo(".imgEnemyBox3");                      
                break;
            case "imgMace": 
                $("#imgCap").clone().appendTo(".imgEnemyBox1");
                $("#capName").clone().appendTo(".imgEnemyBox1");
                $("#capHp").clone().appendTo(".imgEnemyBox1"); 
                
                $("#imgDar").clone().appendTo(".imgEnemyBox2");
                $("#darName").clone().appendTo(".imgEnemyBox2");
                $("#darHp").clone().appendTo(".imgEnemyBox2"); 

                $("#imgYoda").clone().appendTo(".imgEnemyBox3");
                $("#yodaName").clone().appendTo(".imgEnemyBox3");
                $("#yodaHp").clone().appendTo(".imgEnemyBox3");   
                break;
            case "imgYoda": 
                $("#imgCap").clone().appendTo(".imgEnemyBox1");
                $("#capName").clone().appendTo(".imgEnemyBox1");
                $("#capHp").clone().appendTo(".imgEnemyBox1");    
                
                $("#imgDar").clone().appendTo(".imgEnemyBox2");
                $("#darName").clone().appendTo(".imgEnemyBox2");
                $("#darHp").clone().appendTo(".imgEnemyBox2"); 

                $("#imgMace").clone().appendTo(".imgEnemyBox3");
                $("#maceName").clone().appendTo(".imgEnemyBox3");
                $("#maceHp").clone().appendTo(".imgEnemyBox3");    
                break;
        }
    }
        $("#imgCap").attr("src",$(this).attr("src"));
        // $(".imgCharBox2").hide();
        $(".imgCharBox3").hide();
        $(".imgCharBox4").hide();
        $(".imgEnemyBox1").show();
        $(".imgEnemyBox2").show();
        $(".imgEnemyBox3").show();  
        firstSelectFlg = true;
  
    
})


})