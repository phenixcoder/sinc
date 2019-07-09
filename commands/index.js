import React, {Component} from 'react';
import {Box, Text} from 'ink';
import { hostname, platform, homedir } from "os";
import {resolve} from 'path';
import {existsSync, readFileSync, writeFileSync} from 'fs';
import {Emojis} from '../lib/emojis';
import SetupForm from '../components/setupForm';



class Sinc extends Component {
	constructor() {
		super();

		const machine = {
			name: hostname(),
			platform: platform(),
		}
		var crypto = require('crypto');
		var hash = crypto.createHash('md5').update(`${machine.name} ${machine.platform}`).digest('hex');
		
		
		this.state = existsSync(resolve(homedir(), '.sincrc')) ? JSON.parse(readFileSync(resolve(homedir(), '.sincrc'), 'utf8')) : {
			version: 1,
			Identifier: hash,
			Machine: machine,
			syncedItems: [],
			syncBucket: '',
			syncBucketPath: '/',
			setup: false
		};
		this.state._ui = {
			setupAborted: false
		};

		this.saveConfig = this.saveConfig.bind(this);

	}
	saveConfig(newConfig) {
		if (newConfig.setup) {
			this.setState(Object.assign({}, this.state, newConfig))
			writeFileSync(resolve(homedir(), '.sincrc'), JSON.stringify(this.state, (key, value) => {
				if(key === '_ui') {
					return undefined;
				}
				return value;
			}, 4))
		} else {
			this.setState(Object.assign({}, this.state, {
				_ui: {
					setupAborted: true,
				}
			}))
		}
	}

	render() {
		return <Box flexDirection="column" width="100%" >
		<Box margin={2}>
			<Text>Sinc 1.0.0</Text>
		</Box>
		<Box marginBottom={2} flexDirection="column">
			<Text bold>Machine Identifier {this.state.setup ? Emojis.white_check_mark : Emojis.warning}</Text>
			<Text>{this.state.Machine.name} {this.state.Machine.platform}</Text>
			<Text>{this.state.Identifier}</Text>
		</Box>
	
		{!this.state.setup && !this.state._ui.setupAborted && <SetupForm onSave={this.saveConfig}/>}
		{!this.state.setup && this.state._ui.setupAborted && <Box >
			<Text>All Good. No setup done. See you soon.</Text>
		</Box>}
	</Box>;
	}
}

export default Sinc;
