import React, {Component} from 'react';
import Routes from "./Routes";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faUserFriends } from '@fortawesome/free-solid-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'

library.add(faUserEdit);
library.add(faSignOutAlt);
library.add(faHome);
library.add(faBackward);
library.add(faUser);
library.add(faPlus);
library.add(faUserFriends);
library.add(faSpinner);

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
