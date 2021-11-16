import React, { useState } from "react";
import { useFeatures } from "./Feature";

export const FeatureAdminPanel = () => {
    const [expanded, setExpanded] = useState(false);

    return expanded
        ? <ExpandedAdminPanel onClose={() => setExpanded(false)} />
        : (<div onClick={() => setExpanded(true)}>Feature Settings</div>);
}

const ExpandedAdminPanel = ({ onClose }) => {
    const { featureSettings, overrides, updateOverrides } = useFeatures();

    const items = Object.keys(featureSettings).map((key, index) => {
        const { enabled } = featureSettings[key];
        const overriddenValue = overrides[key];
        const overriddenValueString = overriddenValue !== undefined ? overriddenValue.toString() : "n/a";

        const onSettingChanged = (event) => {
            updateOverrides(current => {
                const nextState = { ...current };
                if (event.target.value === "n/a") {
                    delete nextState[key];
                } else {
                    nextState[key] = event.target.value;
                }
                return nextState;
            });
        };

        return (
          <li key={index}>
            {key} - {enabled.toString()} &nbsp;
            <label>
              <input type="radio" name={`value_override_${index}`} value="n/a" onChange={onSettingChanged} />
              no override
            </label>
            <label>
              <input type="radio" name={`value_override_${index}`} value="true" onChange={onSettingChanged} />
              force enable
            </label>
            <label>
              <input type="radio" name={`value_override_${index}`} value="false" onChange={onSettingChanged} />
              Force Disable
            </label>
          </li>
        );
    });

    return (
        <div>Feature Settings [<a href="#" onClick={onClose}>x</a>]
            <ul>{items}</ul>
        </div>
    );
}
