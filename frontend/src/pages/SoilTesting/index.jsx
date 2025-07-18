import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css"
import SoilForm from "./Form/SoilForm";
import SoilBanner from "./banner";
import Detail from "./Detail";
const SoilTesting = () => {

  const summary = [{
    mainheading: "Why Is Soil Testing Important?",

    innerItems: [
      {
        heading: "Enhanced Productivity:",
        paragraph: "Help identify nutrient deficiencies and recommend corrective actions."
      },
      {
        heading: "Cost-Efficiency:",
        paragraph: "Reduces wastage of fertilizers by applying only what is needed."
      },
      {
        heading: "Environmental Benefits:",
        paragraph: "Prevents over-fertilization, reducing groundwater contamination."
      },
      {
        heading: "Long-Term Soil Health:",
        paragraph: "Promotes balanced nutrient management and prevents soil degradation."
      }
    ],
    photo:"img/soiltest4.jpg",

  },
  {
    mainheading: "Benefits of Soil Testing",

    innerItems: [
      {
        heading: "Optimized Crop Production:",
        paragraph: "Soil testing identifies nutrient deficiencies and provides precise recommendations for fertilizers and soil amendments, ensuring plants receive the nutrients they need for optimal growth and higher yields."
      },
      {
        heading: "Improved Soil Fertility:",
        paragraph: "By analyzing the nutrient levels and pH of the soil, testing helps maintain or restore soil fertility, which is essential for sustainable farming practices."
      },
      {
        heading: "Cost Savings:",
        paragraph: "With accurate soil data, farmers can avoid overuse or underuse of fertilizers, reducing unnecessary expenses and maximizing resource efficiency."
      },
      {
        heading: "Enhanced Environmental Protection: ",
        paragraph: "Soil testing minimizes the risk of nutrient runoff into water bodies by providing targeted fertilization recommendations, reducing pollution and protecting ecosystems."
      },
      {
        heading: "Better pH Management:",
        paragraph: "Testing determines whether the soil is acidic or alkaline, allowing corrective measures like adding lime or sulfur to improve nutrient availability and plant health.",
      },
      {
        heading: "Detection of Contamination:",
        paragraph: "Soil testing identifies pollutants like heavy metals, pesticides, or industrial waste, ensuring the safety of crops and compliance with environmental regulations.",
      },
      {
        heading: "Prevention of Crop Failures: ",
        paragraph: " Soil testing helps detect potential issues, such as salinity or nutrient imbalances, early on, reducing the risk of crop failures and economic losses.",
      }
     
    ],
    photo:"img/soiltest2.jpg",

  },

  ]
  return (
    <div>
      <SoilBanner/>
      <Detail arraycontent={summary} />
      <SoilForm />
    </div>
  );
};

export default SoilTesting;

