import { useEffect, useState } from "react";
import "../../styles/pages/todos.css"


const initialStateTask = {
    label: "",
    is_done: false
}

const URL_BASE_TODO = "https://playground.4geeks.com/todo"

const Todos = () => {
    const [task, setTask] = useState(initialStateTask)
    const [taskList, setTaskList] = useState([])
    const [filter, setFilter] = useState("all")


    const filteredTask = taskList.filter((item) => {
        if (filter === "all") return true
        if (filter === "active") return !item.is_done
        if (filter === "completed") return item.is_done
    })


    const handleChange = (event) => {
        setTask({
            ...task,
            [event.target.name]: event.target.value

        })
    }

    // Esta función trae las tareas de la api -- GET
    const getAllTask = async () => {
        try {
            const response = await fetch(`${URL_BASE_TODO}/users/deimian`, {
                method: "GET"
            }) // por default hace GET

            const data = await response.json()

            if (response.ok) {
                setTaskList(data.todos)
            } else if (response.status == 404) {
                createUser()
            } else {
                throw new Error("Error al crear el usuario")
            }

        } catch (error) {
            console.log(error)
        }
    }


    const createUser = async () => {
        try {
            const response = await fetch(`${URL_BASE_TODO}/users/deimian`, {
                method: "POST"
            })

            if (response.ok) {
                getAllTask()
            }

        } catch (error) {
            console.log(error)
        }
    }



    const saveTask = async (event) => {
        if (event.key === "Enter" && task.label.trim() !== "") {

            const response = await fetch(`${URL_BASE_TODO}/todos/deimian`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(task)
            })

            if (response.ok) {
                getAllTask()
            }

            setTask(initialStateTask)
        }
    }


    const deleteTask = async (id) => {
        try {
            const response = await fetch(`${URL_BASE_TODO}/todos/${id}`, {
                method: "DELETE",

            })
            if (response.ok) {
                getAllTask()
            }

        } catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async () => {
        try {
            const response = await fetch(`${URL_BASE_TODO}/users/deimian`, {
                method: "DELETE"
            })
            if (response.ok) {
                getAllTask()
            }
        } catch (error) {
            console.log(error)
        }
    }


    const deleteAllTask = async () => {
        try {
            taskList.forEach((item) => (

                deleteTask(item.id)
            ))
        } catch (error) {
            console.log(error)
        }
    }

    const toggleTask = async (data) => {
        try {
            const response = await fetch(`${URL_BASE_TODO}/todos/${data.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    is_done: !data.is_done
                })
            })

            if (response.ok) {
                getAllTask()
            }

        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        getAllTask()
    }, [])

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12 col-md-7 col-lg-6">
                    <h1 className="display-1 text-center todo__title-main">
                        TODOS
                    </h1>

                    <div className="border">
                        <form
                            onSubmit={(event) => event.preventDefault()}
                        >
                            <input
                                type="text"
                                placeholder="What needs tobe done?"
                                name="label"
                                className="todo-input"
                                value={task.label}
                                onChange={handleChange}
                                onKeyDown={saveTask}
                            />
                        </form>
                        <ul className="todo__task-list">
                            {
                                filteredTask.map((item) => {
                                    return (
                                        <li key={item.id}>
                                            {item.label}
                                            <div>
                                                <span>
                                                    <input
                                                        type="checkbox"
                                                        checked={item.is_done}
                                                        onChange={() => toggleTask(item)}

                                                    />
                                                </span>
                                                <span
                                                    onClick={() => deleteTask(item.id)}
                                                >
                                                    x
                                                </span>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <span className="all-task-info">
                            {
                                `${taskList.length} item left`
                            }
                        </span>
                    </div>
                    <div className="decoration">
                        <div></div>
                        <div></div>
                    </div>
                </div>
                <div className="todo__footer">
                    <div className="todo__footer w-100">
                        <span
                            onClick={() => setFilter("all")}
                            className={filter === "all" ? "active-filter" : ""}
                        >
                            All
                        </span>
                        <span
                            onClick={() => setFilter("active")}
                            className={filter === "active" ? "active-filter" : ""}
                        >
                            Active
                        </span>
                        <span
                            onClick={() => setFilter("completed")}
                            className={filter === "completed" ? "active-filter" : ""}
                        >
                            Completed
                        </span>
                    </div>

                </div>
                <div>
                    <button
                        className="mt-3 btn btn-danger"
                        onClick={deleteAllTask}
                    >Delete All Task</button>
                </div>

            </div>
        </div >
    );
};

export default Todos;