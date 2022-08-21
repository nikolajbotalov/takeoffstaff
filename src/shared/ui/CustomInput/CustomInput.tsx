import type { HTMLProps } from "react";
import styled from "styled-components";

interface ICustomInput extends HTMLProps<HTMLInputElement> {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  searchOnBtnClick?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  padding?: string;
  margin?: string;
  borderColor?: string;
  containerHoverBg?: string;
  containerHoverBorder?: string;
  errors?: string;
  bg?: string;
}

export const CustomInput = ({
  maxLength,
  type,
  handleChange,
  handleBlur,
  searchOnBtnClick,
  value,
  name,
  id,
  width,
  height,
  placeholder,
  defaultValue,
  padding,
  margin,
  borderColor,
  readOnly,
  containerHoverBg,
  containerHoverBorder,
  minLength,
  errors,
  bg,
}: ICustomInput) => {
  return (
    <CustomInput.Container
      borderColor={borderColor}
      padding={padding}
      margin={margin}
      width={width}
      height={height}
      onKeyDown={searchOnBtnClick}
      containerHoverBg={containerHoverBg}
      containerHoverBorder={containerHoverBorder}
      errors={errors}
      bg={bg}
    >
      <CustomInput.Input
        maxLength={Number.isInteger(maxLength) ? maxLength : undefined}
        minLength={Number.isInteger(minLength) ? minLength : undefined}
        type={type || "text"}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        name={name}
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
        readOnly={readOnly}
      />
    </CustomInput.Container>
  );
};

CustomInput.Container = styled.div<{
  borderColor?: string;
  width?: string | number;
  height?: string | number;
  padding?: string;
  margin?: string;
  containerHoverBg?: string;
  containerHoverBorder?: string;
  containerActiveBorder?: string;
  errors?: string;
  bg?: string;
}>`
  display: flex;
  align-items: center;
  border: ${(props) => (props.errors === "true" ? "1px solid red" : "1px solid #eff4f5")};
  background: ${({ bg = "#eff4f5" }) => bg};
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  border-radius: 4px;
  padding: ${({ padding = "0 17px" }) => padding};
  margin: ${({ margin = "0" }) => margin};
  outline: none;

  &:hover {
    background: ${({ containerHoverBg = "#fff" }) => containerHoverBg};
  }

  &:focus {
    border: 1px solid green;
  }

  &:active {
    border: 1px solid green;
    outline: none;
  }
`;

CustomInput.Input = styled.input`
  width: 100%;
  height: 100%;
  font-family: "Open Sans", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 24px;
  background: #eff4f5;
  color: #777777;
  box-sizing: border-box;
  outline: none;
  border: none;
`;
