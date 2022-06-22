import React from "react";
import {useSetRecoilState} from "recoil";
import {Categories, IToDo, toDoState} from "../atoms";

function ToDo({text, category, id}: IToDo){
    const setToDos = useSetRecoilState(toDoState);
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: {name}
        } = e;
        setToDos((prev) => {
            const targetIndex = prev.findIndex(toDo => toDo.id === id);
            const newToDo = {id, text, category: name as any};
            return [...prev.slice(0, targetIndex), newToDo, ...prev.slice(targetIndex + 1)];
        })
    };

    return (
        <li>
            <span>{text}</span>
            {category !== Categories.DOING && <button onClick={onClick} name={Categories.DOING}>DOING</button>}
            {category !== Categories.TO_DO && <button onClick={onClick} name={Categories.TO_DO}>TO_DO</button>}
            {category !== Categories.DONE && <button onClick={onClick} name={Categories.DONE}>DONE</button>}
        </li>
    )
}

export default ToDo;
