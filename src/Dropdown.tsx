import * as React from 'react';
import Downshift from 'downshift';
import styled from 'styled-components';

type OptionType = {
    value: string;
}
interface DropdownProps {
    options: OptionType[];
    onChange: (selectedItem: string) => void;
}

const Form = styled.form`
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 240px;
    margin: 0;
    padding: 0;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 10px;
`;

const InputContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const Input = styled.input`
    padding: 4px;
    font-size: calc(10px + 2vmin);
    border: 1px solid black;
    border-bottom-left-radius: ${({ isActive }: { isActive: boolean }) => isActive && 0};
    border-bottom-right-radius: ${({ isActive }) => isActive && 0};
    border-radius: 4px;
    outline: 0;
`;

const Menu = styled.ul`
    position: absolute;
    top: 85px;
    width: 238px;
    margin: 0;  
    padding: 0;
    background-color: white;
    border: ${({ isActive }: { isActive: boolean }) => isActive && '1px solid'};
    border-bottom-left-radius: ${({ isActive }: { isActive: boolean }) => isActive && 0};
    border-bottom-right-radius: ${({ isActive }) => isActive && 0};
    border-radius: 4px;
`;

const Item = styled.li`
    width: 100%;
    color: black;
    list-style: none;
`;

const Button = styled.button`
    position: absolute;
    top: 6px;
    right: 4px;
    padding: 4px;
    text-align: center;
    background-color: transparent;
    border: none;
    cursor: pointer;
    outline: 0;
`;

function ArrowIcon({ isOpen }: {
    isOpen: boolean;
}) {
    return (
      <svg
        viewBox="0 0 20 20"
        preserveAspectRatio="none"
        width={20}
        fill="transparent"
        stroke="#979797"
        strokeWidth="1.1px"
        transform={isOpen ? 'rotate(180)' : undefined}
      >
        <path d="M1,6 L10,15 L19,6" />
      </svg>
    )
}
  
function XIcon() {
    return (
      <svg
        viewBox="0 0 20 20"
        preserveAspectRatio="none"
        width={16}
        fill="transparent"
        stroke="#979797"
        strokeWidth="1.1px"
      >
        <path d="M1,1 L19,19" />
        <path d="M19,1 L1,19" />
      </svg>
    )
  }

const Dropdown: React.FC<DropdownProps> = ({ options, onChange }) => {
    return (
        <Downshift
            // TODO: uncomment default value 
            // initialSelectedItem={options[0]}
            onChange={selectedItem => onChange(selectedItem ? selectedItem.value : '')}
            itemToString={item => (item ? item.value : '')}
        >
            {({ getRootProps, getInputProps, getLabelProps, getMenuProps, getItemProps, getToggleButtonProps, isOpen, highlightedIndex, inputValue, clearSelection }) => (
                    <Form {...getRootProps()}>
                        <Label {...getLabelProps()}>Choose an item</Label>
                        <InputContainer>
                            <Input {...getInputProps()} isActive={isOpen} />
                            <Button {...getToggleButtonProps()} style={{ right: '28px' }}><ArrowIcon isOpen={isOpen} /></Button>
                            <Button onClick={() => clearSelection()} style={{ top: '8px' }}><XIcon /></Button>
                        </InputContainer>
                    <Menu {...getMenuProps()} isActive={isOpen}>
                        {isOpen && options
                            .filter(item => !inputValue || item.value.includes(inputValue))
                            .map((item, index) => (
                                <Item {...getItemProps({
                                    item,
                                    index,
                                    key: item.value,
                                    style: {
                                        backgroundColor: index === highlightedIndex ? "purple" : undefined,
                                        color: index === highlightedIndex ? "white" : undefined
                                    }
                                })}>{item.value}</Item>
                            ))}
                    </Menu>
                </Form>
            )}
        </Downshift>
    )
}

export default Dropdown;