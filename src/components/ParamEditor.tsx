import React from "react";
import { Model, Param, ParamValue } from "../models/ParamEditorProps";

interface ParamEditorProps {
  params: Param[];
  model: Model;
  handleChange: (paramId: number, value: string) => void;
  handleParamsChange: (id: number, name: string) => void;
}

interface ParamEditorState {
  paramValues: ParamValue[];
  params: Param[];
}

class ParamEditor extends React.Component<ParamEditorProps, ParamEditorState> {
  constructor(props: ParamEditorProps) {
    super(props);
    this.state = {
      paramValues: props.model.paramValues,
      params: props.params,
    };
  }

  handleChange = (paramId: number, value: string) => {
    const { paramValues } = this.state;
    const index = paramValues.findIndex(
      (paramValue) => paramValue.paramId === paramId
    );
    if (index !== -1) {
      const updatedParamValues = [...paramValues];
      updatedParamValues[index] = { paramId, value };
      this.setState({ paramValues: updatedParamValues });
      this.props.handleChange(paramId, value); // Call the handleChange prop function
    }
  };

  handleParamsChange = (id: number, name: string, type: string) => {
    const { params } = this.state;
    const index = params.findIndex((param) => param.id === id);
    if (index !== -1) {
      const updatedParam = [...params];
      updatedParam[index] = { id, name, type };
      this.setState({ params: updatedParam });
      this.props.handleParamsChange(id, name); // Call the handleChange prop function
    }
  };

  getModel = (): Model => {
    const { paramValues } = this.state;
    return {
      paramValues,
      colors: [],
    };
  };

  render() {
    const { params, model } = this.props;

    return (
      <div>
        {params.length === 0 && model.paramValues.length === 0 ? (
          <div>
            <span style={{ fontWeight: "bold" }}>
              Введите значения модели и параметр
            </span>
          </div>
        ) : (
          <div>
            {params.map((param) => (
              <div key={param.id}>
                <input
                  style={{ border: "none", outline: "none" }}
                  type="text"
                  defaultValue={
                    params.find((el) => el.id === param.id)?.name || ""
                  }
                  onChange={(e) =>
                    this.handleParamsChange(param.id, e.target.value, "type")
                  }
                />

                <input
                  type="text"
                  defaultValue={
                    model.paramValues.find(
                      (paramValue) => paramValue.paramId === param.id
                    )?.value || ""
                  }
                  onChange={(e) => this.handleChange(param.id, e.target.value)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
export default ParamEditor;
