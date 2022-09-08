import { ProvideAppContext } from "./context/AppContext";
import { Route } from "wouter";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Examples from "./pages/MyVideos";
import Contracts from "./pages/Contracts";
import Upload from "./pages/Upload";
import Preview from "./pages/Prieview";
import VideoDetails from "./pages/VideoDetails";
import EditVideo from "./pages/EditVideo";

import { ToastContainer } from 'react-toastify';


const Main = () => {
  return (
    <main>
      <ToastContainer />
      <Header />
      <Route path="/">
        <Home />
      </Route>
      <Route path="/my-videos">
        <Examples />
      </Route>
      <Route path="/upload">
        <Upload />
      </Route>
      <Route path="/contracts">
        <Contracts />
      </Route>
      <Route path="/preview">
        <Preview />
      </Route>
      <Route path="/video-detail">
        <VideoDetails />
      </Route>
      <Route path="/edit-video">
        <EditVideo />
      </Route>
      <Footer />
    </main>
  );
};

const App = () => {
  return (
    <ProvideAppContext>
      <Main />
    </ProvideAppContext>
  );
};
export default App;
