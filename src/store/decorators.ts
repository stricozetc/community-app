import { connect as _connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppState } from './store.config';

// tslint:disable-next-line:typedef
export function mapStateToProps<T>(
  mapStateToPropsFunc: (state: AppState) => T
) {
  return _connect(mapStateToPropsFunc);
}

// tslint:disable-next-line:typedef
export function mapDispatchToProps<T>(
  mapDispatchToPropsFunc: (dispatch: Dispatch) => T
) {
  const mapStateToPropsFunc = () => ({});

  return _connect(mapStateToPropsFunc, mapDispatchToPropsFunc);
}

export function Action(): ClassDecorator {
  return (target: any) => {
    const original = target;
    function construct(constructor: any, args: any): any {
      const c: any = function (): any {
        return constructor.apply(this, args);
      }
      c.prototype = constructor.prototype;
      const returnC = Object.assign({}, new c());

      return returnC;
    }
    const f: any = (...args: any[]) => {
      return construct(original, args);
    }
    f.prototype = original.prototype;

    return f
  }
}