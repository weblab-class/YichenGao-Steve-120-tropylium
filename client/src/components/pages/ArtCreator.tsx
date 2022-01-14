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
  const [stepNumber, setStepNumber] = useState(1);

  const nextStep = () => {
    setStepNumber(stepNumber + 1);
  };

  const renderFromStepNumber = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return <Segments nextStep={nextStep} />;
      case 2:
        return <StartPoint nextStep={nextStep} />;
      case 3:
        return <EndPoint nextStep={nextStep} />;
      case 4:
        return <Parameters nextStep={nextStep} />;
      case 5:
        return <Result />;
    }
  };

  return <div>{renderFromStepNumber(stepNumber)}</div>;
};

export default ArtCreator;
