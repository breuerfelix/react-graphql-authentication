import React from 'react';
import { observer, inject } from 'mobx-react';

import classnames from 'classnames';

@inject(['userStore'])
@observer
class Input extends React.Component {
    onBlur(e) {
        e.preventDefault();

        if (e.target.value !== '') {
            this.props.userStore.checkUserData(this.props.name, e.target.value);
        }
    }

    render() {
        var { userStore } = this.props;
        const props = this.props;
        const error = userStore.errors[props.name];

        return (
            <div className='form-group'>
                <div class="input-group input-group-sm mb-3">
                    <input
                        type={props.type}
                        className={classnames('form-control', { 'is-invalid': error })}
                        value={userStore[props.name]}
                        onChange={(e) => { userStore[props.name] = e.target.value }}
                        onBlur={props.onBlur ? this.onBlur.bind(this) : (e) => { }}
                        placeholder={props.text}
                    />
                    {error && <span className="invalid-feedback">{error}</span>}
                </div>
            </div>
        );
    }
}

export default Input;