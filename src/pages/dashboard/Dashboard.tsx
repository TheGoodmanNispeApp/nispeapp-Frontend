import { IonContent, IonIcon, IonPage, IonRow, IonText } from '@ionic/react';
import * as icons from 'ionicons/icons';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import TelemetryCardList from '../../features/telemetry/components/TelemetryCardList';
import TelemetrySkeleton from '../../features/telemetry/components/TelemetrySkeletonList';
import {
  getTelemetryAsync,
  selectLatetTelemetry,
  telemetryState,
} from '../../features/telemetry/telemetry-slice';

const Dashboard: React.FC = () => {
  const telemetryListState = useAppSelector(telemetryState);
  const { status, telemetryMessage } = telemetryListState;

  const dispatch = useAppDispatch();
  const latestTelemetry = useAppSelector(selectLatetTelemetry);

  useEffect(() => {
    dispatch(getTelemetryAsync());
  }, [dispatch]);

  const handleClick = () => {
    dispatch(getTelemetryAsync());
  };

  const generateTelemetryList = () => {
    switch (status) {
      case 'loading':
        return <TelemetrySkeleton></TelemetrySkeleton>;
      case 'failed':
        return <p role="error-message">{telemetryMessage}</p>;
      default:
        return <TelemetryCardList></TelemetryCardList>;
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        {generateTelemetryList()}
        <IonRow class="ion-justify-content-center ion-align-items-center ion-padding-bottom">
          <IonText>
            Last Update:{' '}
            {new Date(latestTelemetry?.timestamp * 1000).toLocaleString('es')}
          </IonText>
          <IonIcon
            role="icon"
            className="ion-padding-start"
            onClick={handleClick}
            icon={icons.refreshOutline}
            size="large"
          ></IonIcon>
        </IonRow>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
