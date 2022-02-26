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
  const [articles, setArticles, _r] = useLocalStorage<Article[]>(
    "articles",
    []
  );
  return (
    <div className="ArticleWrapper">
      {articles!.length > 0 ? (
        articles?.map((item, index) => {
          return (
            <div key={index} className="articleLink">
              <Link to={`/home/articles/${item.id}`}>{item.title}</Link>
              <div>{item.createdAt}</div>
            </div>
          );
        })
      ) : (
        <div>
          暂无文章，
          <Link
            onClick={() => localStorage.setItem("currentMenu", "newarticle")}
            to="/home/newarticle"
          >
            点此创建新的文章！
          </Link>
        </div>
      )}
    </div>
  );
}
