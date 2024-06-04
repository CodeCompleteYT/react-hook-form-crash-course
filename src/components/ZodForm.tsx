import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(10, { message: "Password must be at least 10 characters" }),
});

type Form = z.infer<typeof formSchema>;

const ZodForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
    watch,
    setError,
  } = useForm<Form>({ resolver: zodResolver(formSchema) });

  const { email } = watch();

  const onSubmit: SubmitHandler<Form> = async ({ email, password }) => {
    console.log(email, password);

    console.log("Get Values:", getValues());

    try {
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
        .then(() => console.log("Data submitted!"))
        .then(() => {
          throw new Error();
          setValue("email", "");
          setValue("password", "");
        });
    } catch (error) {
      setError("root", { message: "The data could not be submitted" });
    }
  };

  return (
    <form
      className="p-6 space-y-4 bg-white rounded-lg shadow w-3/4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-semibold mb-4">Welcome back {email}!</h1>
      <div>
        {errors.root?.message && (
          <p className="text-red-500">{errors.root.message}</p>
        )}
        <label
          htmlFor="email"
          className="block mb-1 font-medium text-gray-900 "
        >
          Email
        </label>
        <input
          {...register("email")}
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
          placeholder="Email..."
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-1 font-medium text-gray-900 "
        >
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
          placeholder="Password..."
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-5 py-2.5"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Loading..." : "Sign in"}
      </button>
    </form>
  );
};

export default ZodForm;
