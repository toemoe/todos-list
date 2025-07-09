import "../styles/App.css";
import React, { useEffect, useState } from "react";
import todoUp from "../assets/arrowUp.svg";
import todoDown from "../assets/arrowDown.svg";
import check from "../assets/Check.svg";
import empty from "../assets/Clear.svg";

interface Task {
    text: string;
    completed: boolean;
}

type Filter = "All" | "Active" | "Completed";

export default function AppTodo() {
    const [imageIndex, setImageIndex] = useState(0);
    const [ input, setInput ] = useState<string>("");
    const [ tasks, setTasks ] = useState<Task[]>([]);
    const [isShown, setShown] = useState(true);
    const images = [ todoDown, todoUp ];
    const [filter, setFilter] = useState<Filter>("All");
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

    useEffect(() => {
        const filtersTasks = tasks.filter((task) => {
            if (filter === "Active") return !task.completed;
            if (filter === "Completed") return task.completed;
            return true;
        });
        setFilteredTasks(filtersTasks);
    }, [filter, tasks]);


    const taskCompletion = (index: number) => {
        const updateTasks = tasks.map((task, i) => 
        i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updateTasks);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handlePress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && input.trim()) {
            setTasks([...tasks, { text: input, completed: false }]);
            setInput("");
        }
    };

    const handleClick = function () {
        setImageIndex((prev) =>  (prev + 1) % 2);
    };

    const hiddenList = function () {
        setShown(prevSetShown => !prevSetShown);
    }

    const clearCompleted = function () {
        const updatedTasks = tasks.filter((task) => !task.completed);
        setTasks(updatedTasks);
    }

    return (
        <div className="Content">
            <h1 className="Title">TODOS</h1>
            <div className="App">
                <div className="InputContainer">
                    <button onClick={hiddenList}>
                        <img src={images[imageIndex]} onClick={handleClick} alt="arrowButton" />
                    </button>
                    <input placeholder="What needs to be done?" type="text" value={input} onChange={handleInputChange} onKeyDown={handlePress} />
                </div>
                <div className="List">
                    {isShown &&
                        <ul>
                            {filteredTasks.map((task, index) => (
                                <div className="BodyItems" key={index}>
                                <button className="AcceptButton" onClick={() => taskCompletion(index)}>
                                    <img src={task.completed ? check : empty} className="CheckImage" alt="AcceptImage" />
                                </button>
                                <li style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                                    {task.text}
                                </li>
                                </div>
                            ))}
                        </ul>
                    }
                    <div className="FooterList">
                    <p className="ItemsLeft">{tasks.filter((task) =>  !task.completed).length} items left</p>
                    <div className="ButtonsContainer">
                        <button className={`AllButton ${filter === "All" ? "active" : ""}`} onClick={() => setFilter("All")}>All</button>
                        <button className={`ActiveButton ${filter === "Active" ? "active" : ""}`} onClick={() => setFilter("Active")}>Active</button>
                        <button className={`CompletedButton ${filter === "Completed" ? "active" : ""}`} onClick={() => setFilter("Completed")}>Completed</button>
                    </div>
                    <button className="ClearButton" onClick={clearCompleted}>Clear completed</button>
                </div>
                </div>
            </div>
        </div>
    );
}