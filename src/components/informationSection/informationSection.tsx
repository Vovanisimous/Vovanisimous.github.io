import { ReactElement } from "react";
import { Map, Placemark } from "@pbe/react-yandex-maps";
import classes from "./informationSection.module.scss";

export const InformationSection = (): ReactElement => {
  const defaultState = {
    center: [56.630273, 47.76152],
    zoom: 16,
    controls: ["zoomControl", "fullscreenControl"],
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.informationContainer}>
        <h3>Будем ждать вас на базе отдыха “Хижина”</h3>
        <div className={classes.informationWrapper}>
          <span className={classes.time}>17:00</span>
          <div className={classes.hyphen} />
          <span className={classes.address}>
            Кооперативная, 10 к1
            <br /> пос. Руэм, Медведевский район
          </span>
        </div>
      </div>
      <div className={classes.mapContainer}>
        <Map
          defaultState={defaultState}
          modules={["control.ZoomControl", "control.FullscreenControl"]}
          width={"100%"}
          height={window.innerWidth >= 1025 ? "500px" : "250px"}
          options={{
            autoFitToViewport: "always",
          }}
          defaultOptions={{
            autoFitToViewport: "always",
          }}
        >
          <Placemark geometry={[56.630273, 47.76152]} />
        </Map>
      </div>
    </div>
  );
};
