import styled from "styled-components";

import { CreateUserType } from "components/main/lib/types";

import { CustomTitle } from "shared/ui/CustomTitle/CustomTitle";
import { CustomInput } from "shared/ui/CustomInput/CustomInput";
import { CustomButton } from "shared/ui/CustomButton/CustomButton";

interface IUserPanel {
  contact: CreateUserType;
  isEdit: boolean;
  changeContactName: (name_value: string) => void;
  changeContactUsername: (username_value: string) => void;
  saveUser: () => void;
  removeUser: () => void;
}

export const UserPanel = ({
  contact,
  isEdit,
  changeContactName,
  changeContactUsername,
  saveUser,
  removeUser,
}: IUserPanel) => {
  let title = isEdit ? "Редактировать контакт" : "Добавить контакт";

  const checkContactFieldsIsEmpty = (): boolean => {
    return contact.name === "" || contact.username === "" ? true : false;
  };

  return (
    <>
      <CustomTitle title={title} margin="0 auto" />

      <CustomInput
        placeholder="Введите имя"
        height="40px"
        width="100%"
        containerHoverBg="#eff4f5"
        handleChange={(e) => changeContactName(e.target.value)}
        value={contact.name}
      />
      <CustomInput
        placeholder="Введите никнейм"
        height="40px"
        width="100%"
        containerHoverBg="#eff4f5"
        handleChange={(e) => changeContactUsername(e.target.value)}
        value={contact.username}
      />

      <CustomButton
        title="Сохранить"
        width="100%"
        border="none"
        background={checkContactFieldsIsEmpty() ? "#eee" : "#3ac15c"}
        hoverBg={checkContactFieldsIsEmpty() ? "#eee" : "#3ac15c"}
        disabled={checkContactFieldsIsEmpty()}
        handleClick={saveUser}
      />

      {isEdit ? (
        <CustomButton
          title="Удалить пользователя"
          width="100%"
          border="none"
          background="#e57373"
          hoverBg="#e57373"
          handleClick={removeUser}
        />
      ) : null}
    </>
  );
};

UserPanel.Content = styled.div``;
