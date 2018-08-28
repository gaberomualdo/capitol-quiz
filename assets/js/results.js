var answers = JSON.parse(localStorage.getItem("capitolquiz_question_answers"));
var resultInfo = [
  "progressive,imperialist",
  "progressive,intervention",
  "intervention,imperialist",
  "progressive,intervention",
  "progressive,intervention",
  "progressive,intervention",
  "progressive",
  "progressive",
  "progressive",
  "progressive,intervention",
  "progressive,intervention",
  "progressive",
  "intervention",
  "intervention",
  "intervention",
  "progressive",
  "freedom",
  "progressive",
  "progressive,intervention",
  "intervention",
  "imperialist",
  "isolationist",
  "imperialist,progressive",
  "imperialist,traditional,intervention",
  "imperialist,intervention",
  "imperialist",
  "isolationist",
  "imperialist,traditional",
  "imperialist",
  "imperialist,intervention",
  "imperialist,traditional",
  "progressive,intervention,isolationist",
  "imperialist,freedom",
  "freedom,traditional,isolationist",
  "progressive",
  "progressive,imperialist",
  "traditional,freedom",
  "freedom,imperialist",
  "intervention,progressive",
  "freedom,traditional"
];

var progressive = 0;
var traditional = 0;

var intervention = 0;
var freedom = 0;

var imperialist = 0;
var isolationist = 0;

function addAmounts(variable,amount,opposite){
  if(opposite){
    if(variable == "progressive"){
      traditional += amount;
    }
    if(variable == "traditional"){
      progressive += amount;
    }

    if(variable == "intervention"){
      freedom += amount;
    }
    if(variable == "freedom"){
      intervention += amount;
    }

    if(variable == "isolationist"){
      imperialist += amount;
    }
    if(variable == "imperialist"){
      isolationist += amount;
    }
  }else{
    if(variable == "progressive"){
      progressive += amount;
    }
    if(variable == "traditional"){
      traditional += amount;
    }

    if(variable == "intervention"){
      intervention += amount;
    }
    if(variable == "freedom"){
      freedom += amount;
    }

    if(variable == "isolationist"){
      isolationist += amount;
    }
    if(variable == "imperialist"){
      imperialist += amount;
    }
  }
}

answers.forEach(function(answer,index){
  if(answer != "neutral"){
    resultInfo[index].split(",").forEach(function(i,ind){
      var amount = 1;
      var opposite = false;
      if(answer == "disagree" || answer == "agree"){
        amount = 0.5;
      }
      if(answer == "disagree" || answer == "strongdisagree"){
        opposite = true;
      }
      addAmounts(i,amount,opposite);
    });
  }
});

function updateHTML(percentleft, percentright, classname){
  percentright = Math.ceil(percentright);
  percentleft = Math.floor(percentleft);
  if(!percentleft || !percentright) {
    percentleft = 50;
    percentright = 50;
  }
  document.querySelector("div.result." + classname + " div.bar div.left").setAttribute("style","width:" + percentleft + "%;");
  document.querySelector("div.result." + classname + " div.bar div.right").setAttribute("style","width:" + percentright + "%;");
  document.querySelector("div.result." + classname + " div.bar .leftlabel").innerHTML = (percentleft + "%");
  document.querySelector("div.result." + classname + " div.bar .rightlabel").innerHTML = (percentright + "%");
}

var progressive_percent = (progressive / (progressive + traditional)) * 100;
var traditional_percent = (traditional / (progressive + traditional)) * 100;

var intervention_percent = (intervention / (intervention + freedom)) * 100;
var freedom_percent = (freedom / (intervention + freedom)) * 100;

var imperialist_percent = (imperialist / (imperialist + isolationist)) * 100;
var isolationist_percent = (isolationist / (imperialist + isolationist)) * 100;

var democratic_percent = (progressive_percent + intervention_percent) / 2;
var republican_percent = (traditional_percent + freedom_percent) / 2;

updateHTML(progressive_percent, traditional_percent, "social");
updateHTML(intervention_percent, freedom_percent, "economic");
updateHTML(imperialist_percent, isolationist_percent, "foreign");
updateHTML(democratic_percent, republican_percent, "party");

(function(){
  var overall_personality = "";

  if(traditional_percent >= progressive_percent){
    overall_personality += "T";
  }else{
    overall_personality += "P";
  }

  if(intervention_percent >= freedom_percent){
    overall_personality += "R";
  }else{
    overall_personality += "F";
  }

  if(imperialist_percent >= isolationist){
    overall_personality += "I";
  }else{
    overall_personality += "S";
  }

  if(democratic_percent >= republican_percent){
    overall_personality += "-D";
    document.querySelector("div.mainResult").classList.add("d");
  }else{
    overall_personality += "-R";
  }

  document.querySelector("div.mainResult").innerHTML = overall_personality;
})();
