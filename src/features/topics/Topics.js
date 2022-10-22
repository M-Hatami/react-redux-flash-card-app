import NewTopicForm from "../../components/NewTopicForm";
import { useSelector } from "react-redux";
import { selectTopics } from "./topicsSlice";
import { Link } from "react-router-dom";
import ROUTES from "../../app/routes";

export default function Topics() {
  const topics = useSelector(selectTopics);
  const farsi = new Intl.NumberFormat("fa-IR", { maximumSignificantDigits: 3 });
  return (
    <section className="center">
      <h1>موضوعات</h1>
      <ul className="topics-list">
        {Object.values(topics).map((topic) => (
          <li className="topic" key={topic.id}>
            <Link to={ROUTES.topicRoute(topic.id)} className="topic-link">
              <div className="topic-container">
                <img src={topic.icon} alt="" />
                <div className="text-content">
                  <h2>{topic.name}</h2>
                  <p>{farsi.format(topic.quizIds.length)} مجموعه‌های موجود</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <Link
        to={ROUTES.newTopicRoute()}
        className="button create-new-topic-button"
      >
        ساخت موضوع جدید
      </Link>
    </section>
  );
}
