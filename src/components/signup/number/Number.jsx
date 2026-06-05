import AuthTextInput from "@/components/auth/auth-inputs/auth-text-input/AuthTextInput";
import Button from "@/components/shared/button/Button";

export default function Number({ handleNumber, data, setData }) {
  return (
    <div className="bg-[#f4f7f9] h-screen flex items-center justify-center">
      <div className="w-sm">
        <AuthTextInput
          label="Phone number"
          placeholder="Phone number"
          value={data.phoneNumber}
          setValue={(value) => {
            if (value.length <= 11) {
              setData({ ...data, phone: value });
            }
          }}
          isRequired
        />
        <Button
          text="Verify"
          containerClassName={"mt-3"}
          handleSubmit={handleNumber}
        />
      </div>
    </div>
  );
}
