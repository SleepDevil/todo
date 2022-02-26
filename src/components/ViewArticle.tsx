import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { Article } from "../pages/article";
import "./viewarticle.css";

export default function ViewArticle() {
  let params = useParams();
  const [articles, setArticles, _r] = useLocalStorage<Article[]>("articles");
  const articleContent = useMemo(() => {
    const p = new DOMParser();
    let htm: any = document.createDocumentFragment();
    articles?.forEach((item) => {
      if (item.id === params.id) {
        htm = p.parseFromString(item.content, "text/html");
      }
    });
    return htm;
  }, [params.id]);
  const articleTitle = useMemo(() => {
    let title = "";
    articles?.forEach((item) => {
      if (item.id === params.id) {
        title = item.title;
      }
    });
    return title;
  }, [params.id]);

  useEffect(() => {
    document
      .querySelector(".contentWrapper")
      ?.appendChild(articleContent.documentElement);
  }, [params.id]);

  return (
    <div className="contentWrapper">
      {
        <h1 style={{ textAlign: "center", fontSize: "2rem" }}>
          {articleTitle}
        </h1>
      }
    </div>
  );
}
