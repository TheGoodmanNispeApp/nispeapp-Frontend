import { IonRow } from '@ionic/react';
import * as icons from 'ionicons/icons';
import { useAppSelector } from '../../../app/hooks';
import { selectLatetTelemetry } from '../telemetry-slice';
import TelemetryCard from './TelemetryCard';

const TelemetryCardList = () => {
  const latestTelemetry = useAppSelector(selectLatetTelemetry);

  return (
    <>
      <IonRow class="ion-padding-vertical ion-justify-content-center">
        <TelemetryCard
          value={latestTelemetry?.measurements.light}
          telemetryMeasurement="light"
          icon={icons.sunny}
          unit=""
        ></TelemetryCard>
        <TelemetryCard
          value={latestTelemetry?.measurements.temperature}
          telemetryMeasurement="temperature"
          icon={icons.thermometer}
          unit="ºC"
        ></TelemetryCard>
        <TelemetryCard
          value={latestTelemetry?.measurements.humidity}
          telemetryMeasurement="humidity"
          icon={icons.water}
          unit="%"
        ></TelemetryCard>
      </IonRow>
    </>
  );
};

export default TelemetryCardList;
