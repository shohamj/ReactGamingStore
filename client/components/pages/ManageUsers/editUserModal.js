import React from 'react';
import Modali, { useModali } from 'modali';
import {observer} from "mobx-react";

const [exampleModal, toggleExampleModal] = useModali();

@observer
export default class EditUserModal extends React.Component {
    
    componentDidMount(){
        this.props.userStore.getUsers();
    }
    render() {
        return (
        <Modali.Modal {...exampleModal}>
            Hi, I'm a Modali!
        </Modali.Modal>
      );
    }
}
