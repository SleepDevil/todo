import "react-markdown-editor-lite/lib/index.css";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import { Button, Form, Input, message } from "antd";
import React from "react";
import { currentTime } from "../utils/time";
import { guid } from "../utils/guid";
import { NavigateFunction } from "react-router-dom";

const mdParser = new MarkdownIt();

export default class NewArticle extends React.Component<
  { navigate: NavigateFunction },
  {}
> {
  mdEditor: MdEditor | undefined;

  onSubmit = (e: any) => {
    console.log(e.title, this.mdEditor?.getHtmlValue());
    const articles: any = JSON.parse(localStorage.getItem("articles") ?? "[]");
    articles.push({
      id: guid(),
      title: e.title,
      content: this.mdEditor!.getHtmlValue(),
      createdAt: currentTime(),
    });
    localStorage.setItem("articles", JSON.stringify(articles));
    message.success("创建成功");
    setTimeout(() => {
      this.props.navigate("/home/articles");
    }, 1500);
  };

  render() {
    return (
      <>
        <Form onFinish={this.onSubmit}>
          <Form.Item
            rules={[{ required: true, message: "标题不能为空！" }]}
            name="title"
            style={{ marginBottom: "20px" }}
          >
            <Input placeholder="请输入标题"></Input>
          </Form.Item>

          <div id="textNoteWrap">
            <MdEditor
              ref={(node) => (this.mdEditor = node || undefined)}
              renderHTML={(text) => mdParser.render(text)}
              placeholder="在此输入文章内容，支持markdown语法，右侧为实时预览"
            >
              just so so
            </MdEditor>
          </div>
          <Form.Item
            style={{ marginTop: "20px" }}
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Button type="primary" htmlType="submit">
              完成
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}
