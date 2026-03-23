function calculateAutomationValue(teamSize, hoursSavedPerWeek, hourlyRate) {
  const annualHours = teamSize * hoursSavedPerWeek * 52;
  return {
    annualHours,
    annualLaborValue: annualHours * hourlyRate
  };
}

function buildRoiNarrative(teamSize, hoursSavedPerWeek, hourlyRate) {
  const result = calculateAutomationValue(teamSize, hoursSavedPerWeek, hourlyRate);
  return [
    "Team size: " + teamSize,
    "Hours saved per week: " + hoursSavedPerWeek,
    "Annual hours returned: " + result.annualHours,
    "Annual labor value: $" + result.annualLaborValue.toFixed(2)
  ].join("\n");
}

if (typeof module !== "undefined") {
  module.exports = {
    calculateAutomationValue,
    buildRoiNarrative
  };
}
