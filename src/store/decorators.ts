import { connect as _connect, DispatchProp, InferableComponentEnhancerWithProps } from 'react-redux';
import { AnyAction, Dispatch } from 'redux';
import { AppState } from './store.config';

export function mapStateToProps<T>(
  mapStateToPropsFunc: (state: AppState) => T
): InferableComponentEnhancerWithProps<T & DispatchProp<AnyAction>, {}> {
  return _connect(mapStateToPropsFunc);
}

export function mapDispatchToProps<T>(
  mapDispatchToPropsFunc: (dispatch: Dispatch) => T
): InferableComponentEnhancerWithProps<T, {}> {
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