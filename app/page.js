"use client";
import { useEffect, useState } from "react";
import "./style.css";

export default function Home() {
  const [plist, setList] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setList(data));
  }, []);

  const addPost = () => {
    if (!title.trim() || !body.trim()) return;

    const newPost = {
      id: Date.now(),
      title,
      body,
      userId: 33,
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    setList([newPost, ...plist]);
    setBody("");
    setTitle("");
  };

  return (
    <html>
      <body>
        <h1>Список постов</h1>
        <div className="cont">
          <div className="panel">
            <h1>Панель управления</h1>

            <div className="newpost">
              <p>Создать пост</p>
              <input
                placeholder="Название"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></input>
              <br />
              <input
                placeholder="Текст"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              ></input>
              <br />
              <button onClick={addPost}>Создать</button>
            </div>
          </div>

          <div className="list">
            {plist.length > 0 ? (
              <CreateList plist={plist} setList={setList} />
            ) : (
              <h1>Загрузка...</h1>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}

function CreateList({ plist, setList }) {
  const deletePost = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "DELETE",
    });
    setList(plist.filter((post) => post.id != id));
  };

  const listItems = plist.map((post) => (
    <li className="post" key={post.id}>
      
      <p>{post.title}</p>
      <p style={{ color: "#737373" }}>{post.body}</p>
      <button onClick={() => deletePost(post.id)}>Удалить</button>
    </li>
  ));
  return listItems;
}
