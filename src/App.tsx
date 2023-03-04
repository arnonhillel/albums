import Header from "./components/Header";
import Container from "react-bootstrap/Container";
import Albums from "./components/albums";

function App() {
  return (
    <div className="bg-secondary" style={{ minHeight: "100vh" }}>
      <Header />
      <Container className="p-3">
        <Albums />
      </Container>
    </div>
  );
}

export default App;
