import { IonSelect, IonSelectOption } from '@ionic/react';
import { TelemetryTs } from '../../../models/telemetry';

export interface TimeRangeIntervalProps {
  emitInterval(ts: TelemetryTs): TelemetryTs;
}
function TimeRangeInterval({ emitInterval }: TimeRangeIntervalProps) {
  const handleChange = () => {
    emitInterval();
  };
  return (
    <IonSelect
      interface="popover"
      onChange={handleChange}
      placeholder="Select interval"
    >
      <IonSelectOption>EOOO</IonSelectOption>
      <IonSelectOption>OOOE</IonSelectOption>
    </IonSelect>
  );
}

export default TimeRangeInterval;
