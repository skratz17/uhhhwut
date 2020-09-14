import React, { useContext, useState } from 'react';

import { UserContext } from '../../user/UserProvider';
import Form from '../../form/Form';
import { useFormConfig, useIsFormValid } from '../../form/formCustomHooks';
import registerFormConfig from './registerFormConfig';

const RegisterForm = props => {
  const [ didRegisterFail, setDidRegisterFail ] = useState(false);

  const [ formConfig, handleFormChange ] = useFormConfig(registerFormConfig);
  const isFormValid = useIsFormValid(formConfig);

  const { getUserByEmail, saveUser } = useContext(UserContext);

  const handleChange = changeData => {
    setDidRegisterFail(false);
    handleFormChange(changeData);
  }

  const handleSubmit = async () => {
    const user = await getUserByEmail(formConfig.email.value);
    if(user) {
      setDidRegisterFail(true);
    }
    else {
      const newUserData = {
        firstName: formConfig.firstName.value,
        lastName: formConfig.lastName.value,
        email: formConfig.email.value,
        password: formConfig.password.value
      };

      const newUser = await saveUser(newUserData);
      localStorage.setItem('current_user', newUser.id);
      props.history.push('/');
    }
  };

  return (
    <div className="registerFormWrapper">
      <h2>Register</h2>
      { didRegisterFail && <p className="text--warning">A user with that email already exists.</p> }
      <Form formConfig={formConfig} onChange={handleChange} onSubmit={handleSubmit}>
        <button disabled={!isFormValid} type="submit">Register</button>
      </Form>
    </div>
  );
};

export default RegisterForm;