import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import { TodosProvider } from "./contexts/todos";

const App = () => {
  return (
    <TodosProvider>
      <div className="todoapp">
        <Header />
        <Main />
        <Footer />
      </div>
    </TodosProvider>
  );
};

export default App;
