import * as  React from 'react';
import { I18n } from 'react-i18next';

import { CountdownProps, CountdownState } from './Countdown.model';
import './Countdown.scss';

export class Countdown extends React.Component<CountdownProps, CountdownState> {

  private timer: NodeJS.Timer | undefined;

  public constructor(props: CountdownProps) {
    super(props);

    this.state = {
      currentTime: this.props.time
    };
  }

  public componentDidUpdate(prevProps: CountdownProps): void {
    if (this.props.time !== prevProps.time) {
      this.setState({
        currentTime: this.props.time
      });

      if (this.timer) {
        clearInterval(this.timer);
      }

      this.timer = setInterval(
        () => {
          if (this.props.time <= 1000 || this.state.currentTime <= 1000) {
            if (this.timer) {
              clearInterval(this.timer);
            }
          }

          this.setState({
            currentTime: this.state.currentTime - 1000
          });
        },
        1000
      );
    }
  }

  public componentWillUnmount(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  public render(): JSX.Element {
    const totalMinutes = Math.floor(this.state.currentTime / 60000);
    const totalSeconds = Math.round(this.state.currentTime / 1000) - totalMinutes * 60;

    return (
      <I18n>
        {
          (t) => (
            <div className='ca-countdown'>
              {totalMinutes}{t('shortMinute')} : {totalSeconds}{t('shortSecond')}
            </div>
          )
        }
      </I18n>
    );
  }
}
