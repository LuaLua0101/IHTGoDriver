import React, { PureComponent } from "react";
import { Container } from "native-base";
import { MenuHeader as Header, ProfileForm } from "../organisms";

export default class Profile extends PureComponent {
  render() {
    return (
      <Container>
        <Header
          back={() => this.props.navigation.goBack()}
          title="Cập nhật profile"
        />
        <ProfileForm />
      </Container>
    );
  }
}