// import { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Select from "../Select";
// import MultiSelect from "../MultiSelect";
import { Field } from "formik";

export default function SelectInputs({ options, label, id, name }: any) {
  
  return (
    
      <div className="space-y-6">
        <div>
          <Label>{label}</Label>
          <Field
            id={id}
            name={name}
            component={Select}
            options={options}
            // placeholder=""
            className="dark:bg-dark-900"
          />
        </div>
        {/* <div>
          <MultiSelect
            label="Multiple Select Options"
            options={multiOptions}
            defaultSelected={["1", "3"]}
            onChange={(values) => setSelectedValues(values)}
          />
          <p className="sr-only">
            Selected Values: {selectedValues.join(", ")}
          </p>
        </div> */}
      </div>
    
  );
}
