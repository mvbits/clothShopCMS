/**
 * Created by Bingo on 2017/6/5.
 */
var React = require("react");
import {connect} from 'react-redux';
import * as LoginAction from '../action/login';
import {Form, Icon, Input, Button, Checkbox, message} from 'antd';
import * as LoginType from '../constant/loginType';
import NetUtils from '../utils/NetUtils';
import * as Urls from '../constant/Urls';

const FormItem = Form.Item;
import {
    Router,
    Route,
    HashRouter,
    Link,
    BrowserRouter
} from 'react-router-dom';
import createHistory from 'history/createHashHistory';
/**
 * ES6  写法
 */
class NormalLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "unknown",
            password: "**"
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                var self = this;
                this.props.dispatch({type: LoginType.LOGGED_ING})
                // this.props.history.push("/main");

                NetUtils.getNormal(Urls.LOGIN_URL + "?username=" + values["userName"] + "&password=" + values["password"], undefined, function (res) {
                    if (res !== "no") {
                        sessionStorage.setItem("access_token", res);
                    } else {
                        message.info("账号或者密码错误");
                    }
                });

            }
        });
    }

    __onNameChange(val) {
        this.setState({
            email: val.target.value
        });
    }

    __onPasswordChange(val) {
        this.setState({
            password: val.target.value
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        var status = this.props.loginProps.status;
        return (
            <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{required: true, message: 'Please input your username!'}],
                    })(
                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="Username"
                               onChange={this.__onNameChange.bind(this)}/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{required: true, message: 'Please input your Password!'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                               placeholder="Password" onChange={this.__onPasswordChange.bind(this)}/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    Or <a href="">Register now! {this.props.loginProps.status}</a>
                </FormItem>
            </Form>
        );
    }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);


//state 对象，就是经过 combineReducers()创建出来的
const mapStateToProps = state => ({
    loginProps: state.loginReducer
})


export default connect(mapStateToProps)(WrappedNormalLoginForm);