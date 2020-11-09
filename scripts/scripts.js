function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

let allQuestions = []

const submit = document.querySelector('#send_button')
submit.addEventListener('click', async () => {

   let userInput = document.querySelector('#input_field').value
  
   let answer = await processAnswer(userInput)

   console.log(answer)

   let msgbox = document.querySelector("#Message_list")

   msgbox.innerHTML += `
     <div class="q_a_container">
        <ul class="question">${userInput}</ul>
        <ul class="answer">${answer}</ul>
     </div>`

  })

  async function processAnswer(question) {

    let answer = await fetch('../scripts/data.json')
    .then(res => res.json())
    .then(data => {

      let allWords = question.split(" ")

      console.log(allWords)

      let allQuestions = data.filter(d => {
        console.log(d.question.indexOf(question))
        return d.question.indexOf(question) > -1
      })

      const answer = allQuestions[0] != null ? allQuestions[0].answer.map(a => `<il>${a}<il>`).join("") :
      "<il>No Answer</il>"

      return `${answer}`

    })

    return answer
  }