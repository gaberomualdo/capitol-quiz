var questions = [
  'My nation should stand up for human rights.',
  'My government should do more to help the poor.',
  'Free and fair trade is beneficial to my country.',
  'The government should care about all people equally.',
  'Taxes should be raised on the rich to provide for the poor.',
  'We should pay more for healthcare and welfare, even if we go deeper into debt.',
  'Abortion should be legal in almost all cases.',
  'Members of the LGBT community should have the same rights as straight people.',
  'There should be more restrictions on owning a gun in my country.',
  'Immigration is important for the good of my country.',
  'The government should provide some form of affordable healthcare.',
  'The government should be separate from religion.',
  'The government should provide public transportation, not private companies.',
  'Private companies should think about their impact on society, not just their profitability.',
  'The government is more effective than the private sector.',
  'Racism, homophobia, sexism, and intolerance are big problems that still need to be addressed.',
  'The current economic system is fair to most people.',
  'Nonviolent drug use should not be a crime.',
  'We need to do more to protect the environment.',
  'Banks should be regulated to protect consumers.',
  'We should not allow Russia to conduct air strikes in Syria.',
  'We should not oppose the Chinese One Belt One Road initiative.',
  'We should do more to prevent human rights abuses in Africa and the Middle East.',
  'We should trade with all countries, regardless of whether or not they share our values.',
  'We should continue our partnership with western European nations.',
  'We should attack North Korea before they attack us.',
  'We should focus more on our domestic problems, not about the problems in other countries.',
  'We should continue to maintain strategic alliances with countries like Saudi Arabia, regardless of their treatment of women and other social groups.',
  'We should continue to support Israel unconditionally to maintain a foothold in the Middle East.',
  'We should maintain our military bases abroad, regardless of the spending required to do so.',
  'We should keep Guantanamo Bay open and continue to use enhanced interrogation methods on high-risk terrorism suspects.',
  'In general, I support Bernie Sanders and his policies.',
  'In general, I support George W. Bush and his policies.',
  'In general, I support Donald Trump and his policies.',
  'In general, I support Barack Obama and his policies.',
  'In general, I support Hillary Clinton and her policies.',
  'In general, I support Ted Cruz and his policies.',
  'In general, I support Mitt Romney and his policies.',
  'I identify as a socialist or progressive.',
  'I identify as a conservative.'
];

questions.forEach(function(question,question_index){
  document.querySelector("div.questions").innerHTML += '<div class="question"><p>' + question + '</p><h2><span style="color: transparent;">dis</span>agree</h2><div class="buttonContainer"><button ans="strongagree"></button></div><div class="buttonContainer"><button ans="agree"></button></div><div class="buttonContainer"><button ans="neutral"></button></div><div class="buttonContainer"><button ans="disagree"></button></div><div class="buttonContainer"><button ans="strongdisagree"></button></div><h2 class="disagree">disagree</h2></div>';
});

(function(){
  var allQuestionAnswers = document.querySelectorAll("div.questions div.question button");
  for(var questionAnswerIndex = 0;questionAnswerIndex < allQuestionAnswers.length;questionAnswerIndex++){
    allQuestionAnswers[questionAnswerIndex].setAttribute("onclick","answerQuestion(this)");
  }
})();

function answerQuestion(button){
  if(button.parentElement.parentElement.getElementsByClassName("active").length > 0){
    button.parentElement.parentElement.getElementsByClassName("active")[0].removeAttribute("class");
  }
  button.setAttribute("class","active");
}

document.querySelector("button.submitbtn").onclick = function(){
  var questionResults = [];
  var questionsElements = document.querySelector("div.questions").getElementsByClassName("question");
  for(var questionIndex = 0;questionIndex < questionsElements.length;questionIndex++){
    if(questionsElements[questionIndex].getElementsByClassName("active").length > 0){
      questionResults.push(questionsElements[questionIndex].getElementsByClassName("active")[0].getAttribute("ans"));
    }else{
      questionResults.push("neutral");
    }
  }
  localStorage.setItem("capitolquiz_question_answers",JSON.stringify(questionResults));
  window.location = "results.html";
}
