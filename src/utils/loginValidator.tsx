export function loginValidator(
  username: string,
  password: string,
): { username: string; password: string } | null {
  const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();
  const errors: { username: string; password: string } = {
    username: "",
    password: ""
  };
  
  if (trimmedUsername.length === 0) {
    errors.username = "Username should not be empty";
  }

  if (trimmedPassword.length === 0) {
    errors.password = "Password should not be empty";
  }
  const hasErrors = errors.username || errors.password;

  return hasErrors ? errors : null;
}
