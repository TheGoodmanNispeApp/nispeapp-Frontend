import { IonItem, IonRow, IonSkeletonText } from '@ionic/react';
import { FC } from 'react';
import './telemetrySkeleton.css';

export interface TelemetrySkeletonProps {
  count: number;
}

const TelemetrySkeleton: FC<TelemetrySkeletonProps> = ({
  count,
}: TelemetrySkeletonProps) => {
  return (
    <IonRow className="card-skeleton__container">
      {[...Array(count)].map(() => (
        <IonItem lines="none" className="card-skeleton__item">
          <IonSkeletonText
            className="card__skeleton"
            animated
          ></IonSkeletonText>
        </IonItem>
      ))}
    </IonRow>
  );
};

export default TelemetrySkeleton;
