import { ChangeEvent, FormEvent, useState } from "react";
import { Post } from "../lib/posts";

export default function Form(props: { addpost: (args0: Post) => void }) {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      const msg = await response.json();
      console.log(msg);

      props.addpost({ title: formData.title, body: formData.body, id: msg.id });
    } else {
      const msg = await response.json();
      console.error(msg);
    }
  };

  return (
    <div className="mt-16 flex flex-col w-fit">
      <h1 className="text-2xl text-center"> Addpost</h1>
      <form method="POST" className="flex items-center flex-col" onSubmit={handleSubmit}>
        <div className="my-3 w-full">
          <input
            type="text"
            name="title"
            className="outline outline-slate-400 w-full p-2"
            value={formData.title}
            onChange={handleChange}
            placeholder="Post Title"
          />
        </div>
        <div className="my-3">
          <textarea
            name="body"
            className="outline outline-slate-400 p-2 resize-none overflow-scroll"
            cols={50}
            rows={20}
            value={formData.body}
            onChange={handleChange}
            placeholder="Post Body"
          />
        </div>
        <button type="submit" className="w-2/3 text-center bg-slate-500 p-2 text-white rounded-md">
          Post
        </button>
      </form>
    </div>
  );
}
