import React from 'react';
import logo from '../images/logo.png';
import '../css/Login.css';
import { Redirect } from 'react-router-dom'
import { isAuthenticated, setLogin } from '../lib/Auth';

function ShowAlertMessage(props) {
  const message = props.message;
  if (message) {
    return (
      <div className="row">
        <div className="col-sm-12">
          <div className="alert alert-danger" role="alert">
            { message }
          </div>
        </div>
      </div>
    );
  }
  return '';
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      login: '',
      senha: '',
      mensagem: '',
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    setLogin(this.state);

    this.setState({
      mensagem: 'Logando no sistema...',
      redirectToReferrer: true
    });
  }

  handleLogin = (event) => {
    this.setState({login: event.target.value});
  }

  handleSenha = (event) => {
    this.setState({senha: event.target.value});
  }

  render() {
    let { from } = this.props.location.state || { from: { pathname: "/home" } };
    let { redirectToReferrer } = this.state;
    let isAuth = isAuthenticated();

    if (redirectToReferrer && isAuth) return <Redirect to={from} />;

    if (isAuth) return <Redirect to="/home" />;

    return (
      <div className="row">
        <div className="col-sm-12 offset-md-4 col-md-4">
          <div className="login">
            <div className="row">
              <div className="col-sm-12">
                <img src={logo} className="logo img-fluid" alt="logo" />
              </div>
            </div>
            <ShowAlertMessage message={this.state.mensagem} />
            <div className="row">
              <div className="col-sm-12">
                <form className="form" onSubmit={this.handleSubmit}>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Login"
                    value={this.state.login}
                    onChange={this.handleLogin}
                  />
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Senha"
                    value={this.state.senha}
                    onChange={this.handleSenha}
                  />
                  <input
                    className="btn btn-secondary btn-block"
                    type="submit"
                    value="Entrar"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
