import { ChangeEvent } from "react";

interface Values {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  password: string;
}

export const AuthInputs = ({
  inputsValues,
  onValueChange,
  isSignIn,
}: {
  inputsValues: Values;
  onValueChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isSignIn?: boolean;
}) => (
  <div>
    {isSignIn ? null : (
      <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          value={inputsValues.firstName}
          onChange={onValueChange}
          name="firstName"
          className="border rounded p-2 py-3 w-[49%]"
          placeholder="First Name"
        />
        <input
          type="text"
          value={inputsValues.lastName}
          onChange={onValueChange}
          name="lastName"
          className="border rounded p-2 py-3 w-[49%]"
          placeholder="Last Name"
        />
      </div>
    )}
    <div className="my-3 flex justify-between text-sm">
      <input
        type="text"
        value={inputsValues.email}
        onChange={onValueChange}
        name="email"
        className="border rounded p-2 py-3 w-full"
        placeholder="Email"
      />
    </div>
    {isSignIn ? null : (
      <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          value={inputsValues.phone}
          onChange={onValueChange}
          name="phone"
          className="border rounded p-2 py-3 w-[49%]"
          placeholder="Phone"
        />
        <input
          type="text"
          value={inputsValues.city}
          onChange={onValueChange}
          name="city"
          className="border rounded p-2 py-3 w-[49%]"
          placeholder="City"
        />
      </div>
    )}
    <div className="my-3 flex justify-between text-sm">
      <input
        type="password"
        value={inputsValues.password}
        onChange={onValueChange}
        name="password"
        className="border rounded p-2 py-3 w-full"
        placeholder="Password"
      />
    </div>
  </div>
);
