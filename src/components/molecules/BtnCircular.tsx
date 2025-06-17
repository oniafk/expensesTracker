import styled from "styled-components";
import React from "react";

// TypeScript interface for component props
interface BtnCircularProps {
  icono: React.ReactNode;
  width: string;
  height: string;
  bgcolor: string;
  textColor: string;
  fontsize: string;
  translateX: string;
  translateY: string;
}

// Interface for styled component props (using transient props with $ prefix)
interface ContainerProps {
  $bgcolor: string;
  $textColor: string;
  $width: string;
  $height: string;
  $fontsize: string;
  $translateX: string;
  $translateY: string;
}

export function BtnCircular({
  icono,
  width,
  height,
  bgcolor,
  textColor,
  fontsize,
  translateX,
  translateY,
}: BtnCircularProps) {
  return (
    <Container
      $bgcolor={bgcolor}
      $textColor={textColor}
      $height={height}
      $width={width}
      $fontsize={fontsize}
      $translateX={translateX}
      $translateY={translateY}
    >
      <span>{icono}</span>
    </Container>
  );
}
const Container = styled.div<ContainerProps>`
  background-color: ${(props) => props.$bgcolor};
  min-width: ${(props) => props.$width};
  min-height: ${(props) => props.$height};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  transform: translatex(${(props) => props.$translateX})
    translateY(${(props) => props.$translateY});

  span {
    font-size: ${(props) => props.$fontsize};
    text-align: center;
    color: ${(props) => props.$textColor};
  }
`;
