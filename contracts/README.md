# Create deploy form

These contracts are based on the proxy pattern, which allows for cheaper deployments in terms of gas and automatic verification in the explorer.

To build your own form to be used inside DexKit and interact with DexGenerator, you need to follow certain rules. The form is automatically generated, and a deploy button is available to deploy contracts on the supported blockchains.

First, create a folder with your username, for instance 'thirdweb', and then add JSON files representing your contracts under that username.

The JSON needs to conform to the following schema structure:"

```
export type FormConfigParams = {
  paramsOrder: string[];
  output: ObjectMapping[];
  form: FormElement[];
  name: string;
  description: string;
};
```

Where paramsOrder is the order of parameters in the initialize function of the implementation that will be deployed by a factory, output is the data that will be produced by the form, form is how you want to display all elements, name is the contract name, and description is metadata used to describe the contract.

output follows:

```
export type ObjectMapping = {
  name: string;
  type?: string;
  fields: {
    type?: string;
    name: string;
    fields?: string[];
  }[];
};
```

form follows:

```
export type ThirdWebDeployFormInputBase = {
  inputType: string;
  label?: string;
  locked?: boolean;
  helpText?: string;
};

export type ThirdWebDeployFormInputIpfs = ThirdWebDeployFormInputBase & {
  inputType: "json";
  ipfsUrl: string;
};

export type ThirdWebDeployFormInput = ThirdWebDeployFormInputIpfs;

export type ThirdWebDeployFormParams = {
  inputs: { [key: string]: ThirdWebDeployFormInput };
};

export type AddressInput = {
  type: "address";
  subtype?: "connected-address" | "string";
};

export type CheckboxInput = {
  type: "checkbox";
};

export type ImageInput = {
  type: "image";
};

export type HiddenInput = {
  type: "hidden";
  subtype?: "connected-address" | "string";
};

export type AddressArrayInput = {
  type: "address-array";
};

export type DecimalInput = {
  type: "decimal";
  decimals: number;
};

export type InputComponent =
  | AddressInput
  | CheckboxInput
  | ImageInput
  | HiddenInput
  | AddressArrayInput
  | DecimalInput;

export type FormInput = {
  type: "input";
  ref: string;
  locked: boolean;
  label: string;
  defaultValue?: any;
  component?: InputComponent;
  helperText?: string;
  col?: {
    sm?: number;
    xs?: number;
  };
};

export type FormInputGroup = {
  type: "input-group";
  inputs: FormInput[];
  col?: {
    sm?: number;
    xs?: number;
  };
};

export type FormElement = FormInput | FormInputGroup;

export type Form = {
  elements: FormElement[];
};

```
