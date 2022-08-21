import styled from "styled-components";

import { UserType } from "components/main/lib/types";

interface IUserCard {
  user: UserType;
  onClick: () => void;
}

export const UserCard = ({ user, onClick }: IUserCard) => {
  return (
    <UserCard.Content onClick={onClick}>
      <UserCard.Name>
        <UserCard.NameAvatar bgImage={user.avatar} />

        <UserCard.FullName>
          <UserCard.FullNameName>{user.name}</UserCard.FullNameName>
          <UserCard.FullNameNick>{`@${user.username}`}</UserCard.FullNameNick>
        </UserCard.FullName>
      </UserCard.Name>
    </UserCard.Content>
  );
};

UserCard.Content = styled.div`
  display: flex;
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  width: 250px;
  height: 75px;
  cursor: pointer;
`;

UserCard.Name = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

UserCard.NameAvatar = styled.img<{ bgImage?: string }>`
  background: ${(props) => `url(${props.bgImage}) no-repeat`};
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-size: cover;
  background-position: center;
`;

UserCard.FullName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

UserCard.FullNameName = styled.span``;

UserCard.FullNameNick = styled.span``;
