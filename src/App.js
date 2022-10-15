import { ProvideAppContext } from "./context/AppContext";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Examples from "./pages/MyVideos";
import Contracts from "./pages/Contracts";
import Upload from "./pages/Upload";
import Preview from "./pages/Preview";
import VideoDetails from "./pages/VideoDetails";
import EditVideo from "./pages/EditVideo";
import '@fontsource/source-sans-pro';

const Main = () => {
  return (
    <main>
      <ToastContainer />
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-videos" element={<Examples />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/contracts" element={<Contracts />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/video-detail/:id" element={<VideoDetails />} />
        <Route path="/edit-video/:id" element={<EditVideo />} />
      </Routes>

      <Footer />
    </main>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ProvideAppContext>
        <Main />
      </ProvideAppContext>
    </BrowserRouter>
  );
};

export default App;
