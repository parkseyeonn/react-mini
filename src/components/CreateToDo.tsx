import {useForm} from "react-hook-form";
import {useSetRecoilState, useRecoilValue} from "recoil";
import {categoryState, toDoState} from "../atoms";

interface IForm {
    toDo: string;
}

function CreateToDo() {
    const category = useRecoilValue(categoryState);
    const setToDos = useSetRecoilState(toDoState);
    const {handleSubmit, register, setValue} = useForm<IForm>();
    const handleValid = ({toDo}: IForm) => {
        setToDos(prev => ([
            {text: toDo, id: Date.now(), category},
            ...prev
        ]));
        setValue("toDo", '');
    };

    return (
        <form onSubmit={handleSubmit(handleValid)}>
            <input {...register("toDo", {
                required: "Please write a to do"
            })}
                   placeholder="Write a to do"
            />
            <button>Add</button>
        </form>
    );
}

export default CreateToDo;
