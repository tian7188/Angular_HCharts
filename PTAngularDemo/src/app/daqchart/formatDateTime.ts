import * as Highcharts from 'highcharts';
import { DataPoint } from '../../AdxQueryRequestModel';

export function formatDateTime(value: string): string {
    const timestamp = parseFloat(value as string);

    if (!isNaN(timestamp)) {
        const date = Highcharts.dateFormat('%Y-%m-%d', timestamp);
        const time = Highcharts.dateFormat('%H:%M:%S', timestamp);
        return `<div>${date} <br/> ${time}</div>`;
    } else {
        return 'NA';
    }
}
export function formatDepthLabel(value: string | number, seriesData: DataPoint[]): string {
    const data = seriesData;
    const time: number = parseFloat(value as string);

    //find the first data point that x is greater than timeValue
    const index = data.findIndex(d => d.x > time);
    if (index > 0) {
        const depth = data[index].y.toFixed(1);
        return `<div>${depth} m</div>`;
    }

    return `<div>'na'</div>`;
}
