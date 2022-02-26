import { Checkbox, Progress, Timeline } from "antd";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "react-use";
import { TodoListItem } from "../pages/todo";
import "./todolist.css";

export interface TodoItem {
  id: string;
  title: string;
  createdAt: string;
  finished: boolean;
}

export function TodoList({
  category,
  todos,
  todoLists,
  setTodos,
}: {
  category: string;
  todos: TodoItem[];
  todoLists: TodoListItem[];
  setTodos: Dispatch<SetStateAction<TodoListItem[] | undefined>>;
}) {
  const [finishedNum, setFinishedNum] = useState(0);

  const finishTodo = (category: string, id: string) => {
    todos.forEach((val) => {
      if (val.id === id) {
        val.finished = true; // TODO =true
        setFinishedNum((prev) => prev + 1);
      }
    });
    todoLists.forEach((val) => {
      if (val.category === category) {
        val.children = todos;
      }
    });
    setTodos(todoLists);
  };

  const computePercent = useMemo(() => {
    let totalChildren = todos.length;
    let localFinishNum = 0;
    todos?.forEach((val) => {
      if (val.finished) {
        localFinishNum++;
      }
    });
    setFinishedNum(localFinishNum);
    return (finishedNum / totalChildren) * 100;
  }, [finishedNum, todos.length]);

  return (
    <div className="todoListWrapper">
      <div className="todoCategory">{category}</div>
      <div className="percentage">
        <Progress percent={computePercent} />
      </div>
      <Timeline style={{ overflow: "scroll", height: "360px" }}>
        {todos.map((val) => {
          return (
            <div key={val.id}>
              <Timeline.Item>
                <Checkbox
                  onClick={() => finishTodo(category, val.id)}
                  checked={val.finished}
                  style={{
                    fontSize: "18px",
                  }}
                >
                  <span
                    style={{
                      textDecoration: val.finished ? "line-through" : "none",
                    }}
                  >
                    {val.title}
                  </span>
                  <span style={{ fontSize: "14px", color: "GrayText" }}>
                    ---创建于：{val.createdAt}
                  </span>
                </Checkbox>
              </Timeline.Item>
            </div>
          );
        })}
      </Timeline>
    </div>
  );
}
