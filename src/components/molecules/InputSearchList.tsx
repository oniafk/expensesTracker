import React from "react";
import styled from "styled-components";

// TypeScript interface for component props
interface InputSearchListProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  value?: string; // Optional controlled input value
  disabled?: boolean; // Optional disabled state
  name?: string; // Optional input name attribute
  id?: string; // Optional input id attribute
}

export function InputSearchList({
  onChange,
  placeholder,
  value,
  disabled = false,
  name,
  id,
}: InputSearchListProps) {
  return (
    <Container>
      <input
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        name={name}
        id={id}
        type="text"
      />
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  input {
    background: ${({ theme }) => theme.body};
    font-size: 16px;
    padding: 10px 10px 10px 5px;
    display: block;
    width: 100%;
    border: none;
    border-bottom: solid 1px grey;
    color: ${({ theme }) => theme.text};
    outline: none;
    transition: border-bottom 0.2s ease;

    &:focus {
      border-bottom: solid 2px ${({ theme }) => theme.primary};
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background: ${({ theme }) => theme.bg2};
    }

    &::placeholder {
      color: #c8c8c8;
    }
  }
`;
