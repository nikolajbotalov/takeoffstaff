import styled from "styled-components";

interface ICustomTitle {
  title: string;
  margin?: string;
}

export const CustomTitle = ({ title, margin }: ICustomTitle) => {
  return <CustomTitle.Title margin={margin}>{title}</CustomTitle.Title>;
};

CustomTitle.Title = styled.h1<{ margin?: string }>`
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  line-height: 18px;
  margin: ${({ margin = "0" }) => margin};
  padding: 0;
`;
