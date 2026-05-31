const scenarios = {
  mostlyBrown: {
    label: "Mostly Brown Eyes",
    brown: [80, 82, 84, 85, 87, 88, 89, 90, 91, 93, 94],
    blue: [20, 18, 16, 15, 13, 12, 11, 10, 9, 7, 6],
    explanation:
      "In this scenario, the founder group already has many more brown-eyed individuals than blue-eyed individuals. Over the sample generations, brown eyes become even more common while blue eyes become less common."
  },
  balanced: {
    label: "50/50 Population",
    brown: [50, 52, 54, 56, 57, 58, 59, 60, 61, 62, 63],
    blue: [50, 48, 46, 44, 43, 42, 41, 40, 39, 38, 37],
    explanation:
      "This scenario begins with an even split. Small changes over time show how one trait can become more common by chance in an isolated population."
  },
  mostlyBlue: {
    label: "Mostly Blue Eyes",
    brown: [20, 18, 16, 15, 13, 12, 11, 10, 9, 7, 6],
    blue: [80, 82, 84, 85, 87, 88, 89, 90, 91, 93, 94],
    explanation:
      "Here, the founder group starts with many more blue-eyed individuals. Because the isolated population begins with this uneven sample, blue eyes become more common in later generations."
  }
};

const generationLabels = Array.from({ length: 11 }, (_, index) => index.toString());
const scenarioSelect = document.getElementById("scenario");
const runButton = document.getElementById("runSimulation");
const generationStart = document.getElementById("generationStart");
const generationEnd = document.getElementById("generationEnd");
const scenarioExplanation = document.getElementById("scenarioExplanation");
const chartCanvas = document.getElementById("traitChart");

let traitChart;

function updateSimulation() {
  const selectedScenario = scenarios[scenarioSelect.value];
  const lastIndex = selectedScenario.brown.length - 1;

  generationStart.textContent =
    `Brown Eyes: ${selectedScenario.brown[0]}%, Blue Eyes: ${selectedScenario.blue[0]}%`;
  generationEnd.textContent =
    `Brown Eyes: ${selectedScenario.brown[lastIndex]}%, Blue Eyes: ${selectedScenario.blue[lastIndex]}%`;
  scenarioExplanation.textContent = selectedScenario.explanation;

  if (traitChart) {
    traitChart.destroy();
  }

  traitChart = new Chart(chartCanvas, {
    type: "line",
    data: {
      labels: generationLabels,
      datasets: [
        {
          label: "Brown Eyes",
          data: selectedScenario.brown,
          borderColor: "#7a4f24",
          backgroundColor: "rgba(122, 79, 36, 0.12)",
          tension: 0.25,
          pointRadius: 4
        },
        {
          label: "Blue Eyes",
          data: selectedScenario.blue,
          borderColor: "#173f6f",
          backgroundColor: "rgba(23, 63, 111, 0.12)",
          tension: 0.25,
          pointRadius: 4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: selectedScenario.label
        },
        legend: {
          position: "bottom"
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: "Generation"
          }
        },
        y: {
          min: 0,
          max: 100,
          title: {
            display: true,
            text: "Percentage of Population"
          },
          ticks: {
            callback: (value) => `${value}%`
          }
        }
      }
    }
  });
}

runButton.addEventListener("click", updateSimulation);
