import React, { useState } from "react";
import "./App.css";
import ParamEditor from "./components/ParamEditor";
import { Button, Form } from "react-bootstrap";
import { Model, Param } from "./models/ParamEditorProps";

const initialParams: Param[] = [];

const initialModel: Model = {
  paramValues: [],
  colors: [],
};

function App() {
  const [modal, setModal] = useState("");
  const [par, setPar] = useState("");
  const [paramsState, setParamsState] = useState(initialParams);
  const [modelState, setModelState] = useState(initialModel);

  const handleChange = (paramId: number, value: string) => {
    const updatedModals = modelState.paramValues.map((paramValue) => {
      if (paramValue.paramId === paramId) {
        return { paramId, value };
      }
      return paramValue;
    });

    setModelState({ ...modelState, paramValues: updatedModals });
    console.log(initialParams);
    console.log(initialModel);
  };

  const handleParamsChange = (id: number, name: string) => {
    const updatedParam = paramsState.map((el) => {
      if (el.id === id) {
        return { ...el, name };
      }
      return el;
    });
    setParamsState(updatedParam);
  };

  const addInfo = () => {
    if (par || modal) {
      const newParam = {
        id: paramsState.length + 1,
        name: par,
        type: "string",
      };

      const newModal = {
        paramId: paramsState.length + 1,
        value: modal,
      };

      const updatedParams = [...paramsState, newParam];
      const updatedModals = [...modelState.paramValues, newModal];

      setParamsState(updatedParams);
      setModelState({ ...modelState, paramValues: updatedModals });

      // Reset input values
      setPar("");
      setModal("");
    }
  };

  return (
    <div className="App">
      <ParamEditor
        params={paramsState}
        model={modelState}
        handleChange={handleChange}
        handleParamsChange={handleParamsChange}
      />

      <Form>
        <Form.Control
          className="mt-3"
          value={par}
          onChange={(e) => setPar(e.target.value)}
          placeholder="Введите значение модели"
        />
        <Form.Control
          className="mt-3"
          value={modal}
          onChange={(e) => setModal(e.target.value)}
          placeholder="Введите значение параметра"
        />

        <Button variant="outline-dark" onClick={addInfo}>
          Добавить параметр
        </Button>
      </Form>
    </div>
  );
}

export default App;
