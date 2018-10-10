import { withStyles } from '@material-ui/core/styles';
import { ClassNameMap, StyleRules, StyleRulesCallback } from '@material-ui/core/styles/withStyles';

export type Classes<T> = ClassNameMap<T extends string ? T
  : T extends StyleRulesCallback<infer K> ? K :
  T extends StyleRules<infer F> ? F : never>;

interface Props<T> {
  children: (params: { classes: Classes<T> }) => JSX.Element;
}

export function createStyled<T>(styles: T): (props: Props<T>) => JSX.Element {
  function Styled(props: Props<T>): JSX.Element {
    const { children, ...other } = props;
    // tslint:disable-next-line:typedef
    return children(other as { classes: Classes<T> });
  }

  return withStyles(styles)(Styled) as (props: Props<T>) => JSX.Element;
}
