import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CommentList from './CommentList.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleOpen(e){
        e.preventDefault();
        this.setState({open: true})
    }
    handleClose(){
        this.setState({open: false})
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div >
                    <CommentList>
                    </CommentList>
                </div>
            </MuiThemeProvider>

        )
    }
}
// ReactDOM.render(<Layout />, document.getElementById('app-root'));
export default Layout;