import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonText,
} from '@ionic/react';
import { FC } from 'react';

import { TelemetryMeasurement } from '../telemetry-slice';
import './telemetryCard.css';

export type TelemetryCardProps = {
  telemetryMeasurement: TelemetryMeasurement;
  value: number;
  icon: string;
  unit: string;
};

const TelemetryCard: FC<TelemetryCardProps> = ({
  telemetryMeasurement,
  value,
  icon,
  unit,
}) => {
  return (
    <IonCard
      role="card"
      className={`dashboard__card ${'dashboard-card__' + telemetryMeasurement}`}
    >
      <IonCardHeader>
        <IonCardTitle>{telemetryMeasurement}</IonCardTitle>
      </IonCardHeader>

      <IonCardContent>
        <IonIcon
          className={`dashboard__icon ${'icon__' + telemetryMeasurement}`}
          icon={icon}
        ></IonIcon>
        <IonText role="telemetry-text" className="value__text">
          {parseFloat(value?.toFixed(2))}
          {' ' + unit}
        </IonText>
      </IonCardContent>
    </IonCard>
  );
};

export default TelemetryCard;
