import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Segments from "../modules/Segments";
import StartPoint from "../modules/StartPoint";
import EndPoint from "../modules/EndPoint";
import Parameters from "../modules/Parameters";
import Result from "../modules/Result";
import { RouteComponentProps } from "@reach/router";

type ArtCreatorProps = RouteComponentProps & {
  //TODO
};

const steps = [
  "Choose pattern",
  "Choose starting point",
  "Choose ending point",
  "Set parameters",
  "Result",
];

const ArtCreator = (props: ArtCreatorProps) => {
  const [stepNumber, setStepNumber] = useState(0);

  const nextStep = () => {
    setStepNumber(stepNumber + 1);
  };

  const prevStep = () => {
    setStepNumber(stepNumber - 1);
  };

  const renderFromStepNumber = (stepNumber: number) => {
    switch (stepNumber) {
      case 0:
        return <Segments />;
      case 1:
        return <StartPoint />;
      case 2:
        return <EndPoint />;
      case 3:
        return <Parameters />;
      case 4:
        return <Result />;
    }
  };

  return (
    <div>
      <Stepper activeStep={stepNumber}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {renderFromStepNumber(stepNumber)}
      <Button disabled={stepNumber === 0} onClick={prevStep}>
        Back
      </Button>
      <Button onClick={nextStep}>Next</Button>
    </div>
  );
};

export default ArtCreator;
