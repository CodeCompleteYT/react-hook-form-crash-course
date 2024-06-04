import { useState } from "react";

const BasicForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({ email: "", password: "" });

    if (password.length < 10) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 10 characters",
      }));

      return;
    }

    setSubmitting(true);

    await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: "foo",
        body: "bar",
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-10",
      },
    })
      .then((response) => response.json())
      .then(() => console.log("Data submitted!"));

    setSubmitting(false);
  };

  return (
    <form
      className="p-6 space-y-4 bg-white rounded-lg shadow w-3/4"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-semibold mb-4">Welcome back!</h1>
      <div>
        <label
          htmlFor="email"
          className="block mb-1 font-medium text-gray-900 "
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
          placeholder="Email..."
          required={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-1 font-medium text-gray-900 "
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
          placeholder="Password..."
          required={true}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>
      <button
        type="submit"
        className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-5 py-2.5"
        disabled={submitting}
      >
        {submitting ? "Loading..." : "Sign in"}
      </button>
    </form>
  );
};

export default BasicForm;
