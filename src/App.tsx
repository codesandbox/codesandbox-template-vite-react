import { useState } from "react";
import {
  Checkbox,
  FormGroup,
  RadioButton,
  RadioButtonGroup,
  Switch,
} from "@carbon/react";
import OmrsContentSwitcher from "./omrs-content-switcher";

type SwitcherSize = "sm" | "md" | "lg";

function App() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isErrored, setIsErrored] = useState(false);
  const [switcherSize, setSwitcherSize] = useState<SwitcherSize>("sm");

  const toggleDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  const toggleErrored = () => {
    setIsErrored(!isErrored);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: "3", padding: "1rem", margin: "auto 0" }}>
        <OmrsContentSwitcher errored={isErrored} size={switcherSize}>
          <Switch name={"first"} text="First" disabled={isDisabled} />
          <Switch name={"second"} text="Second" disabled={isDisabled} />
          <Switch name={"third"} text="Third" disabled={isDisabled} />
        </OmrsContentSwitcher>
      </div>
      <form
        style={{
          flex: "1",
          borderLeft: "1px solid lightgray",
        }}
      >
        <div
          style={{
            alignItems: "center",
            backgroundColor: "#e0e0e0",
            display: "flex",
            fontSize: "12px",
            height: "2rem",
            paddingLeft: "1rem",
            width: "100%",
          }}
        >
          Switch
        </div>
        <div
          style={{
            paddingBottom: "1.5rem",
            paddingTop: "1rem",
          }}
        >
          <fieldset
            className="cds--fieldset"
            style={{ marginBottom: "0", padding: "0 1rem 1rem" }}
          >
            <legend className="cds--label">modifiers</legend>
            <Checkbox
              checked={isDisabled}
              onChange={toggleDisabled}
              labelText="disabled"
              id="disabled"
            />
            <Checkbox
              checked={isErrored}
              onChange={toggleErrored}
              labelText="errored"
              id="errored"
            />
          </fieldset>
        </div>
        <div
          style={{
            alignItems: "center",
            backgroundColor: "#e0e0e0",
            display: "flex",
            fontSize: "12px",
            height: "2rem",
            paddingLeft: "1rem",
            width: "100%",
          }}
        >
          ContentSwitcher
        </div>
        <div
          style={{
            paddingBottom: "1.5rem",
            paddingTop: "1rem",
          }}
        >
          <FormGroup style={{ marginBottom: "0", padding: "0 1rem 1rem" }}>
            <RadioButtonGroup
              defaultSelected={switcherSize}
              legendText="size"
              name="size"
              onChange={(size: SwitcherSize) => setSwitcherSize(size)}
              orientation="vertical"
              valueSelected={switcherSize}
            >
              <RadioButton id="sm" labelText="sm" value="sm" />
              <RadioButton id="md" labelText="md" value="md" />
              <RadioButton id="lg" labelText="lg" value="lg" />
            </RadioButtonGroup>
          </FormGroup>
        </div>
      </form>
    </div>
  );
}

export default App;
