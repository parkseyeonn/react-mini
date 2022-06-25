import React from "react";
import {useForm} from "react-hook-form";

interface IForm {
    email: string;
    firstName: string;
    userName: string;
    password: string;
    password1: string;
    extraError?: string;
}

function ReactForm() {
    const {
        register,
        handleSubmit,
        formState : {errors},
        setError
    } = useForm<IForm>({
        defaultValues: {
            email: 'test@test.com'
        }
    });
    const onValid = (data: IForm) => {
        console.log(data)
        if(data.password !== data.password1) {
            setError(
                "password1",
                {message: 'Passwords are not the same'},
                {shouldFocus: true}
            )
        }
    };

    return (
        <div>
            <form
                style={{display: "flex"}}
                onSubmit={handleSubmit(onValid)}
            >
                <input
                    {...register("email", {
                        required: "email is required",
                        pattern: {
                            value: /[^A-z0-9._%+-]+@naver.com$/,
                            message: "only naver.com emails allowed"
                        }
                    })}
                    placeholder="email"/>
                <input
                    {...register("firstName", {required: true})}
                    placeholder="first name"/>
                <input
                    {...register("userName", {required: true})}
                    placeholder="user name"/>
                <input
                    {...register("password", {required: true})}
                    placeholder="password"/>
                <input
                    {...register("password1", {
                        required: true,
                        minLength: {
                            value: 5,
                            message: "Your password is too short"
                        }
                    })}
                    placeholder="password check"/>
            </form>
            <span>{errors?.extraError?.message}</span>
        </div>
    );
}

export default ReactForm;
