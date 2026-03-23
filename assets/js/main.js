document.addEventListener("DOMContentLoaded", function () {
  const yearNode = document.getElementById("year");
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  document.querySelectorAll(".path-button").forEach(function (button) {
    button.addEventListener("click", function () {
      const target = document.querySelector(button.dataset.target || "");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        if (window.portfolioAnalytics) {
          window.portfolioAnalytics.track("path_navigation");
        }
      }
    });
  });

  document.querySelectorAll(".copy-button").forEach(function (button) {
    button.addEventListener("click", async function () {
      const target = document.getElementById(button.dataset.copyTarget || "");
      if (!target || !target.textContent.trim()) {
        return;
      }

      try {
        await navigator.clipboard.writeText(target.textContent.trim());
        button.textContent = "Copied";
        window.setTimeout(function () {
          button.textContent = "Copy";
        }, 1400);
      } catch (error) {
        button.textContent = "Copy failed";
      }
    });
  });

  const roiForm = document.getElementById("roi-form");
  const roiOutput = document.getElementById("roi-output");
  if (roiForm && roiOutput) {
    const renderRoi = function (event) {
      if (event) {
        event.preventDefault();
      }

      const formData = new FormData(roiForm);
      const teamSize = Number(formData.get("teamSize") || 0);
      const hoursSaved = Number(formData.get("hoursSaved") || 0);
      const hourlyRate = Number(formData.get("hourlyRate") || 0);
      const winLift = Number(formData.get("winLift") || 0);
      const annualHours = teamSize * hoursSaved * 52;
      const laborValue = annualHours * hourlyRate;

      roiOutput.innerHTML = [
        "<strong>" + annualHours.toLocaleString() + " hours</strong> annual capacity returned",
        "<br>",
        "<strong>$" + laborValue.toLocaleString() + "</strong> in annual labor value",
        "<br>",
        "Projected win-rate lift input: <strong>" + winLift.toFixed(1) + "%</strong>"
      ].join("");
    };

    roiForm.addEventListener("submit", renderRoi);
    renderRoi();
  }

  const rfpForm = document.getElementById("rfp-form");
  const rfpOutput = document.getElementById("rfp-output");
  if (rfpForm && rfpOutput) {
    const renderRfp = function (event) {
      if (event) {
        event.preventDefault();
      }

      const formData = new FormData(rfpForm);
      const customer = String(formData.get("customer") || "").trim();
      const challenge = String(formData.get("challenge") || "").trim();
      const differentiator = String(formData.get("differentiator") || "").trim();
      const outcome = String(formData.get("outcome") || "").trim();

      rfpOutput.textContent = [
        "# Executive Summary",
        customer + " needs a response that addresses " + challenge,
        "",
        "# Response Theme",
        "Differentiate through " + differentiator + ".",
        "",
        "# Business Outcome",
        outcome + ".",
        "",
        "# Recommended Sections",
        "1. Current-state friction and buyer risk",
        "2. Solution architecture and workflow design",
        "3. Implementation approach and governance",
        "4. Change management and adoption plan",
        "5. Measurement model and expected business value"
      ].join("\n");
    };

    rfpForm.addEventListener("submit", renderRfp);
    renderRfp();
  }

  const roadmapForm = document.getElementById("roadmap-form");
  const roadmapOutput = document.getElementById("roadmap-output");
  if (roadmapForm && roadmapOutput) {
    const renderRoadmap = function (event) {
      if (event) {
        event.preventDefault();
      }

      const formData = new FormData(roadmapForm);
      const maturity = String(formData.get("maturity") || "established");
      const integrations = Number(formData.get("integrations") || 1);
      const changeLevel = String(formData.get("changeLevel") || "moderate");
      const discoveryWeeks = maturity === "emerging" ? 2 : 1;
      const buildWeeks = Math.max(3, integrations + (maturity === "scaled" ? 2 : 1));
      const adoptionWeeks = changeLevel === "high" ? 4 : changeLevel === "moderate" ? 3 : 2;

      roadmapOutput.textContent = [
        "Phase 1 | Discovery and workflow mapping | " + discoveryWeeks + " week(s)",
        "Phase 2 | Solution design and integration planning | 2 week(s)",
        "Phase 3 | Build, prompt tuning, and automation hardening | " + buildWeeks + " week(s)",
        "Phase 4 | Pilot launch and stakeholder feedback | 2 week(s)",
        "Phase 5 | Adoption enablement and scale-out | " + adoptionWeeks + " week(s)"
      ].join("\n");
    };

    roadmapForm.addEventListener("submit", renderRoadmap);
    renderRoadmap();
  }

  const adrForm = document.getElementById("adr-form");
  const adrOutput = document.getElementById("adr-output");
  if (adrForm && adrOutput) {
    const renderAdr = function (event) {
      if (event) {
        event.preventDefault();
      }

      const formData = new FormData(adrForm);
      const title = String(formData.get("title") || "").trim();
      const driver = String(formData.get("driver") || "").trim();
      const approach = String(formData.get("approach") || "").trim();
      const risk = String(formData.get("risk") || "").trim();

      adrOutput.textContent = [
        "# ADR: " + title,
        "",
        "## Context",
        driver,
        "",
        "## Decision",
        approach,
        "",
        "## Tradeoff",
        risk
      ].join("\n");
    };

    adrForm.addEventListener("submit", renderAdr);
    renderAdr();
  }
});
