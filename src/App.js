import React, {Component} from 'react';
import Routes from "./Routes";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faUser);
library.add(faPlus);

class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Routes/>
                <Footer/>
            </div>
        );
    }
}

export default App;
