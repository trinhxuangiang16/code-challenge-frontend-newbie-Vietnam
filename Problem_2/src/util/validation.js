export const handleValidateInput = (value) => {
  const regex = /^[1-9]\d*$/;
  let isPass = regex.test(value);

  if (isPass) {
    return true;
  } else {
    return false;
  }
};

export const handleValidateChooseType = (value) => {
  if (value) {
    return true;
  } else {
    return false;
  }
};
