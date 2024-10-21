/* eslint-disable import/prefer-default-export */

export const emailValidateOptions = {
  required: '必須入力です',
  pattern: {
    value:
      /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
    message: 'メールアドレスの形式で入力してください',
  },
  validate: (v: string): any => {
    const result = ['gmail', 'hotmail'].some((d: string) => v.includes(d));

    if (process.env.NODE_ENV !== 'production') return true;

    return !result || 'フリーメールは使用できません';
  },
};

export const emailValidateWithFreemailOptions = {
  required: '必須入力です',
  pattern: {
    value:
      /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
    message: 'メールアドレスの形式で入力してください',
  },
};
