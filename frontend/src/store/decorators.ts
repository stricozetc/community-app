/* tslint:disable */
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

export function action(): ClassDecorator {
  // tslint:disable-next-line:only-arrow-functions
  return function (target: Function): any {
    const original = target;
    function construct(constructor: Function, args: any): Function {
      const c: any = function (): Function {
        return constructor.apply(this, args);
      };
      c.prototype = constructor.prototype;
      const returnC = Object.assign({}, new c());

      return returnC;
    }
    const f: Function = (...args: any[]) => {
      return construct(original, args);
    };
    f.prototype = original.prototype;

    return f;
  };
}
