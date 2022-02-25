import { Form, Input, message, Modal, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { useLocalStorage } from "react-use";
import { TodoItem, TodoList } from "../components/TodoList";
import { guid } from "../utils/guid";
import { cloneDeep } from "lodash";
import "./todo.css";

const { Option } = Select;

export interface TodoListItem {
  category: string;
  children: TodoItem[];
}

function Todo() {
  const [formCategory] = useForm<{ category: string }>();
  const [formTodo] = useForm<{ category: string; todo: string }>();
  const [addNewTodoVisible, setAddNewTodoVisible] = useState<boolean>(false);
  const [addNewCategoryVisible, setAddNewCategoryvisible] =
    useState<boolean>(false);
  const [todoLists, setTodoLists, _R] = useLocalStorage<TodoListItem[]>(
    "todolists",
    []
  );

  const addNewTodo = async () => {
    const values = await formTodo.validateFields();
    const d = new Date();
    // const localLists = cloneDeep(todoLists);
    todoLists!.forEach((item, index) => {
      if (item.category === values.category) {
        item.children.push({
          id: guid(),
          title: values.todo,
          createdAt: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
          finished: false,
        });
      }
    });
    setTodoLists(todoLists);
    message.success("添加成功");
    setAddNewTodoVisible(false);
  };

  const addNewCategory = async () => {
    const values = await formCategory.validateFields();
    if (!todoLists) {
      setTodoLists([{ category: values.category, children: [] }]);
    } else {
      try {
        todoLists.forEach((val) => {
          if (val.category === values.category) {
            message.error("添加失败!已存在该分类");
            throw Error;
          }
        });
      } catch (e) {
        return;
      }
      todoLists.push({ category: values.category, children: [] });
      setTodoLists(todoLists);
    }
    message.success("添加成功");
    setAddNewCategoryvisible(false);
  };

  return (
    <>
      <Modal
        title="Add new TODO"
        visible={addNewTodoVisible}
        onOk={addNewTodo}
        onCancel={() => {
          setAddNewTodoVisible(false);
        }}
        destroyOnClose
      >
        <Form name="addtodo" form={formTodo} preserve={false}>
          <Form.Item
            label="Category"
            name="category"
            rules={[
              { required: true, message: "Please select your category!" },
            ]}
            preserve={false}
          >
            <Select>
              {todoLists
                ? todoLists?.map((item, val) => {
                    return (
                      <Option key={item.category} value={item.category}>
                        {item.category}
                      </Option>
                    );
                  })
                : null}
            </Select>
          </Form.Item>
          <Form.Item
            label="Todo"
            name="todo"
            rules={[{ required: true, message: "Please input your todo!" }]}
          >
            <Input></Input>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Add new Category"
        visible={addNewCategoryVisible}
        onOk={addNewCategory}
        onCancel={() => {
          setAddNewCategoryvisible(false);
        }}
        destroyOnClose
      >
        <Form name="basic" form={formCategory} preserve={false}>
          <Form.Item
            label="Category"
            name="category"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <div className="background"></div>
      <div className="newBtns">
        <div
          className="newCategoryBtn"
          onClick={() => {
            setAddNewCategoryvisible(true);
          }}
        >
          Add new Category
        </div>
        <div
          className="newTodoBtn"
          onClick={() => {
            setAddNewTodoVisible(true);
          }}
        >
          Add new todo
        </div>
      </div>
      <div className="todoWrapper">
        <div className="todoTitle">TODO</div>
        <div className="todos">
          {todoLists
            ? todoLists.map((item, index) => {
                return (
                  <TodoList
                    key={item.category}
                    category={item.category}
                    todos={item.children}
                    todoLists={todoLists}
                    setTodos={setTodoLists}
                  ></TodoList>
                );
              })
            : null}
        </div>
      </div>
    </>
  );
}

export default Todo;
