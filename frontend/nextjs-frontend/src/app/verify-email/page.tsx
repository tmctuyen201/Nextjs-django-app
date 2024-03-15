import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(event.target.value);
  };
  const ;
  return (
    <div>
      <p>Enter the OTP sent to your email</p>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={handleOtpChange}
      />
      <button onClick={}>Verify Email</button>
    </div>
  );
};
