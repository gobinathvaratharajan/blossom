import { Button } from "./components";

function App() {
  return (
    <>
      <Button intent="secondary">Secondary</Button>
      <Button intent="outline">Outline</Button>
      <Button intent="ghost">Ghost</Button>
      <Button leftIcon="🔥">Fire</Button>

      <Button rightIcon="➡️">Next</Button>
      <Button disabled>Disabled</Button>

      <Button leftIcon="👈" rightIcon="👉">
        Both Icons
      </Button>
      <Button intent="primary" size="large" fullWidth leftIcon="🔐">
        Login
      </Button>
    </>
  );
}

export default App;
