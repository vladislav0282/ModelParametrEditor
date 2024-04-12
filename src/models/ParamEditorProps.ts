export interface Param {
  id: number;
  name: string;
  type: string;
}
export interface ParamValue {
  paramId: number;
  value: string;
}

type Color = string;

export interface Model {
  paramValues: ParamValue[];
  colors: Color[];
}
// interface Props {
// params: Param[];
// model: Model;
// }
// class ParamEditor extends React.Component<Props, State> {
// public getModel(): Model {
// }
// }
