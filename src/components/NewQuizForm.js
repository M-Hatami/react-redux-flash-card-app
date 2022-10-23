import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addCard } from "../features/cards/cardsSlice";
import { addQuizForTopicId } from "../features/quizzes/quizzesSlice";
import { selectTopics } from "../features/topics/topicsSlice";
import { v4 as uuidv4 } from "uuid";
import ROUTES from "../app/routes";

export default function NewQuizForm() {
  const [name, setName] = useState("");
  const [cards, setCards] = useState([]);
  const [topicId, setTopicId] = useState("");
  const history = useHistory();
  const topics = useSelector(selectTopics);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.length === 0) {
      return;
    }

    const cardIds = [];

    cards.forEach((card) => {
      let cardId = uuidv4();
      cardIds.push(cardId);
      dispatch(addCard({ ...card, id: cardId }));
    });

    let quizId = uuidv4();

    dispatch(
      addQuizForTopicId({
        name: name,
        topicId: topicId,
        cardIds: cardIds,
        id: quizId,
      })
    );

    history.push(ROUTES.quizzesRoute());
  };

  const addCardInputs = (e) => {
    e.preventDefault();
    setCards(cards.concat({ front: "", back: "" }));
  };

  const removeCard = (e, index) => {
    e.preventDefault();
    setCards(cards.filter((card, i) => index !== i));
  };

  const updateCardState = (index, side, value) => {
    const newCards = cards.slice();
    newCards[index][side] = value;
    setCards(newCards);
  };

  return (
    <section>
      <h1>ساختن یک برگه جدید</h1>
      <form onSubmit={handleSubmit}>
        <input
          id="quiz-name"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="عنوان برگه"
        />
        <select
          id="quiz-topic"
          onChange={(e) => setTopicId(e.currentTarget.value)}
          placeholder="موضوع"
        >
          <option value="">موضوع</option>
          {Object.values(topics).map((topic) => (
            <option key={topic.id} value={topic.id}>
              {topic.name}
            </option>
          ))}
        </select>
        {cards.map((card, index) => (
          <div key={index} className="card-front-back">
            <input
              id={`card-front-${index}`}
              value={cards[index].front}
              onChange={(e) =>
                updateCardState(index, "front", e.currentTarget.value)
              }
              placeholder="پیش"
            />

            <input
              id={`card-back-${index}`}
              value={cards[index].back}
              onChange={(e) =>
                updateCardState(index, "back", e.currentTarget.value)
              }
              placeholder="پس"
            />

            <button
              onClick={(e) => removeCard(e, index)}
              className="remove-card-button"
            >
              حذف برگه
            </button>
          </div>
        ))}
        <div className="actions-container">
          <button onClick={addCardInputs}>افزودن برگه</button>
          <button>ساخت مجموعه برگه جدید</button>
        </div>
      </form>
    </section>
  );
}
