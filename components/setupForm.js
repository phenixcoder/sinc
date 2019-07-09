import React, {Component} from 'react';
import {Box, Text} from 'ink';
import ConfirmInput from '@pheonixcoder/ink-confirm-input';
import {writeFileSync} from 'fs';
import {resolve} from 'path';
import {homedir} from 'os';

class SetupForm extends Component {
    constructor () {
        super();

        this.state = {
            setup: false,
            syncBucket: "",
            syncBucketPath: "/"
        };

        this.changeConfigSetup = this.changeConfigSetup.bind(this);
        this.saveConfig = this.saveConfig.bind(this);
    }

    saveConfig() {
        this.props.onSave(Object.assign({}, this.state));
    }
    changeConfigSetup(setup)  {
        let state = Object.assign({}, this.state);
        state.setup = setup;
        this.setState(state)
    }

    
    render () {
        return (
            <Box marginBottom={2} flexDirection="column">
                <Text bold>Config Not Found</Text>
                <Box marginBottom={2}>
                    <Text>This Machine is not setup. Do you want to setup?</Text>
                    <ConfirmInput value={this.state.setup} onChange={this.changeConfigSetup} onSubmit={this.saveConfig}></ConfirmInput>
                </Box>
            </Box>
        );
    }
}

export default SetupForm