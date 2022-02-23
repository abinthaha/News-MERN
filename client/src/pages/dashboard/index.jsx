import React, { Component } from 'react';
import url from '../api';
import axios from 'axios';

import InputField from '../../components/Input/InputField';
import LoaderComponent from '../../components/Loader';
import './styles.scss';

class DashboardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: {},
            paperDetails: [],
            isEdit: false,
            isAdd: false,
            mobileNumber: '',
            isLoading: false,
            paidAmount: '',
        };
    }

    componentDidMount = () => {
        this.setState({
            ...this.state,
            isLoading: true
        }, () => {
            this.getNewsPaperDetails();
        })
    }

    getNewsPaperDetails = () => {
        axios
            .get(`${url}/api/paper`)
            .then(res => {
                this.setState({
                    ...this.state,
                    paperDetails: res.data,
                    isLoading: false
                })
            })
            .catch(err => {
                console.log('Error from Paper details', err);
                this.setState({
                    ...this.state,
                    details: {},
                    isLoading: false
                })
            })
    }

    onTextChange = (value, type) => {
        const { details, newBalance } = this.state;
        this.setState({
            ...this.state,
            [type]: value,
            newBalance: type === 'paidAmount' ? (parseInt(details.balance) + parseInt(details.userSub.monthly)) - parseInt(value) : newBalance
        });
    }

    fetchUserData = (ev) => {
        ev.preventDefault();
        this.setState({
            ...this.state,
            isEdit: false,
            isAdd: false,
            isLoading: true
        }, () => {
            this.fetchUser();
        })
    }

    fetchUser = () => {
        axios
            .get(`${url}/api/users/${this.state.mobileNumber}`)
            .then(res => {
                const userSub = this.state.paperDetails.filter(item => item.paperKey === res.data.subscription)[0];
                this.setState({
                    ...this.state,
                    details: { ...res.data, userSub },
                    isLoading: false
                })
            })
            .catch(err => {
                console.log('Error from Users', err);
                this.setState({
                    ...this.state,
                    details: {},
                    isLoading: false
                })
            })
    }

    updateBalance = (ev) => {
        ev.preventDefault();
        const { newBalance } = this.state;
        const data = {
            mobile: '9447621294',
            newBalance
        }
        axios
            .post(`${url}/api/users/update`, data)
            .then(res => {
                alert("Updated sucecssfully");
            })
            .catch(err => {
                console.log('Error on Updating', err);
            })
    }

    addUser = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        this.setState({
            ...this.state,
            isAdd: true,
            isEdit: false,
            details: {
                name: "",
                mobile: "",
                subscription: "",
                userSub: {
                    name: ""
                }
            }
        })
    }

    editUser = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        this.setState({
            ...this.state,
            isEdit: true,
            isAdd: false
        })
    }

    cancelEditAndAdd = (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        this.setState({
            ...this.state,
            isEdit: false,
            isAdd: false
        })
    }

    onSubChange = (ev) => {
        const userSub = this.state.paperDetails.filter(item => item.paperKey === ev.target.value)[0];
        this.setState({
            ...this.state,
            details: {
                ...this.state.details,
                userSub
            }
        })
    }

    render() {
        const { details, newBalance, isLoading, isEdit, isAdd } = this.state;
        return (
            <main className="container">
                <LoaderComponent isLoading={isLoading} />
                <section className='row'>
                    <form onSubmit={ev => this.fetchUserData(ev)}>
                        <InputField placeholder="Mobile Number" inputKey="mobileNumber" defaultValue="9447621294" onTextChange={this.onTextChange} />
                        <button type="submit" className="btn btn-primary" >Find User</button>
                        <button type="button" className="btn btn-primary" onClick={ev => this.addUser(ev)}>Add User</button>
                    </form>
                </section>
                {
                    details && Object.keys(details).length > 0 ? (
                        <section>
                            <header className='user-header'>
                                <h2>User Details</h2>
                                {
                                    isAdd ? null : (
                                        <button className="btn btn-secondary" onClick={ev => this.editUser(ev)}>Edit</button>
                                    )
                                }
                            </header>
                            <article className='form-wrapper'>
                                <div className='form-element'>
                                    <label htmlFor="">Name</label>
                                    <InputField placeholder="User Name" defaultValue={details.name} isDisabled={!isEdit && !isAdd} inputKey="paidAmount" onTextChange={this.onTextChange} />
                                </div>
                                <div className='form-element'>
                                    <label htmlFor="">Mobile</label>
                                    <InputField placeholder="Mobile Number" defaultValue={details.mobile} isDisabled={!isEdit && !isAdd} inputKey="paidAmount" onTextChange={this.onTextChange} />
                                </div>
                                <div className='form-element'>
                                    <label htmlFor="">Subscription</label>
                                    {
                                        isAdd || isEdit ? (
                                            <select value="Please Select" onChange={ev => this.onSubChange(ev)}>
                                                <option key={0} value="Please Select" disabled>Please Select</option>
                                                {
                                                    this.state.paperDetails.map(paper => {
                                                        return (
                                                            <option key={paper.paperKey} value={paper.paperKey}>{paper.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        ) : (
                                            <InputField placeholder="Subscription" defaultValue={details.userSub.name} isDisabled={true} inputKey="paidAmount" onTextChange={this.onTextChange} />
                                        )
                                    }
                                </div>
                                <div className='form-element'>
                                    <label htmlFor="">Monthly</label>
                                    <InputField placeholder="Monthly" defaultValue={details.userSub.monthly} isDisabled={true} inputKey="paidAmount" onTextChange={this.onTextChange} />
                                </div>
                                <div className='form-element'>
                                    <label htmlFor="">Due</label>
                                    <InputField placeholder="Due" defaultValue={details.balance} isDisabled={!isEdit && !isAdd} inputKey="paidAmount" onTextChange={this.onTextChange} />
                                </div>
                                <div className='form-element'>
                                    <label htmlFor="">Total</label>
                                    <InputField placeholder="Total" defaultValue={parseInt(details.userSub.monthly) + parseInt(details.balance)} isDisabled={!isEdit} inputKey="paidAmount" onTextChange={this.onTextChange} />
                                </div>
                            </article>
                            {
                                !isEdit && !isAdd ? (
                                    <article className='form-wrapper balance-wrapper'>
                                        <div className='form-element'>
                                            <label htmlFor="">Paid</label>
                                            <InputField placeholder="Paid Amount" inputKey="paidAmount" onTextChange={this.onTextChange} />
                                        </div>
                                        <div className='form-element'>
                                            <label htmlFor="">Balance</label>
                                            {
                                                newBalance ? (<span>{newBalance}</span>) : null
                                            }
                                        </div>
                                        <div className='btn-wrapper'>
                                            <button className="btn btn-primary" onClick={ev => this.updateBalance(ev)}>Update</button>
                                        </div>
                                    </article>
                                ) : null}
                            {
                                isEdit || isAdd ? (
                                    <div className='btn-wrapper'>
                                        <button className="btn btn-primary" onClick={ev => this.updateBalance(ev)}>{isAdd ? "Add" : "Edit"}</button>
                                        <button className="btn btn-secondary" onClick={ev => this.cancelEditAndAdd(ev)}>Cancel</button>
                                    </div>
                                ) : null
                            }
                        </section>) : null}
            </main>
        )
    }
}

export default DashboardComponent;