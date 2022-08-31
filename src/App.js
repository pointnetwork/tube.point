import { ProvideAppContext } from './context/AppContext'
import { Route } from 'wouter'
import Header from './components/Header';
import Footer from "./components/Footer";
import Home from './pages/Home'
import Examples from './pages/MyVideos'
import Contracts from './pages/Contracts'
import Upload from './pages/Upload';
import Preview from './pages/prieview';

const Main = () => {
    return (
        <main>
            <Header />
                <Route path='/'>
                    <Home/>
                </Route>
                <Route path='/my-videos'>
                    <Examples/>
                </Route>
                <Route path='/upload'>
                    <Upload/>
                </Route>
                <Route path='/contracts'>
                    <Contracts/>
                </Route>
                <Route path='/preview'>
                    <Preview/>
                </Route>
            <Footer />
        </main>
    )
}

export default App = () => <ProvideAppContext><Main/></ProvideAppContext>