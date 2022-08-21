import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import debounce from "lodash.debounce";

import { CreateUserType } from "components/main/lib/types";

import { useAppDispatch } from "store/hooks/hooks";
import { CustomInput } from "shared/ui/CustomInput/CustomInput";
import { AddIcon } from "shared/ui/Icons/Add/Add";
import { CloseIcon } from "shared/ui/Icons/Close/Close";
import { useUsers } from "components/main/hooks/useUsers";
import {
  getUsersThunk,
  getUserThunk,
  createUserThunk,
  updateUserThunk,
  removeUserThunk,
} from "components/main/model/reducer";
import { UserCard } from "components/main/ui/UserCard/UserCard";
import { UserPanel } from "components/main/ui/UserPanel/UserPanel";

export const Main = () => {
  const dispatch = useAppDispatch();
  const { users, user } = useUsers();
  const navigate = useNavigate();
  const [isShowUserPanel, setISShowUserPanel] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [contact, setContact] = useState<CreateUserType>({
    name: "",
    username: "",
  });

  const openOrCloseCreateUserPanel = () => {
    setIsEdit(false);
    setISShowUserPanel(true);
  };

  const openOrCloseEditUserPanel = (user_id: number) => {
    setIsEdit(true);
    setISShowUserPanel(true);
    dispatch(getUserThunk(user_id));
  };

  const changeContactName = (name_value: string) => {
    setContact({ ...contact, name: name_value });
  };

  const changeContactUsername = (username_value: string) => {
    setContact({ ...contact, username: username_value });
  };

  const searchUsers = debounce((search: string) => {
    if (search !== "") dispatch(getUsersThunk({ name: search }));
    else dispatch(getUsersThunk({}));
  }, 500);

  const saveUser = () => {
    if (isEdit) {
      dispatch(updateUserThunk({ user_id: user.id, params: contact }));
    } else {
      dispatch(createUserThunk(contact));
    }
    closeUserPanel();
  };

  const removeUser = () => {
    if (user.id !== 0) dispatch(removeUserThunk(user.id));
    closeUserPanel();
  };

  const closeUserPanel = () => {
    setIsEdit(false);
    setISShowUserPanel(false);
    setContact({ name: "", username: "" });
  };

  useEffect(() => {
    if (users.length === 0) dispatch(getUsersThunk({}));
    if (localStorage.getItem("to_token") === "") {
      return navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (user.id !== 0) {
      setContact({ name: user.name, username: user.username });
    }
  }, [user]);

  return (
    <Main.Container>
      {isShowUserPanel ? (
        <Main.User>
          <UserPanel
            contact={contact}
            isEdit={isEdit}
            changeContactName={changeContactName}
            changeContactUsername={changeContactUsername}
            saveUser={saveUser}
            removeUser={removeUser}
          />
          <Main.Close onClick={closeUserPanel}>
            <CloseIcon />
          </Main.Close>
        </Main.User>
      ) : null}

      <Main.Users>
        <Main.Search>
          <CustomInput
            placeholder="Поиск контактов"
            handleChange={(e) => searchUsers(e.target.value)}
            containerHoverBg="#eff4f5"
            height="40px"
          />
        </Main.Search>

        <Main.UsersItems>
          {users.length > 0 &&
            users.map((user_item) => (
              <UserCard
                key={user_item.id}
                user={user_item}
                onClick={() => openOrCloseEditUserPanel(user_item.id)}
              />
            ))}
        </Main.UsersItems>
      </Main.Users>

      <Main.Button onClick={() => openOrCloseCreateUserPanel()}>
        <AddIcon />
      </Main.Button>
    </Main.Container>
  );
};

Main.Container = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  padding: 20px;
  gap: 20px;
`;

Main.User = styled.div`
  position: relative;
  min-width: 400px;
  max-height: 100%;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  gap: 16px;
`;

Main.Close = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  right: -15px;
  top: -15px;
  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
  border-radius: 31px;
`;

Main.Users = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 16px;
`;

Main.Search = styled.div`
  padding: 16px;
  border-radius: 8px;
  background: #fff;
`;

Main.UsersItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 16px;
`;

Main.Button = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  background: #3ac15c;
  border-radius: 8px;
  cursor: pointer;
`;

Main.AddButton = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background: #3ac15c;
  border: 2px solid #fff;
  width: 20px;
  height: 20px;
  color: #fff;
  font-size: 33px;
`;
