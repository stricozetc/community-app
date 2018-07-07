import { injectable } from 'inversify';

@injectable()
export class TimerService {
    public start(
        onInterval: (distance: number) => void,
        onComplete: () => void,
        ms: number,
        interval: number = 1000
    ): number {
        let countDownDate = new Date((new Date()).getTime() + ms).getTime();

        onInterval(ms);

        let newInterval = setInterval(() => {
            // Get todays date and time
            let now = new Date().getTime();

            // Find the distance between now an the count down date
            let distance = countDownDate - now;

            onInterval(distance);

            if (distance < 0) {
                clearInterval(newInterval);
                onComplete();
            }
        }, interval);

        return newInterval;
    }

    public end(timer: NodeJS.Timer): void {
        clearInterval(timer);
    }
}
