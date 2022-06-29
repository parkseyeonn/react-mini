// https://nextjs-blog-gray.vercel.app/article/compound-components
//“Compound Component”란 요구되는 기능을 수행하기 위해 두 개 이상의 컴포넌트가 협력하는 형태를 말한다. 보통 부모 - 자식 컴포넌트로 구성되며, 컴포넌트 간에 외부로 드러나지 않는 상태공유가 존재한다.
// Compound 컴포넌트가 가진 다른 중요한 개념은 "암묵적 state" 입니다. select엘리먼트는 암묵적으로 어떠한 옵션이 선택되었는지에 대한 state를 저장하고 이를 자식(option엘리먼트)에게 공유합니다. 자식은 공유받은 state에 따라 스스로의 랜더링 여부를 결정하게 됩니다. 그러나 첫번째 HTML 코드를 보면 알 수 있듯이 state에 접근하는 코드는 하나도 작성되어있지 않습니다. 이렇기 때문에 이를 "암묵적 state"라고 합니다.
import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import styled from "styled-components";

interface IToggleContext {
    on: boolean;
    toggle: () => void
}

const ToggleContext = React.createContext<IToggleContext | null>(null);

function useEffectAfterMount<T>(callback: () => void, dependencies : T[]) {
    const mounted = useRef(true);
    useEffect(() => {
        console.log('mounted', mounted.current)
        if(!mounted.current) {
            return callback();
        }
        mounted.current = false;
    }, dependencies);
}

interface IToggle {
    onToggle: (arg0: boolean) => void;
    children: React.ReactNode
}

function Toggle (props: IToggle) {
    const [on, setOn] = useState(false);
    const toggle = useCallback(() => setOn(prevState => !prevState), []);
    useEffectAfterMount(() => {
        props.onToggle(on);
    }, [on]);
    const value = useMemo(() => ({on, toggle}), [on]);
    return (
     <ToggleContext.Provider value={value}>
         {props.children}
     </ToggleContext.Provider>
    )
}

function useToggleContext() {
    const context = useContext(ToggleContext);
    if (!context) {
        throw new Error(
            'Toggle compound components cannot be rendered outside the toggle component'
        )
    }
    return context;
}

interface IOnOFF {
    children: JSX.Element
}

function On({children}: IOnOFF): JSX.Element | null {
    const {on} = useToggleContext();
    return on ? children : null;
}

function Off({children}: IOnOFF): JSX.Element | null {
    const {on} = useToggleContext();
    return on ? null : children;
}

interface IButton {
}

function Button(props: IButton) {
    const {on, toggle} = useToggleContext();
    return (<Switch on={on} onClick={toggle} {...props}/>);
}

interface ISwitch {
    on: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SwitchButton = styled.button<{ on: number }>`
  position: relative;
  width: 60px;
  height: 30px;
  background-color: white;
  border: 1px solid black;
  border-radius: 20px;

  span {
    position: absolute;
    left: 2px;
    top: 2px;
    width: 26px;
    height: 25px;
    margin-left: ${props => props.on ? '30px' : 0};
    border-radius: 13px;
    background-color: #00dbff;
    transition: .2s;
  }
`;

//styled component error.
//https://stackoverflow.com/questions/49784294/warning-received-false-for-a-non-boolean-attribute-how-do-i-pass-a-boolean-f
function Switch ({on, onClick}: ISwitch) {
    return (
        <SwitchButton on={on ? 1 : 0} onClick={onClick}>
            <span />
        </SwitchButton>
    );
}

Toggle.On = On;
Toggle.Off = Off;
Toggle.Button = Button;

export default Toggle;
