import React from "react";
import { Input } from "antd";

export const Contact = ({
  phoneNumber,
  setPhoneNumber,
  email,
  setEmail,
  address,
  setAddress,
}) => (
  <div className="space-y-3">
    <div className="space-y-1.5">
      <label>Phone</label>
      <Input
        size="large"
        value={phoneNumber}
        showCount
        maxLength={20}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
    </div>
    <div className="space-y-1.5">
      <label>Email</label>
      <Input
        size="large"
        value={email}
        showCount
        maxLength={50}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className="space-y-1.5">
      <label>Address</label>
      <Input
        size="large"
        value={address}
        showCount
        maxLength={50}
        onChange={(e) => setAddress(e.target.value)}
      />
    </div>
  </div>
);
