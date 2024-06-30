import Button from "./components/Button/Button";
import Input from "./components/Input/Input";

function App() {
  return (
    <>
      <Button onClick={() => console.log("click")}>Button</Button>
      <Button appearance="big" onClick={() => console.log("click")}>
        Button
      </Button>
      <Input placeholder="Placeholder" />
    </>
  );
}

export default App;
