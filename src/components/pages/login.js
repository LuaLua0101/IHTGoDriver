import React, { PureComponent } from "react";
import { View, Spinner } from "native-base";
import { Image, StyleSheet } from "react-native";
import { LoginForm } from "../organisms";
import { connect } from "react-redux";
import { SET_USERNAME, SET_PASSWORD, SET_USER_INFO } from "../../actions/types";
import toast from "../../utilities/toast";
import axios from "../../utilities/axios";
import AsyncStorage from "@react-native-community/async-storage";
import DeviceInfo from "react-native-device-info";

class Login extends PureComponent {
  state = { isLoading: true };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // localNotify();
    axios
      .get("driver/verify")
      .then(res => {
        if (res.data) {
          this.props.dispatch({
            type: SET_USER_INFO,
            id: res.data.id,
            name: res.data.name,
            phone: res.data.phone,
            email: res.data.email,
            version: DeviceInfo.getVersion()
          });
        }

        AsyncStorage.setItem("@token", res.data.token).then(() =>
          this.props.navigation.navigate("MainScreen")
        );
        this.setState({
          isLoading: false
        });
      })
      .catch(err => {
        this.setState({
          isLoading: false
        });
      });
  }

  handleChangeUsername = event => {
    this.props.dispatch({
      type: SET_USERNAME,
      username: event
    });
  };

  handleChangePassword = event => {
    this.props.dispatch({
      type: SET_PASSWORD,
      password: event
    });
  };

  submitLogin = () => {
    axios
      .post("login", {
        phone: this.props.username,
        password: this.props.password
      })
      .then(res => {
        this.props.dispatch({
          type: SET_USER_INFO,
          id: res.data.id,
          name: res.data.name,
          phone: res.data.phone,
          email: res.data.email
        });
        AsyncStorage.setItem("@token", res.data.token).then(() =>
          this.props.navigation.navigate("MainScreen")
        );
      })
      .catch(err => {
        toast("Sai mật khẩu !");
      });
  };

  render() {
    return this.state.isLoading ? (
      <Spinner color="red" />
    ) : (
      <View style={styles.content}>
        <Image
          style={styles.logo}
          source={require("../../../assest/logo.png")}
        />
        <LoginForm
          username={this.props.username}
          password={this.props.password}
          setUsername={this.handleChangeUsername}
          setPassword={this.handleChangePassword}
          login={this.submitLogin}
        />
      </View>
    );
  }
}

export default connect(state => ({
  username: state.login.username,
  password: state.login.password
}))(Login);

const styles = StyleSheet.create({
  imageBackGround: {
    width: "100%",
    height: "100%"
  },
  logo: {
    height: 150,
    width: 230,
    marginLeft: "auto",
    marginRight: "auto"
  },
  content: {
    marginTop: "auto",
    marginBottom: "auto",
    marginLeft: 20,
    marginRight: 20
  }
});
