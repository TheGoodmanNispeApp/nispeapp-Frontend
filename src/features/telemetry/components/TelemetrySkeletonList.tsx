import { IonItem, IonRow, IonSkeletonText } from '@ionic/react';
import './telemetrySkeleton.css';

const TelemetrySkeleton = () => {
  return (
    <IonRow className="card-skeleton__container">
      <IonItem lines="none" className="card-skeleton__item">
        <IonSkeletonText className="card__skeleton" animated></IonSkeletonText>
      </IonItem>
      <IonItem lines="none" className="card-skeleton__item">
        <IonSkeletonText animated className="card__skeleton"></IonSkeletonText>
      </IonItem>
      <IonItem lines="none" className="card-skeleton__item">
        <IonSkeletonText animated className="card__skeleton"></IonSkeletonText>
      </IonItem>
    </IonRow>
  );
};

export default TelemetrySkeleton;
