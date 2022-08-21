import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface ICustomButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  handleClick?: () => void;
  background?: string;
  height?: string;
  width?: string;
  marginBottom?: string;
  titlePadding?: string;
  border?: string;
  borderRadius?: string;
  fontWeight?: string;
  fontSize?: string;
  hoverBg?: string;
  btnPadding?: string;
  hoverColor?: string;
}

export const CustomButton = ({
  handleClick,
  title,
  type,
  background,
  height,
  width,
  color,
  marginBottom,
  titlePadding,
  border,
  borderRadius,
  fontWeight,
  fontSize,
  hoverBg,
  btnPadding,
  disabled,
  hoverColor,
}: ICustomButton) => {
  return (
    <CustomButton.Container
      onClick={handleClick}
      type={type || "button"}
      background={background}
      height={height}
      width={width}
      marginBottom={marginBottom}
      border={border}
      borderRadius={borderRadius}
      hoverBg={hoverBg}
      btnPadding={btnPadding}
      disabled={disabled}
      hoverColor={hoverColor}
      color={color}
    >
      <CustomButton.Title titlePadding={titlePadding} fontWeight={fontWeight} fontSize={fontSize}>
        {title}
      </CustomButton.Title>
    </CustomButton.Container>
  );
};

CustomButton.Container = styled.button<{
  background?: string;
  height?: string;
  width?: string;
  marginBottom?: string;
  border?: string;
  borderRadius?: string;
  hoverBg?: string;
  btnPadding?: string;
  hoverColor?: string;
  color?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background: ${({ background = "rgba(255, 255, 255, 1)" }) => background};
  margin-bottom: ${({ marginBottom = "0" }) => marginBottom};
  border: ${({ border = "1px solid #009EE2" }) => border};
  border-radius: ${({ borderRadius = "4px" }) => borderRadius};
  padding: ${({ btnPadding = "1px 6px" }) => btnPadding};
  color: ${({ color = "#fff" }) => color};

  &:hover {
    background: ${({ hoverBg = "#36B555" }) => hoverBg};
    color: ${({ hoverColor }) => hoverColor};
  }
`;

CustomButton.Button_Icon = styled.span<{ iconMarginRight?: string }>`
  margin-right: ${({ iconMarginRight = "10px" }) => iconMarginRight};
  display: flex;
  align-items: center;
`;

CustomButton.Title = styled.span<{
  titlePadding?: string;
  fontWeight?: string;
  fontSize?: string;
  lineHeight?: string;
}>`
  font-family: "Open Sans", sans-serif;
  font-style: normal;
  font-weight: ${({ fontWeight = "600" }) => fontWeight};
  font-size: ${({ fontSize = "14px" }) => fontSize};
  line-height: ${({ lineHeight = "24px" }) => lineHeight};
  padding: ${({ titlePadding = "8px 0" }) => titlePadding};
`;
