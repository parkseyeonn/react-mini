import React from "react";
import CreateToDo from "../../components/CreateToDo";
import ToDo from "../../components/ToDo";
import {useRecoilValue, useRecoilState} from "recoil";
import {Categories, categoryState, toDoSelector} from "../../atoms";

function ToDoList() {
    const [category, setCategory] = useRecoilState(categoryState);
    const toDos = useRecoilValue(toDoSelector);
    const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
        setCategory(e.currentTarget.value as any);
    };

    return <div>
        <h1>TO DO LIST</h1>
        <select value={category} onInput={onInput}>
            <option value={Categories.TO_DO}>TO DO</option>
            <option value={Categories.DOING}>DOING</option>
            <option value={Categories.DONE}>DONE</option>
        </select>
        <CreateToDo />
        <ul>
            {
                toDos?.map((toDo) => (
                    <ToDo key={toDo.id} {...toDo}/>
                ))
            }
        </ul>
    </div>
}

export default ToDoList;
