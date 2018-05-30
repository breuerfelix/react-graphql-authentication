import React from 'react';
import map from 'lodash/map';
import classnames from 'classnames';

import { observer, inject } from 'mobx-react';

import gender from './data/gender';
import Input from './input';

@inject(['userStore'])
@observer
class Register extends React.Component {
    constructor(props){
        super(props);

        const store = this.props.userStore;
        if(store.isAuthenticated){
            history.push('/');
            return;
        }

        store.clearRelevantData();
    }
    
    onSubmit(e) {
        e.preventDefault();
        this.props.userStore.submitRegister();
    }

    render() {
        const { userStore } = this.props;
        const genderError = userStore.errors.gender;

        const options = map(gender, (val, key) =>
            <option key={key} value={key}>{val}</option>
        );

        return (
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <h1>Join us!</h1>
                        <div className="form-group">
                            <label className="control-label">Gender</label>
                            <select
                                type="text"
                                name="gender"
                                className={classnames('form-control', { 'is-invalid': genderError })}
                                value={userStore.gender}
                                onChange={(e) => { userStore.gender = e.target.value }}
                            >
                                <option value="" disabled>Choose Gender</option>
                                {options}
                            </select>
                            {genderError && <span className="invalid-feedback">{genderError}</span>}
                        </div>
                        <div className="row">
                            <Input
                                text="Username"
                                type="text"
                                name='username'
                                onBlur={true}
                            />
                            <Input
                                text="Email"
                                type="text"
                                name='email'
                                onBlur={true}
                            />
                        </div>
                        <div className="row">
                            <Input
                                text="Password"
                                type="password"
                                name='password'
                            />
                            <Input
                                text="Confirm Password"
                                type="password"
                                name='passwordConfirm'
                            />
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-lg">Sign Up</button>
                        </div>
                    </form>
                </div >
            </div >
        );
    }
}

export default Register;