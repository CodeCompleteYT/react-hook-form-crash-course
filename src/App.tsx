import BasicForm from "./components/BasicForm";
import HookForm from "./components/HookForm";
import ZodForm from "./components/ZodForm";

function App() {
  return (
    <div className="w-screen h-screen bg-gray-50 flex items-center justify-center flex-col">
      {/* <BasicForm /> */}
      {/* <HookForm /> */}
      <ZodForm />
    </div>
  );
}

export default App;
