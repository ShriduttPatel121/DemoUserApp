import React, { Component } from 'react';
import { connect } from 'react-redux';
import User from '../../components/user/user';
import { fetchCurrentUsersList } from '../../store/actions/index';
import Spinner from '../../components/UI/spinner/Spinner';
class YourUsers extends Component {
    
    componentDidMount() {
        this.props.onFetchCurrentUsersList(this.props.currentUserId.toString());
    }
    render() {
        let userList = <Spinner />
        if (!this.props.loading)
        {
            userList = this.props.users.map(u => <User key={u.Id} 
                userName={u.UserName} 
                email={u.Email} 
                isAd={false}/>);
        }
        return (
            <div>
                {userList}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        users : state.currentUsersList,
        currentUserId : state.currentUser.Id,
        loading : state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchCurrentUsersList : (i) => dispatch(fetchCurrentUsersList(i)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(YourUsers);