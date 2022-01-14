import React, { useState } from "react";
import Segments from "../modules/Segments";
import StartPoint from "../modules/StartPoint";
import EndPoint from "../modules/EndPoint";
import Parameters from "../modules/Parameters";
import Result from "../modules/Result";
import { RouteComponentProps } from "@reach/router";

type ArtCreatorProps = RouteComponentProps & {
  //TODO
};

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
        return <Segments nextStep={nextStep} />;
      case 1:
        return <StartPoint nextStep={nextStep} prevStep={prevStep} />;
      case 2:
        return <EndPoint nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Parameters nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <Result prevStep={prevStep} />;
    }
  };

  return <div>{renderFromStepNumber(stepNumber)}</div>;
};

export default ArtCreator;
