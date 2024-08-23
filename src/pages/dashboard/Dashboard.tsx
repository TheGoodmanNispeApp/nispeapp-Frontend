import {
  IonContent,
  IonIcon,
  IonPage,
  IonRow,
  IonSkeletonText,
  IonText,
} from '@ionic/react';
import * as icons from 'ionicons/icons';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import TimeRangeInterval from '../../features/shared/time-range-interval/TimeRangeInterval';
import TelemetryCardList from '../../features/telemetry/components/TelemetryCardList';
import TelemetrySkeleton from '../../features/telemetry/components/TelemetrySkeletonList';
import {
  getLatestTelemetryAsync,
  selectLatestTelemetry,
  telemetryState,
} from '../../features/telemetry/telemetry-slice';

const Dashboard: React.FC = () => {
  const telemetryListState = useAppSelector(telemetryState);
  const { status, telemetryMessage } = telemetryListState;

  const dispatch = useAppDispatch();
  const latestTelemetry = useAppSelector(selectLatestTelemetry);

  useEffect(() => {
    dispatch(getLatestTelemetryAsync());
  }, [dispatch]);

  const handleClick = () => {
    dispatch(getLatestTelemetryAsync());
  };

  const generateTelemetryList = () => {
    switch (status) {
      case 'loading':
        return <TelemetrySkeleton count={3}></TelemetrySkeleton>;
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
            {latestTelemetry ? (
              new Date(latestTelemetry!.timestamp * 1000).toLocaleString('es')
            ) : (
              <IonSkeletonText
                className="text__skeleton"
                animated
              ></IonSkeletonText>
            )}
          </IonText>
          <IonIcon
            role="icon"
            className="ion-padding-start"
            onClick={handleClick}
            icon={icons.refreshOutline}
            size="large"
          ></IonIcon>
        </IonRow>
        <TimeRangeInterval></TimeRangeInterval>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
