import { IonRow } from '@ionic/react';
import * as icons from 'ionicons/icons';
import { useAppSelector } from '../../../app/hooks';
import { selectLatestTelemetry } from '../telemetry-slice';
import TelemetryCard from './TelemetryCard';

const TelemetryCardList = () => {
  const latestTelemetry = useAppSelector(selectLatestTelemetry);

  return (
    <>
      <IonRow class="ion-padding-vertical ion-justify-content-center">
        <TelemetryCard
          value={latestTelemetry?.measurements.light ?? 0}
          telemetryMeasurement="light"
          icon={icons.sunny}
          unit=""
        ></TelemetryCard>
        <TelemetryCard
          value={latestTelemetry?.measurements.temperature ?? 0}
          telemetryMeasurement="temperature"
          icon={icons.thermometer}
          unit="ºC"
        ></TelemetryCard>
        <TelemetryCard
          value={latestTelemetry?.measurements.humidity ?? 0}
          telemetryMeasurement="humidity"
          icon={icons.water}
          unit="%"
        ></TelemetryCard>
      </IonRow>
    </>
  );
};

export default TelemetryCardList;
