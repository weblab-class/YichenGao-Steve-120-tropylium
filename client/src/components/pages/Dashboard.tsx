import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "@reach/router";
import Button from "@mui/material/Button";
import { Link } from "@reach/router";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { get } from "../../utilities";
import "./Dashboard.css";
import Card from "../modules/Card";

type DashboardProps = RouteComponentProps & {
  userId: String;
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#3454c5",
      contrastText: "#ffffff",
    },
    action: {
      hover: "#6987db",
      disabledBackground: "rgba(0,0,0,0.20)",
      disabled: "#444444",
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    fontSize: 18,
    button: {
      fontWeight: 700,
    },
  },
});

const Dashboard = (props: DashboardProps) => {
  const [artworks, setArtworks] = useState([]);

  // get artworks
  useEffect(() => {
    if (props.userId) {
      get(`/api/artworks/${props.userId}`).then((artworks) => {
        setArtworks(artworks);
      });
    }
  }, [props.userId]);

  const renderCards = (): JSX.Element => {
    return (
      <>
        {artworks
          .map((artwork, idx) => {
            return (
              <Card
                artworkId={artwork._id}
                cellDeltas={artwork.cellDeltas}
                endDelta={artwork.endDelta}
                numIterations={artwork.numIterations}
                position={idx + 1}
                key={idx}
              />
            );
          })
          .reverse()}
      </>
    );
  };

  const renderLoginWarning = (): JSX.Element => {
    return <div className="Dashboard-loginWarning">You must be logged in to continue!</div>;
  };

  return (
    <div className="Dashboard-background">
      <div className="Dashboard-description">
        MY PROJECTS&emsp;
        <ThemeProvider theme={theme}>
          <Link to="/fractal_creator" className="Dashboard-linkText">
            <Button variant="contained" size="large">
              CREATE NEW PROJECT
            </Button>
          </Link>
        </ThemeProvider>
      </div>
      <div className="Dashboard-cardList">
        {props.userId ? renderCards() : renderLoginWarning()}
      </div>
    </div>
  );
};

export default Dashboard;
