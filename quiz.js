const answers = {
  q1: "b",
  q2: "a",
  q3: "c",
  q4: "a",
  q5: "a"
};

const quizForm = document.getElementById("quizForm");
const quizResult = document.getElementById("quizResult");

quizForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let score = 0;

  Object.entries(answers).forEach(([question, correctAnswer]) => {
    const selected = quizForm.elements[question].value;

    if (selected === correctAnswer) {
      score += 1;
    }
  });

  quizResult.textContent = `You scored ${score} out of 5.`;
});
