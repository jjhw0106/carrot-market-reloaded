export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
  );
export const PASSWORD_REGEX_ERROR_MSG="패스워드는 대소문자 및 특수문자를 포함해야 합니다.";