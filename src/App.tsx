import { useState } from "react";
import {
  Checkbox,
  FormGroup,
  RadioButton,
  RadioButtonGroup,
  Switch,
} from "@carbon/react";
import OmrsContentSwitcher from "./omrs-content-switcher";
import "./app.scss";

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
    <div className="container">
      <div className="switcherWrapper">
        <OmrsContentSwitcher errored={isErrored} size={switcherSize}>
          <Switch
            name={"firstSection"}
            text="First section"
            disabled={isDisabled}
          />
          <Switch
            name={"secondSection"}
            text="Second section"
            disabled={isDisabled}
          />
          <Switch
            name={"thirdSection"}
            text="Third section"
            disabled={isDisabled}
          />
        </OmrsContentSwitcher>
      </div>
      <form className="optionsWrapper">
        <div className="section">Switch</div>
        <div className="sectionContent">
          <FormGroup className="cds--fieldset">
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
          </FormGroup>
        </div>
        <div className="section">ContentSwitcher</div>
        <div className="sectionContent">
          <FormGroup className="cds--fieldset">
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
