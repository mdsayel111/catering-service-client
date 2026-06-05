import AuthTextInput from "@/components/auth/auth-inputs/auth-text-input/AuthTextInput";
import ResetPasswordLayout from "../components/ResetPasswordLayout";

export default function NewPassword({
  password,
  setNewPassword,
  handleSubmit,
}) {
  return (
    <ResetPasswordLayout>
      <h2 class="text-3xl font-bold mb-1">Welcome Back!</h2>
      <p class="text-sm text-gray-500 mb-8">Please set your new password.</p>

      <form>
        <div class="mb-4">
          <AuthTextInput
            type="password"
            label="New Password"
            placeholder="New Password"
            value={password}
            setValue={(value) => {
              setNewPassword(value);
            }}
            isRequired
          />
        </div>

        <button
          onClick={handleSubmit}
          class="w-full py-3 bg-black text-white font-bold rounded-md text-sm"
        >
          Reset Password
        </button>
      </form>
    </ResetPasswordLayout>
  );
}
