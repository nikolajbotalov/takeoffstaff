import { Field, Form, Formik } from "formik";
import styled from "styled-components";

import { LoginFormType } from "entities/auth/lib/types";

import { useAppDispatch } from "store/hooks/hooks";
import { CustomInput } from "shared/ui/CustomInput/CustomInput";
import { CustomButton } from "shared/ui/CustomButton/CustomButton";
import { loginThunk } from "components/auth/model/reducer";

const initialLogin: LoginFormType = {
  email: "",
  password: "",
};

export const SignIn = () => {
  const dispatch = useAppDispatch();

  return (
    <SignIn.Content>
      <SignIn.Form>
        <Formik
          initialValues={initialLogin}
          validate={(val) => {
            const error = {} as { [key: string]: boolean };
            if (!val.email || !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]+)$/i.test(val.email)) {
              error.email = true;
            }
            if (!val.password || val.password.length < 7) {
              error.password = true;
            }
            return error;
          }}
          onSubmit={(val) => {
            dispatch(
              loginThunk({
                email: val.email,
                password: val.password,
              })
            );
          }}
        >
          {({ touched, errors, values, handleChange, handleBlur }) => (
            <SignIn.Container>
              <SignIn.Title>Вход</SignIn.Title>
              <Field
                required
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched?.email}
                values={values?.email}
                type="text"
                placeholder="Email"
                name="email"
                id="email"
                errors={errors?.email}
                maxLength={100}
                component={CustomInput}
                width="100%"
                height="40px"
                padding="0 16px"
                marginBottom="16px"
                containerHoverBg="#eff4f5"
              />
              <Field
                required
                handleChange={handleChange}
                handleBlur={handleBlur}
                touched={touched?.password}
                values={values?.password}
                type="password"
                placeholder="Пароль"
                name="password"
                id="password"
                errors={errors?.password}
                maxLength={100}
                component={CustomInput}
                width="100%"
                height="40px"
                padding="0 16px"
                marginBottom="16px"
                minLength={8}
                containerHoverBg="#eff4f5"
              />
              <CustomButton
                type="submit"
                title="Войти"
                background="rgba(0, 158, 226, 1)"
                height="40px"
                width="100%"
                hoverBg="rgba(0, 158, 226, 1)"
              />
            </SignIn.Container>
          )}
        </Formik>
      </SignIn.Form>
    </SignIn.Content>
  );
};

SignIn.Content = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eff4f5;
`;

SignIn.Form = styled.div`
  width: 428px;
  border-radius: 4px;
  background: #fff;
  padding: 32px 0px;
  display: flex;
  align-items: center;
  flex-direction: column;
  font-family: "Open Sans", sans-serif;
  font-style: normal;
  line-height: 18px;
  font-weight: 400;
`;

SignIn.Container = styled(Form)`
  padding: 0 32px;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  border-radius: 4px;
  background: #fff;
  margin-bottom: 24px;
`;

SignIn.Title = styled.div`
  font-size: 24px;
  display: flex;
  align-items: flex-end;
  color: #000000;
  flex: none;
  order: 0;
  flex-grow: 0;
  margin-bottom: 24px;
`;
