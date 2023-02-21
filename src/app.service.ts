import { Injectable } from '@nestjs/common';
import busFullPath from './data';

type BusOption = {
  name: string;
  number_of_stops: number;
};

@Injectable()
export class AppService {
  handlePost(body: { from: string; to: string }): any[] {
    const { from, to } = body;
    const sanitized = busFullPath.map(({ busName, goFullPath, reFullPath }) => {
      const fw = goFullPath.split(' - ');
      const bw = reFullPath.split(' - ');
      return {
        busName,
        fw,
        bw,
      };
    });

    const results = [];

    let indexToCount = -1;
    let indexToStop = -1;

    for (const bus of sanitized) {
      for (let i = 0; i < bus.fw.length; i++) {
        if (bus.fw.includes(from)) {
          indexToCount = i;
          break;
        }
      }

      if (indexToCount > 0) {
        for (let i = bus.fw.length - 1; i <= 0; i++) {
          if (bus.bw.includes(to)) {
            indexToStop = i;
            console.log('iii', i);
            break;
          }
        }
      }

      if (indexToCount >= 0 && indexToStop >= 0) {
        results.push({
          bus_name: bus.busName,
          number_of_stops: indexToStop - indexToCount + 1,
        });
        continue;
      }
    }

    for (const bus of sanitized) {
    }

    return results;
  }
}
