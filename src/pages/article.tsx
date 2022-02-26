import { Link } from "react-router-dom";
import { useLocalStorage } from "react-use";
import "./article.css";

export interface Article {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function Articles() {
  const [articles, setArticles, _r] = useLocalStorage<Article[]>("articles");
  return (
    <div className="ArticleWrapper">
      {articles?.map((item, index) => {
        return (
          <div className="articleLink">
            <Link to={`/home/articles/${item.id}`}>{item.title}</Link>
            <div>{item.createdAt}</div>
          </div>
        );
      })}
    </div>
  );
}
