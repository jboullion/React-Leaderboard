function ListItem(props) {
	// Correct! There is no need to specify the key here:
	return <li>{props.value}</li>;
}

function NumberList(props) {
	const users = props.users;
	return (
		<ul>
			{users.map((user) =>
				<ListItem key={user.username}
					value={user.username} />
				)}
		</ul>
	);
}

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			users: []
		}
	}

	setUsers(response){
		this.setState({users: response.data});
		console.log(this.state);
	}

	componentWillMount(){
		var //recent = {},
			//alltime = {},
			app = this;

		//strangly, the recent and alltime URLS return the same users, just ordered differently.
		//So we only need one call to get all the data
		axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
		.then(function (response) {
			//recent = response;
			app.setUsers(response);

			/*
			axios.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
			.then(function (response) {
				alltime = response;
				app.setUsers(recent,alltime);

			});
			*/
		});

	}

	render() {
		return (
			<div id="App">
				<NumberList users={this.state.users} />
			</div>
		);
	}
}

// ========================================

ReactDOM.render(
	<App />,
	document.getElementById('container')
);
