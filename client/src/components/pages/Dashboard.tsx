import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "@reach/router";

import { get } from "../../utilities";
import "./Dashboard.css";
import Card from "../modules/Card";

type DashboardProps = RouteComponentProps & {
  userId: String;
};

const Dashboard = (props: DashboardProps) => {
  const [artworks, setArtworks] = useState([]);

  // get artworks
  useEffect(() => {
    if (props.userId) {
      console.log(props.userId);
      get(`/api/artworks/${props.userId}`).then((artworks) => {
        setArtworks(artworks);
        console.log(artworks);
      });
    }
  }, [props.userId]);

  const renderCards = (): JSX.Element => {
    return (
      <>
        {artworks.map((artwork, idx) => {
          return (
            <Card cellDeltas={artwork.cellDeltas} endDelta={artwork.endDelta} position={idx + 1} />
          );
        })}
      </>
    );
  };

  const renderLoginWarning = (): JSX.Element => {
    return <div className="Dashboard-loginWarning">You must be logged in to continue!</div>;
  };

  return (
    <div className="Dashboard-background">
      {props.userId ? renderCards() : renderLoginWarning()}
    </div>
  );
};

export default Dashboard;
