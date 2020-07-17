import React, { Component } from 'react';
import { connect } from 'react-redux'
import AdminData from '../../components/adminUser/adminUser';
import { getAllAdmins, getSimpleUsersWhenClicked } from '../../store/actions/index'
import Spinner from '../../components/UI/spinner/Spinner';
class AllUsers extends Component {
    componentDidMount () {
        this.props.onGetAllAdmins();
    }

    adminTabClickHandler = (Id) => {
        this.props.onGetSimpleUsersWhenClicked(Id);
    }
    render() {
        let userList = <Spinner bColor="white"/>
        if (!this.props.loading)
        {
            userList = this.props.allUsers.map(u => {
                return (<AdminData key={u.adminData.Id} 
                    userName={u.adminData.UserName} 
                    email={u.adminData.Email} 
                    simpleUserList={u.simpleUsers}
                    Index={this.INDEX}
                    getClickedManagersEmployees = {() => this.adminTabClickHandler(u.adminData.Id)}
                    />);
            });
        }
        return (
            <div>
                <h3 style={{textAlign:'center'}}>Click on any Manager tab to see their employees.</h3>
                {userList}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        allUsers : state.allUsers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetAllAdmins : () => dispatch(getAllAdmins()),
        onGetSimpleUsersWhenClicked : (Index, Id) => dispatch(getSimpleUsersWhenClicked(Index, Id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AllUsers);